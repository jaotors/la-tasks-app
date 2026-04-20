import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { logout, login } from '@/server/modules/auth/auth.function'

export const useLogin = () => {
  const queryClient = useQueryClient()
  const loginFn = useServerFn(login)

  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      loginFn({ data }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useRegister = () => {
  const queryClient = useQueryClient()
  const registerFn = useServerFn(login)

  return useMutation({
    mutationFn: (data: { username: string; password: string }) =>
      registerFn({ data }),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  const logoutFn = useServerFn(logout)

  return useMutation({
    mutationFn: () => logoutFn(),

    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['user'] })

      queryClient.setQueryData(['user'], null)
    },
  })
}
