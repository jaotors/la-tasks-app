import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
} from '@/server/modules/tasks/task.function'
import { useServerFn } from '@tanstack/react-start'

export const taskApi = () => {
  const serverFnGetTasks = useServerFn(getTasks)
  const serverFnCreateTask = useServerFn(createTask)
  const serverFnUpdateTask = useServerFn(updateTask)
  const serverFnDeleteTask = useServerFn(deleteTask)

  return {
    getTasks: serverFnGetTasks,
    createTask: serverFnCreateTask,
    updateTask: serverFnUpdateTask,
    deleteTask: serverFnDeleteTask,
  }
}
