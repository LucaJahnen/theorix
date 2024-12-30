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
    <dialog ref={dialogRef} onClose={onClose} className='bg-background text-foreground mx-[5%] w-[90%] rounded-xl shadow-md py-4 px-6 flex-col gap-3 absolute top-[24%] left-0 lg:w-auto lg:left-[50%] lg:translate-x-[-50%] lg:mx-0'>
      {children}
      <div className='flex justify-end'>
        <Button onClick={onClose} className='mt-5 text-base px-6'>Save</Button>
      </div>
    </dialog>
  )
}

export default Dialog