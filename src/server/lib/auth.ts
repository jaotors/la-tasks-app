import { verifyToken } from './jwt'

export async function getUserFromRequest(request: Request) {
  const authHeader = request.headers.get('authorization')

  if (!authHeader) return null

  const token = authHeader.replace('Bearer ', '')
  const payload = verifyToken(token)

  if (!payload) return null

  return { userId: payload.userId }
}
