import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { logout } from '@/server/modules/auth/auth.function'

export const useLogout = () => {
  const queryClient = useQueryClient()
  const logoutFn = useServerFn(logout)

  return useMutation({
    mutationFn: () => logoutFn(),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}
