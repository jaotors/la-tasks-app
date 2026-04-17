import { createServerFn } from '@tanstack/react-start'
import { authService } from './auth.service'
import { authMiddleware } from '@/server/middleware/auth'

export const register = createServerFn({ method: 'POST' })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { token, user } = await authService.register(data)

    return new Response(
      JSON.stringify({
        user: { id: user.id, username: user.username },
      }),
      {
        headers: {
          'Set-Cookie': `token=${token}; HttpOnly; Path=/; SameSite=Strict`,
          'Content-Type': 'application/json',
        },
      },
    )
  })

export const login = createServerFn({ method: 'POST' })
  .inputValidator((data: { username: string; password: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data }) => {
    const { token, user } = await authService.login(data)

    return new Response(
      JSON.stringify({
        user: { id: user.id, username: user.username },
      }),
      {
        headers: {
          'Set-Cookie': `token=${token}; HttpOnly; Path=/; SameSite=Strict`,
          'Content-Type': 'application/json',
        },
      },
    )
  })
