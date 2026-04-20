import { prisma } from '@/server/lib/prisma'
import { generateAfter } from './position'

const DEFAULT_LIMIT = 50

export const taskService = {
  async getTask(userId: string, taskId: string) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    })

    if (!task) {
      throw new Error('Not found')
    }

    return task
  },
  async getTasks(userId: string, cursor?: string) {
    const tasks = await prisma.task.findMany({
      where: {
        userId,
      },
      orderBy: [{ position: 'asc' }, { id: 'asc' }],
      take: DEFAULT_LIMIT,
      ...(cursor
        ? {
            skip: 1,
            cursor: {
              id: cursor,
            },
          }
        : {}),
    })

    const nextCursor =
      tasks.length === DEFAULT_LIMIT ? tasks[tasks.length - 1].id : null

    return {
      data: tasks,
      nextCursor,
    }
  },

  async createTask(
    userId: string,
    input: { title: string; description?: string },
  ) {
    if (!input.title) {
      throw new Error('Title is required')
    }

    const lastTask = await prisma.task.findFirst({
      where: { userId },
      orderBy: { position: 'desc' },
    })

    let position = 'm'

    if (lastTask) {
      position = generateAfter(lastTask.position)
    }

    const task = await prisma.task.create({
      data: {
        userId,
        title: input.title,
        description: input.description || '',
        position,
      },
    })

    return task
  },

  async updateTask(
    userId: string,
    taskId: string,
    input: { title?: string; description?: string },
  ) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    })

    if (!task) {
      throw new Error('Not found')
    }

    return prisma.task.update({
      where: { id: taskId },
      data: {
        title: input.title ?? task.title,
        description: input.description ?? task.description,
      },
    })
  },

  async deleteTask(userId: string, taskId: string) {
    const task = await prisma.task.findFirst({
      where: {
        id: taskId,
        userId,
      },
    })

    if (!task) {
      return { success: true }
    }

    await prisma.task.delete({
      where: { id: taskId },
    })

    return { success: true }
  },
}
