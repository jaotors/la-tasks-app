import { useState } from 'react'
import { useTasks } from './hooks/task.queries'
import { useDeleteTask } from './hooks/task.mutations'
import Card from '@/components/card'
import Button from '@/components/button'
import { Dialog } from '@/components/modal'
import { TaskForm } from './task-form'

export const TaskList = () => {
  const { data, fetchNextPage, hasNextPage } = useTasks()
  const { mutate: deleteTask } = useDeleteTask()
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleEditTask = (taskId: string) => {
    setEditingTaskId(taskId)
    setIsAddModalOpen(true)
  }

  return (
    <>
      <Card>
        <div className="flex justify-between gap-4 items-center mb-4">
          <h2 className="text-2xl border-b-4 inline-block font-bold">Tasks</h2>
          <Button onClick={handleOpenAddModal} label="Add" />
        </div>

        <div className="flex flex-col gap-4 mb-2">
          {data?.pages.map((page) =>
            page.data.map((task: any) => (
              <div
                key={task.id}
                className="flex items-center justify-between border-2 p-2"
              >
                <span className="border-b-2">{task.title}</span>

                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      handleEditTask(task.id)
                    }}
                    label="Edit"
                  />
                  <Button
                    onClick={() => {
                      deleteTask(task.id)
                    }}
                    label="Delete"
                  />
                </div>
              </div>
            )),
          )}
        </div>

        <div>
          {hasNextPage && (
            <Button onClick={() => fetchNextPage()} label="Load More" />
          )}
        </div>
      </Card>
      <Dialog
        open={isAddModalOpen}
        onClose={() => {
          setEditingTaskId(null)
          setIsAddModalOpen(false)
        }}
      >
        <TaskForm
          taskId={editingTaskId}
          onClose={() => {
            setEditingTaskId(null)
            setIsAddModalOpen(false)
          }}
        />
      </Dialog>
    </>
  )
}
