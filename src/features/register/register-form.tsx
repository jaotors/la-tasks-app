import Button from '@/components/button'
import { useForm } from 'react-hook-form'
import { register } from '@/server/modules/auth/auth.function'

type FormData = {
  username: string
  password: string
  confirmPassword: string
}

export function RegisterForm() {
  const {
    register: inputRegister,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = async (data: FormData) => {
    await register({ data })
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <div>
        <input
          {...inputRegister('username', { required: true })}
          placeholder="Username"
          className="block border-2 p-2 w-full"
        />
        {errors.username && (
          <p className="text-red-500 text-sm mt-1">Required</p>
        )}
      </div>
      <div>
        <input
          {...inputRegister('password', { required: true })}
          type="password"
          placeholder="Password"
          className="block border-2 p-2 w-full"
        />
        {errors.password && (
          <p className="text-red-500 text-sm mt-1">Required</p>
        )}
      </div>
      <div>
        <input
          {...inputRegister('confirmPassword', {
            required: true,
            validate: (value, formValues) =>
              value === formValues.password || 'Passwords do not match',
          })}
          type="password"
          placeholder="Confirm Password"
          className="block border-2 p-2 w-full"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-sm mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>
      <Button type="submit" label="Submit" />
    </form>
  )
}
