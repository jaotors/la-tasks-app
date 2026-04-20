import { prisma } from '@/server/lib/prisma'
import { generateAfter, needsRebalance, computePosition } from './position'
import { rebalanceUserTasks } from './rebalance'

type ReorderInput = {
  taskId: string
  beforeId?: string | null
  afterId?: string | null
}

export const reorderService = {
  async reorderTask(userId: string, input: ReorderInput) {
    const { taskId, beforeId, afterId } = input

    const task = await prisma.task.findFirst({
      where: { id: taskId, userId },
    })

    if (!task) {
      throw new Error('Task not found')
    }

    const neighbors = await prisma.task.findMany({
      where: {
        userId,
        id: {
          in: [beforeId, afterId].filter(Boolean) as string[],
        },
      },
      select: {
        id: true,
        position: true,
      },
    })

    const beforeTask = neighbors.find((t) => t.id === beforeId)
    const afterTask = neighbors.find((t) => t.id === afterId)

    let newPosition: string

    try {
      newPosition = computePosition(beforeTask, afterTask)
    } catch {
      await rebalanceUserTasks(userId)

      const refreshed = await prisma.task.findMany({
        where: {
          userId,
          id: {
            in: [beforeId, afterId].filter(Boolean) as string[],
          },
        },
        select: {
          id: true,
          position: true,
        },
      })

      const rBefore = refreshed.find((t) => t.id === beforeId)
      const rAfter = refreshed.find((t) => t.id === afterId)

      newPosition = computePosition(rBefore, rAfter)
    }

    if (needsRebalance(newPosition)) {
      await rebalanceUserTasks(userId)

      const lastTask = await prisma.task.findFirst({
        where: { userId },
        orderBy: { position: 'desc' },
      })

      newPosition = lastTask ? generateAfter(lastTask.position) : 'm'
    }

    return prisma.task.update({
      where: { id: taskId },
      data: {
        position: newPosition,
      },
    })
  },
}
