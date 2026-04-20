import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import Button from '@/components/button'

type Task = {
  id: string
  title: string
}

type Props = {
  task: Task
  onEdit: (taskId: string) => void
  onDelete: (taskId: string) => void
}

export const TaskItem = ({ task, onEdit, onDelete }: Props) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex items-center justify-between border-2 p-2 bg-white ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <span className="border-b-2">{task.title}</span>

      <div className="flex gap-4">
        <Button onClick={() => onEdit(task.id)} label="Edit" />
        <Button onClick={() => onDelete(task.id)} label="Delete" />
      </div>
    </div>
  )
}
