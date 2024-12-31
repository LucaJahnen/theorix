import React, { useRef } from 'react'
import { Button } from "@/components/ui/button"

interface DialogProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

const Dialog: React.FC<DialogProps> = ({ isOpen, onClose, children }) => {
  const dialogRef = useRef<HTMLDialogElement>(null)

  React.useEffect(() => {
    if (isOpen) {
      dialogRef.current?.showModal()
    } else {
      dialogRef.current?.close()
    }
  }, [isOpen])

  return (
    <dialog ref={dialogRef} onClose={onClose} className="bg-background text-foreground w-full rounded-xl shadow-md py-4 px-6 absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] lg:w-auto">
      {children}
      <div className='flex justify-end'>
        <Button onClick={onClose} className='mt-5 text-base px-6'>Save</Button>
      </div>
    </dialog>
  )
}

export default Dialog