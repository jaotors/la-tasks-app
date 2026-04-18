import { useInfiniteQuery } from '@tanstack/react-query'
import { taskApi } from './task.api'

export const useTasks = () => {
  return useInfiniteQuery({
    queryKey: ['tasks'],
    queryFn: ({ pageParam }: { pageParam: string | undefined }) =>
      taskApi.getTasks({
        data: { cursor: pageParam },
      }),

    getNextPageParam: (lastPage) => {
      return lastPage.nextCursor ?? undefined
    },

    initialPageParam: undefined,
  })
}
