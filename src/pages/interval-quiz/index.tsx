import Navbar from "../../components/Navbar"
import "./index.css"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import Modal from "../../components/Modal"
import { useState, useEffect, useRef } from "react"
import Footer from "../../components/Footer"
import Vex from "vexflow"
const { Renderer, Stave, StaveNote, Voice, Formatter } = Vex.Flow;


const IntervalQuiz = () => {
  const [intervalIndex, setIntervalIndex] = useState<number>(0)
  const [correct, setCorrect] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setVisible(true)
    const formData = new FormData(e.currentTarget)
    const selectedValue = formData.get("number")
    setCorrect(Number(selectedValue) === Math.abs(intervalIndex))
  }

  const scoreRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    if (scoreRef.current && !visible) {
      // generate two random notes and set their interval, positive means up, negative down
      const notes = ["c", "d", "e", "f", "g", "a", "b"]
      const startIndex = Math.round(Math.random() * (notes.length - 1))
      const endIndex = Math.round(Math.random() * (notes.length - 1))
      setIntervalIndex(endIndex - startIndex > 0 ? endIndex - startIndex + 1 : - (startIndex - endIndex + 1))

      // determine stave width
      const mobileWidth = window.innerWidth - 32
      const desktopWidth = 0.3 * window.innerWidth
      // 1024 is tailwind's lg breakpoint
      const width = window.innerWidth > 1024 ? desktopWidth : mobileWidth

      scoreRef.current.innerHTML = ""
      const renderer = new Renderer(scoreRef.current, Renderer.Backends.SVG);
      renderer.resize(width, 130);
      const context = renderer.getContext();
      const stave = new Stave(0, 0, width);
      const renderedNotes = [
        new StaveNote({ keys: [`${notes[startIndex]}/4`], duration: "q" }),
        new StaveNote({ keys: [`${notes[endIndex]}/4`], duration: "q" }),
      ];
      const voice = new Voice({ num_beats: 2, beat_value: 4 });
      voice.addTickables(renderedNotes);

      new Formatter().joinVoices([voice]).format([voice], width);
      stave.addClef('treble').addTimeSignature('2/4');
      stave.setContext(context).draw();
      voice.draw(context, stave);
    }
  }, [visible])

  const intervalNames = ["Unison", "Second", "Third", "Fourth", "Fitfth", "Sixth", "Seventh"]

  return (
    <>
        <Navbar />
        <div className="px-4 pt-4 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-2xl font-semibold pb-1 lg:text-3xl">Interval Quiz</h1>
            <p>Which interval is shown below? Enter the quality and the interval number</p>
            <div className="filter invert-stave" ref={scoreRef} />
          <form action="#" className="flex flex-col gap-4 lg:flex-row lg:flex-row lg:items-end lg:gap-7 lg:gap-7" onSubmit={e => handleSubmit(e)}>
            <Label htmlFor="number" className="relative z-10 flex flex-col gap-1.5 lg:w-[40%]">
              <span className="flex flex-col gap-1.5">Interval Number</span>
              <Select name="number" required>
              <SelectTrigger className="w-full relative -z-10">
                <SelectValue placeholder="e. g. Third, Sixth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Unison</SelectItem>
                <SelectItem value="2">Second</SelectItem>
                <SelectItem value="3">Third</SelectItem>
                <SelectItem value="4">Fourth</SelectItem>
                <SelectItem value="5">Fifth</SelectItem>
                <SelectItem value="6">Sixth</SelectItem>
                <SelectItem value="7">Seventh</SelectItem>
              </SelectContent>
            </Select>
            </Label>
            <Button className="mt-1 w-full lg:w-auto">Submit Answer</Button>
          </form>
          <Modal correct={correct} visible={visible} setVisible={setVisible} type="interval" solution={intervalNames[intervalIndex - 1]} />
          <h2 className="text-2xl font-semibold pb-1 pt-10">How to identify Intervals</h2>
          <p className="mb-4">To identify an interval between two notes, follow these steps:</p>
          <ol className="">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Count the Letter Names:</span> Start with the lower note and count up through the musical alphabet to the higher note. For example, from C to E, count C (1), D (2), E (3), giving you a "third."</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline">
                  <span>
                      <span className="font-semibold">Determine the Quality:</span> 
                      After finding the number, determine the interval's quality (perfect, major, minor, diminished, or augmented):
                    <ul className="list-disc list-inside">
                      <li className="mb-4 mt-4 flex baseline before:inline-flex before:content-['\25CF'] before:pr-3">
                        <span>Perfect intervals (unison, fourth, fifth, octave) sound stable.</span>
                      </li>
                      <li className="mb-4 flex baseline before:inline-flex before:content-['\25CF'] before:pr-3">
                        <span>Major intervals (2nd, 3rd, 6th, 7th) are slightly larger and brighter.</span>
                      </li>
                      <li className="flex baseline before:inline-flex before:content-['\25CF'] before:pr-3">
                        <span>Minor intervals are one half-step smaller than major intervals and sound slightly darker.</span>
                      </li>
                    </ul>
                    </span>
                  </li>
            </ol>
            <p>By counting the steps and identifying the quality, you’ll quickly recognize each interval! For more details, check out our <Link to="/building-intervals" className="underline">dedicated article</Link> on intervals in music theory.</p>
        </div>
        <Footer />
    </>
  )
}

export default IntervalQuiz