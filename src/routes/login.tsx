import { createFileRoute, Link } from '@tanstack/react-router'
import Card from '@/components/card'
import { LoginForm } from '@/features/auth/login-form'

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <Link
        to="/"
        className="inline-block mb-4 font-bold px-4 py-2 border-2 shadow-md -hover cursor-pointer"
      >
        Back
      </Link>
      <Card>
        <LoginForm />
      </Card>
    </>
  )
}
