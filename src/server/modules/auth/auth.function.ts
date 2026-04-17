import { createServerFn } from '@tanstack/react-start'
import { authService } from './auth.service'

export const register = createServerFn({ method: 'POST' })
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    return authService.register(data)
  })

export const login = createServerFn({ method: 'POST' }) 
  .inputValidator((data: any) => data)
  .handler(async ({ data }) => {
    return authService.login(data)
  })
