import { useServerFn } from '@tanstack/react-start'
import Button from '@/components/button'
import { useForm } from 'react-hook-form'
import { login } from '@/server/modules/auth/auth.function'

type FormData = {
  username: string
  password: string
}

export function LoginForm() {
  const { register, handleSubmit } = useForm<FormData>()
  const authLogin = useServerFn(login)

  const onSubmit = async (data: FormData) => {
    try {
      await authLogin({ data })
    } catch (error) {
      console.log('Login error', error)
    }
  }

  return (
    <>
      <h2 className="text-2xl border-b-4 mb-4 inline-block font-bold">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        <input
          {...register('username')}
          placeholder="Username"
          className="border-2 p-2 w-full"
        />
        <input
          {...register('password')}
          type="password"
          placeholder="Password"
          className="border-2 p-2 w-full"
        />
        <Button type="submit" label="Submit" />
      </form>
    </>
  )
}
