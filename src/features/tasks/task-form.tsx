import { useForm } from 'react-hook-form'
import { useTask } from './hooks/task.queries'
import { useCreateTask } from './hooks/task.mutations'
import Button from '@/components/button'
import { useEffect } from 'react'

type FormData = {
  title: string
  description?: string
}

type Props = {
  taskId?: string | null
  onClose: () => void
}

export const TaskForm = ({ taskId, onClose }: Props) => {
  const { data: task } = useTask(taskId || '')
  const { mutate: createTask, isPending } = useCreateTask()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    defaultValues: {
      title: task?.title || '',
      description: task?.description || '',
    },
  })

  const onSubmit = async (data: FormData) => {
    createTask(data)
    reset()
    onClose()
  }

  useEffect(() => {
    if (task) {
      reset({
        title: task.title,
        description: task.description,
      })
    }
  }, [task])

  return (
    <>
      <h2 className="text-2xl border-b-4 mb-4 inline-block font-bold">
        {taskId ? 'Edit Task' : 'Add Task'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <div>
          <input
            {...register('title', { required: true })}
            placeholder="Title"
            className="block border-2 p-2 w-full"
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">Required</p>
          )}
        </div>
        <div>
          <textarea
            {...register('description')}
            rows={4}
            placeholder="Description"
            className="block border-2 p-2 w-full"
          />
        </div>
        <Button type="submit" label="Submit" disabled={isPending} />
      </form>
    </>
  )
}
