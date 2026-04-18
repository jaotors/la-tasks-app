import { createServerFn } from '@tanstack/react-start'
import { authService } from './auth.service'
import { authMiddleware } from '@/server/middleware/auth'
import { redirect } from '@tanstack/react-router'
import { setCookie } from '@tanstack/react-start/server'

export const register = createServerFn({ method: 'POST' })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { token } = await authService.register(data)

    setCookie('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    })

    throw redirect({
      to: '/',
    })
  })

export const login = createServerFn({ method: 'POST' })
  .inputValidator((data: { username: string; password: string }) => data)
  .middleware([authMiddleware])
  .handler(async ({ data }) => {
    const { token } = await authService.login(data)

    setCookie('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    })

    throw redirect({
      to: '/',
    })
  })

export const logout = createServerFn({ method: 'POST' }).handler(() => {
  setCookie('token', '', {
    httpOnly: true,
    path: '/',
  })

  throw redirect({
    to: '/',
  })
})
