import Card from '@/components/card'
import { createFileRoute, Link } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

function App() {
  return (
    <div className='h-full flex flex-col justify-center w-full gap-4'>
      <h1 className="font-black text-6xl border-b-4 mb-2">Task App</h1>
      <Card>
        <div className="flex justify-between">
          <Link
            to="/login"
            className="font-bold px-4 py-2 border-2 shadow-md -hover cursor-pointer"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="font-bold px-4 py-2 border-2 shadow-md -hover cursor-pointer"
          >
            Register
          </Link>
        </div>
      </Card>
    </div>
  )
}
