import { useForm } from 'react-hook-form'
import { useCreateTask } from './hooks/task.mutations'
import Button from '@/components/button'

type FormData = {
  title: string
  description?: string
}

export const TaskForm = ({ onClose }: { onClose: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>()

  const { mutate: createTask, isPending } = useCreateTask()

  const onSubmit = async (data: FormData) => {
    createTask(data)
    reset()
    onClose()
  }

  return (
    <>
      <h2 className="text-2xl border-b-4 mb-4 inline-block font-bold">
        New Task
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
