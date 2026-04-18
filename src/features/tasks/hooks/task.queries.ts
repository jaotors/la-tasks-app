import { useQuery, useInfiniteQuery } from '@tanstack/react-query'
import { taskApi } from './task.api'

export const useTask = (id: string) => {
  const { getTask } = taskApi()

  return useQuery({
    queryKey: ['task', id],
    queryFn: () =>
      getTask({
        data: { taskId: id },
      }),
  })
}

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
