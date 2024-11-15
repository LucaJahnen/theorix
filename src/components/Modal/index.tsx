import { Button } from "@/components/ui/button"
import { useEffect } from "react"

interface ModalProps {
  visible: boolean;
  correct: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  type: string;
  solution: string;
}

const Modal: React.FC<ModalProps> = ({ correct, visible, setVisible, type, solution }) => {

  const handleKeyDown = (e: KeyboardEvent) => {
    if(e.key === "Escape") {
      setVisible(false)
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  })

  return (
    <>
      <div className={`fixed top-0 left-0 w-full h-full -z-50 bg-black bg-opacity-50 ${visible ? "opacity-100 z-[1200]"  : "opacity-0 -z-[999]"}`}></div>
      <section className={`flex mx-[10%] rounded-xl bg-background shadow-md py-4 px-6 flex-col gap-3 absolute top-[31%] left-0 lg:left-[50%] lg:translate-x-[-50%] lg:mx-0 ${visible ? "opacity-100 z-[1201]" : "opacity-0 -z-[999]"} transition ease-in-out duration-300`}>
          <h1 className="text-xl font-bold">{correct ? "Correct!" : "Incorrect!"}</h1>
          <p>Your input was {correct ? "correct" : "incorrect"}. The {type} shown was a {solution}.</p>
          <div className="flex justify-end gap-3 w-full mt-2">
              <Button tabIndex={visible ? 0 : -1} variant="secondary" onClick={() => setVisible(false)}>Close</Button>
              <Button tabIndex={visible ? 0 : -1} onClick={() => setVisible(false)}>Try another</Button>
          </div>
      </section>
    </>
  )
}

export default Modal