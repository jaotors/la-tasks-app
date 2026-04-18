import { createServerFn } from '@tanstack/react-start'
import { authMiddleware } from '@/server/middleware/auth'
import { taskService } from './task.service'

export const getTasks = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .inputValidator((data: { cursor?: string }) => data)
  .handler(async ({ context, data }) => {
    const { cursor } = data || {}
    return taskService.getTasks(context.user.userId, cursor)
  })

export const createTask = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator((data: { title: string; description?: string }) => data)
  .handler(async ({ context, data }) => {
    return taskService.createTask(context.user.userId, data)
  })

export const updateTask = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator(
    (data: { id: string; title?: string; description?: string }) => data,
  )
  .handler(async ({ context, data }) => {
    const { id, ...rest } = data
    return taskService.updateTask(context.user.userId, id, rest)
  })

export const deleteTask = createServerFn({ method: 'POST' })
  .middleware([authMiddleware])
  .inputValidator((data: { id: string }) => data)
  .handler(async ({ context, data }) => {
    return taskService.deleteTask(context.user.userId, data.id)
  })
