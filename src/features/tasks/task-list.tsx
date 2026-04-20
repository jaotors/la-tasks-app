import { useState, useEffect } from 'react'
import { useTasks } from './hooks/task.queries'
import { useDeleteTask, useReorderTask } from './hooks/task.mutations'

import Card from '@/components/card'
import Button from '@/components/button'
import { Dialog } from '@/components/modal'
import { TaskForm } from './task-form'
import { TaskItem } from './task-item'

import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'

import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable'

export const TaskList = () => {
  const { data, fetchNextPage, hasNextPage } = useTasks()
  const { mutate: reorderTask } = useReorderTask()
  const { mutate: deleteTask } = useDeleteTask()

  const [editingTaskId, setEditingTaskId] = useState<string | null>(null)
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false)

  const flatTasks = data?.pages.flatMap((p) => p.data) ?? []
  const [tasks, setTasks] = useState(flatTasks)

  // 🔥 sensors (better UX)
  const sensors = useSensors(useSensor(PointerSensor))

  useEffect(() => {
    setTasks(flatTasks)
  }, [data])

  const handleOpenAddModal = () => {
    setIsAddModalOpen(true)
  }

  const handleEditTask = (taskId: string) => {
    setEditingTaskId(taskId)
    setIsAddModalOpen(true)
  }

  // 🔥 main drag logic
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event

    if (!over || active.id === over.id) return

    const oldIndex = tasks.findIndex((t) => t.id === active.id)
    const newIndex = tasks.findIndex((t) => t.id === over.id)

    const updated = arrayMove(tasks, oldIndex, newIndex)
    setTasks(updated)

    const moved = updated[newIndex]
    const before = updated[newIndex - 1] || null
    const after = updated[newIndex + 1] || null

    reorderTask({
      taskId: moved.id,
      beforeId: before?.id ?? null,
      afterId: after?.id ?? null,
    })
  }

  return (
    <>
      <Card>
        <div className="flex justify-between gap-4 items-center mb-4">
          <h2 className="text-2xl border-b-4 inline-block font-bold">Tasks</h2>
          <Button onClick={handleOpenAddModal} label="Add" />
        </div>

        {/* 🔥 DND WRAPPER */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={tasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="flex flex-col gap-4 mb-2">
              {tasks.map((task) => (
                <TaskItem
                  key={task.id}
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>

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
