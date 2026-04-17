import { createMiddleware } from '@tanstack/react-start'
import { verifyToken } from '../lib/jwt'

export const authMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const authHeader = request.headers.get('Authorization')

    if (!authHeader?.startsWith('Bearer ')) {
      throw new Error('Unauthorized')
    }

    const token = authHeader.split(' ')[1]

    const userId = await verifyToken(token)

    if (!userId) {
      throw new Error('Unauthorized')
    }

    return next({
      context: {
        userId,
      },
    })
  },
)
