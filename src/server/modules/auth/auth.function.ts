import { createServerFn } from '@tanstack/react-start'
import { authService } from './auth.service'
import { authMiddleware } from '@/server/middleware/auth'

export const register = createServerFn({ method: 'POST' })
  .inputValidator((data: any) => data)
  .middleware([authMiddleware])
  .handler(async ({ data }) => {
    return authService.register(data)
  })

export const login = createServerFn({ method: 'POST' })
  .inputValidator((data: any) => data)
  .middleware([authMiddleware])
  .handler(async ({ data }) => {
    return authService.login(data)
  })
