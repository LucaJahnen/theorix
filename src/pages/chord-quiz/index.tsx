import Navbar from "../../components/Navbar"
import "../interval-quiz/index.css"
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
import useCreateChord from "@/hooks/useCreateChord"
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow;


const ChordQuiz = () => {
  const [correct, setCorrect] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [chord, setChord] = useState<string[]>([])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setVisible(true)
    const formData = new FormData(e.currentTarget)
    const rootInput = formData.get("root")
    const typeInput = formData.get("type")
    setCorrect(rootInput + " " + typeInput === chord[3])
  }

  const scoreRef = useRef<HTMLDivElement | null>(null)

  function addAccidental(note: InstanceType<typeof StaveNote>, accidental: string | undefined, index: number) {
    if (accidental) {
      note.addModifier(new Accidental(accidental), index)
    }
  }

  const [root, third, fifth, chordName] = useCreateChord()
  
  useEffect(() => {
    if (scoreRef.current && !visible) {
      setChord([root, third, fifth, chordName])
      const notes = ["c", "c#", "db", "d", "d#", "eb", "e", "e#", "fb", "f", "f#", "gb", "g", "g#", "ab", "a", "a#", "bb", "b", "b#"]
      // determine the right octave so chords are always displayed in the right order: root, third, fifth
      const secondOctave = notes.indexOf(root.toLowerCase()) <= notes.indexOf("g#") ? 4 : 5
      const thirdOctave = notes.indexOf(root.toLowerCase()) <= notes.indexOf("e#") ? 4 : 5

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

      const rootAccidental = root.length > 2 ? root[1] + root[2] : root[1]
      const thirdAccidental = third.length > 2 ? third[1] + third[2] : third[1]
      const fifthAccidental = fifth.length > 2 ? fifth[1] + fifth[2] : fifth[1]

      const renderedNotes = [
        new StaveNote({ keys: [`${root}/4`, `${third}/${secondOctave}`, `${fifth}/${thirdOctave}`], duration: "h" })
      ]

      addAccidental(renderedNotes[0], rootAccidental, 0)
      addAccidental(renderedNotes[0], thirdAccidental, 1)
      addAccidental(renderedNotes[0], fifthAccidental, 2)

      const voice = new Voice({ num_beats: 2, beat_value: 4 });
      voice.addTickables(renderedNotes);

      new Formatter().joinVoices([voice]).format([voice], width);
      stave.addClef('treble').addTimeSignature('2/4');
      stave.setContext(context).draw();
      voice.draw(context, stave);
    }
  // including these dependencies would cause too many rerenders 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  return (
    <>
        <Navbar />
        <div className="px-4 pt-4 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-2xl font-semibold pb-1 lg:text-3xl">Chord Quiz</h1>
            <p>Which interval is shown below? Enter the quality and the interval number</p>
            <div className="filter invert-stave" ref={scoreRef} />
          <form action="#" className="flex flex-col gap-4 lg:flex-row lg:flex-row lg:items-end lg:gap-7 lg:gap-7" onSubmit={e => handleSubmit(e)}>
            <Label htmlFor="" className="flex flex-col gap-1.5 relative z-10">
              <span>Root Note</span>
              <Select name="root">
                <SelectTrigger className="w-full relative -z-10">
                  <SelectValue placeholder="e. g. C, Gb" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="C">C</SelectItem>
                  <SelectItem value="C#">C#</SelectItem>
                  <SelectItem value="Db">Db</SelectItem>
                  <SelectItem value="D">D</SelectItem>
                  <SelectItem value="D#">D#</SelectItem>
                  <SelectItem value="Eb">Eb</SelectItem>
                  <SelectItem value="E">E</SelectItem>
                  <SelectItem value="F">F</SelectItem>
                  <SelectItem value="F#">F#</SelectItem>
                  <SelectItem value="Gb">Gb</SelectItem>
                  <SelectItem value="G">G</SelectItem>
                  <SelectItem value="G#">G#</SelectItem>
                  <SelectItem value="Ab">Ab</SelectItem>
                  <SelectItem value="A">A</SelectItem>
                  <SelectItem value="A#">A#</SelectItem>
                  <SelectItem value="Bb">Bb</SelectItem>
                  <SelectItem value="B">B</SelectItem>
                </SelectContent>
              </Select>
            </Label>
            <Label htmlFor="number" className="relative z-10 flex flex-col gap-1.5">
              <span className="flex flex-col gap-1.5">Chord Type</span>
              <Select name="type" required>
              <SelectTrigger className="w-full relative -z-10">
                <SelectValue placeholder="e. g. Major, Diminished" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Major">Major</SelectItem>
                <SelectItem value="Minor">Minor</SelectItem>
                <SelectItem value="Augmented">Augmented</SelectItem>
                <SelectItem value="Diminished">Diminished</SelectItem>
              </SelectContent>
            </Select>
            </Label>
            <Button className="mt-1 w-full lg:w-auto">Submit Answer</Button>
          </form>
          <Modal correct={correct} visible={visible} setVisible={setVisible} type="chord" solution={chord[3]} />
          <h2 className="text-2xl font-semibold pb-1 pt-10">How to identify chords</h2>
          <p className="mb-4">To identify an interval between two notes, follow these steps:</p>
          <ol className="">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Determine the root note:</span> In this example the root note is always the lowest note but in some excercises you might need to change the chord inversion to root position.</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline">
                  <span><span className="font-semibold">Determine the chord type:</span> If the interval between the note is a major third between root and third and a minor third between third and fifth it is called a major chord. If it's a minor third first and then a major third it is a minor chord. An augmented chord is built using two major thirds and a diminished chord uses two minor thirds.</span>
                </li>
            </ol>
            <p>If you need more info on chords you can check out this <Link to="/building-chords" className="underline">dedicated article</Link>.</p>
        </div>
        <Footer />
    </>
  )
}

export default ChordQuiz