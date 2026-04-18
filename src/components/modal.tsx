import { useEffect, type ReactNode } from 'react'
import Button from './button'

type DialogProps = {
  open: boolean
  onClose: () => void
  children: ReactNode
}

export function Dialog({ open, onClose, children }: DialogProps) {
  // close on ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (open) {
      window.addEventListener('keydown', handler)
    }

    return () => {
      window.removeEventListener('keydown', handler)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md bg-white border-4 shadow-lg p-4">
        <div className="flex justify-end">
          <Button onClick={onClose} label="Close" />
        </div>
        <div className='mt-2'>{children}</div>
      </div>
    </div>
  )
}
