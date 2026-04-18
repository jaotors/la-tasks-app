import { useServerFn } from '@tanstack/react-start'
import { useQuery } from '@tanstack/react-query'
import { getUser } from '@/server/modules/auth/auth.function'

export const useUser = () => {
  const getUserServerFn = useServerFn(getUser)

  return useQuery({
    queryKey: ['user'],
    queryFn: () => getUserServerFn(),
  })
}
