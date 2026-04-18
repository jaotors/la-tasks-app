import { useTasks } from './hooks/task.queries'
import { useDeleteTask } from './hooks/task.mutations'

export const TaskList = () => {
  const { data, fetchNextPage, hasNextPage } = useTasks()
  const { mutate: deleteTask } = useDeleteTask()

  return (
    <div>
      <h2>Tasks</h2>

      {data?.pages.map((page) =>
        page.data.map((task: any) => (
          <div key={task.id}>
            <span>{task.title}</span>

            <button onClick={() => deleteTask(task.id)}>Delete</button>
          </div>
        )),
      )}

      {hasNextPage && (
        <button onClick={() => fetchNextPage()}>Load more</button>
      )}
    </div>
  )
}
