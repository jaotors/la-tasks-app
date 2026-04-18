import { TaskList } from '@/features/tasks/task-list'
import { createFileRoute, redirect } from '@tanstack/react-router'
import { getCookie } from '@tanstack/react-start/server'

export const Route = createFileRoute('/app')({
  beforeLoad: () => {
    const token = getCookie('token')

    if (!token) {
      throw redirect({
        to: '/login',
      })
    }
  },

  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-4 h-full w-full">
      <TaskList />
    </div>
  )
}
