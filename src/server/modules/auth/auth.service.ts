import { prisma } from '@/server/lib/prisma'

export const authService = {
  async register({
    username,
    password,
  }: {
    username: string
    password: string
  }) {
    // logic later (Phase 2)
    return { username, password }
  },

  async login({ username, password }: { username: string; password: string }) {
    return { username, password }
  },
}
