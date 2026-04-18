import { useInfiniteQuery } from '@tanstack/react-query'
import { taskApi } from './task.api'

export const useTasks = () => {
  const { getTasks } = taskApi()

  return useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      getTasks({
        data: { cursor: pageParam },
      }),

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined
    },

    initialPageParam: undefined,
  })
}
