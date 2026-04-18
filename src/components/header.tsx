import { useLogout } from '@/features/auth/hooks/auth.mutations'
import { useUser } from '@/features/auth/hooks/auth.queries'
import Button from './button'

export default function Header() {
  const { mutate: logout } = useLogout()
  const user = useUser()

  return user?.data?.id ? (
    <header className="w-full border-b-4 border-black py-8 px-4 font-black text-black">
      <div className="container mx-auto flex justify-end gap-4 items-center">
        <span className="border-b-4 text-lg">{user.data.username}</span>
        <Button onClick={() => logout()} type="button" label="Logout" />
      </div>
    </header>
  ) : null
}
