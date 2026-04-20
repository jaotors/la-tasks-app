import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  getTask,
  reorderTask,
} from '@/server/modules/tasks/task.function'
import { useServerFn } from '@tanstack/react-start'

export const taskApi = () => {
  const serverFnGetTask = useServerFn(getTask)
  const serverFnGetTasks = useServerFn(getTasks)
  const serverFnCreateTask = useServerFn(createTask)
  const serverFnUpdateTask = useServerFn(updateTask)
  const serverFnDeleteTask = useServerFn(deleteTask)
  const serverFnReorderTask = useServerFn(reorderTask)

  return {
    getTask: serverFnGetTask,
    getTasks: serverFnGetTasks,
    createTask: serverFnCreateTask,
    updateTask: serverFnUpdateTask,
    deleteTask: serverFnDeleteTask,
    reorderTask: serverFnReorderTask,
  }
}
