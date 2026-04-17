// /src/server/modules/auth/auth.service.ts
import { prisma } from '@/server/lib/prisma'
import bcrypt from 'bcrypt'
import { signToken } from '@/server/lib/jwt'

type UserInput = {
  username: string
  password: string
}

export const authService = {
  async register({ username, password }: UserInput) {
    const existing = await prisma.user.findUnique({
      where: { username },
    })

    if (existing) {
      throw new Error('Username already exists')
    }

    const hashed = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: { username, password: hashed },
    })

    const token = signToken({ userId: user.id })

    return {
      token,
      user: { id: user.id, username: user.username },
    }
  },
  async login({ username, password }: UserInput) {
    const user = await prisma.user.findUnique({
      where: { username },
    })

    if (!user) {
      throw new Error('Invalid credentials')
    }

    const valid = await bcrypt.compare(password, user.password)

    if (!valid) {
      throw new Error('Invalid credentials')
    }

    const token = signToken({ userId: user.id })

    return {
      token,
      user: { id: user.id, username: user.username },
    }
  },
}
