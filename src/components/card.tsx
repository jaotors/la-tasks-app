import type { ReactNode } from 'react'

const Card = ({ children }: { children: ReactNode }) => {
  return <div className="py-6 px-4 border-4 shadow-lg">{children}</div>
}

export default Card
