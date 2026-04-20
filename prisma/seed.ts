import { PrismaClient } from '../src/generated/prisma/client.js'

import { PrismaPg } from '@prisma/adapter-pg'
import { generateAfter } from '@/server/modules/tasks/position.js'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  console.log('🌱 Seeding database...')

  // Clear existing todos
  await prisma.task.deleteMany()

  // Create example todos
  const userId = 'cmo391m3y0000ixo5igeywx9f'
  const tasksData = []
  let lastPosition = 'm' // Starting point based on your logic

  for (let i = 0; i < 100; i++) {
    const newTask = {
      title: `Task ${i + 1}`,
      userId: userId,
      description: '',
      position: lastPosition,
    }

    tasksData.push(newTask)

    // Calculate the next position for the next iteration
    lastPosition = generateAfter(lastPosition)
  }

  // Use createMany for high performance
  await prisma.task.createMany({
    data: tasksData,
  })

  console.log('Successfully seeded 100 tasks with fractional indexing.')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
