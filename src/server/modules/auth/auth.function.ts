import { createServerFn } from '@tanstack/react-start'
import { authService } from './auth.service'
import { redirect } from '@tanstack/react-router'
import { getCookie, setCookie } from '@tanstack/react-start/server'
import { authMiddleware } from '@/server/middleware/auth'

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
      to: '/app',
    })
  })

export const login = createServerFn({ method: 'POST' })
  .inputValidator((data: { username: string; password: string }) => data)
  .handler(async ({ data }) => {
    const { token } = await authService.login(data)

    setCookie('token', token, {
      httpOnly: true,
      path: '/',
      sameSite: 'strict',
    })

    throw redirect({
      to: '/app',
      throw: true,
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

export const getUser = createServerFn({ method: 'GET' })
  .middleware([authMiddleware])
  .handler(({ context }) => {
    const user = authService.getUser(context.user.userId)

    return user
  })
