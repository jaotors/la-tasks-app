import { useMutation, useQueryClient } from '@tanstack/react-query'
import { taskApi } from './task.api'

export const useCreateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { title: string; description?: string }) =>
      taskApi.createTask({ data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: { id: string; title?: string; description?: string }) =>
      taskApi.updateTask({ data }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}

export const useDeleteTask = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => taskApi.deleteTask({ data: { id } }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] })
    },
  })
}
