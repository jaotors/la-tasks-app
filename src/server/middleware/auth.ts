import { redirect } from '@tanstack/react-router'
import { createMiddleware } from '@tanstack/react-start'
import { getCookie } from '@tanstack/react-start/server'
import { verifyToken } from '@/server/lib/jwt'

export const authMiddleware = createMiddleware().server(async ({ next }) => {
  const token = getCookie('token')

  if (!token) {
    throw redirect({
      to: '/',
      throw: true,
    })
  }

  const user = verifyToken(token)

  if (!user) throw new Error('Unauthorized')

  return next({
    context: { user },
  })
})
