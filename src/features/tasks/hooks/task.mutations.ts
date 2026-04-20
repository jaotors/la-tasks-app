import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi } from './task.api'

export const useCreateTask = () => {
  const queryClient = useQueryClient()
  const { createTask } = taskApi()

  return useMutation({
    mutationFn: (data: { title: string; description?: string }) =>
      createTask({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()
  const { updateTask } = taskApi()

  return useMutation({
    mutationFn: (data: { id: string; title?: string; description?: string }) =>
      updateTask({ data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()
  const { deleteTask } = taskApi()

  return useMutation({
    mutationFn: (id: string) => deleteTask({ data: { id } }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export function useReorderTask() {
  const queryClient = useQueryClient()
  const { reorderTask } = taskApi()

  return useMutation({
    mutationFn: (data: {
      taskId: string
      beforeId?: string | null
      afterId?: string | null
    }) => reorderTask({ data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
