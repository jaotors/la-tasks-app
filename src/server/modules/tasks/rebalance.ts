import { prisma } from '@/server/lib/prisma'

const BASE = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

function generateEvenPosition(index: number): string {
  const base = BASE.length

  let result = ''
  let i = index

  do {
    result = BASE[i % base] + result
    i = Math.floor(i / base)
  } while (i > 0)

  return result
}

export async function rebalanceUserTasks(userId: string): Promise<void> {
  const tasks = await prisma.task.findMany({
    where: { userId },
    orderBy: { position: 'asc' },
  })

  const updates = tasks.map((task, index) =>
    prisma.task.update({
      where: { id: task.id },
      data: {
        position: generateEvenPosition(index + 1),
      },
    }),
  )

  await prisma.$transaction(updates)
}
