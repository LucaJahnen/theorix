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
import { Input } from "@/components/ui/input"
import useCreateChord from "@/hooks/useCreateChord"
import Vex from "vexflow"
const { Renderer, Stave, StaveNote, Voice, Formatter, Accidental } = Vex.Flow
import { Helmet } from "react-helmet"
import { IoSettingsOutline } from "react-icons/io5"
import { Music, Music2, Music4 } from "lucide-react"
import Dialog from "@/components/Dialog"

interface Input {
  root: string,
  type: string
}

const ChordQuiz: React.FC = () => {
  const [input, setInput] = useState<Input>({
    root: "", 
    type: ""
  })
  const [correct, setCorrect] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [chord, setChord] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<string>("easy")
  const difficulties = ["easy", "medium", "hard"]
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const scoreRef = useRef<HTMLDivElement | null>(null)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setVisible(true)
    setCorrect(input.root.toUpperCase() + " " + input.type === chord[3])
    setInput({
      root: "", 
      type: "" 
    })
  }

  const addAccidental = (note: InstanceType<typeof StaveNote>, accidental: string | undefined, index: number) => {
    if (accidental) {
      note.addModifier(new Accidental(accidental), index)
    }
  }

  const chooseInversion = (notes: string[], root: string) => {
    const currentInversion = Math.round(Math.random())
    if(currentInversion === 0) {
      return [5, notes.indexOf(root.toLowerCase()) <= notes.indexOf("g#") ? 4 : 5, notes.indexOf(root.toLowerCase()) <= notes.indexOf("e#") ? 4 : 5]
    } else {
      return [5, 5, notes.indexOf(root.toLowerCase()) <= notes.indexOf("e#") ? 4 : 5]
    }
  }

  const [root, third, fifth, chordName] = useCreateChord(difficulty)
  
  useEffect(() => {
    if (scoreRef.current && !visible) {
      setChord([root, third, fifth, chordName])
      const notes = ["c", "c#", "db", "d", "d#", "eb", "e", "e#", "fb", "f", "f#", "gb", "g", "g#", "ab", "a", "a#", "bb", "b", "b#"]

      let rootOctave, thirdOctave, fifthOctave
      if(difficulty === "hard") {
        [rootOctave, thirdOctave, fifthOctave] = chooseInversion(notes, root)
      } else {
        // determine the right octave so chords are always displayed in the right order: root, third, fifth
        rootOctave = 4
        thirdOctave = notes.indexOf(root.toLowerCase()) <= notes.indexOf("g#") ? 4 : 5
        fifthOctave = notes.indexOf(root.toLowerCase()) <= notes.indexOf("e#") ? 4 : 5
      }

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

      const rootAccidental = root.slice(1, 3)
      const thirdAccidental = third.slice(1, 3)
      const fifthAccidental = fifth.slice(1, 3)

      const renderedNotes = [
        new StaveNote({ keys: [`${root}/${rootOctave}`, `${third}/${thirdOctave}`, `${fifth}/${fifthOctave}`], duration: "h" })
      ]

      // renderedNotes[0].setXShift(30)    

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
  }, [visible, difficulty]);

  return (
    <>
        <Helmet>
            <title>Chord Quiz</title>
            <meta name="description" content="This tool tests your knowledge on chords. Choose a difficulty and get started now." />
            <meta name="keywords" content="chord identification, chord quiz, chord training" />
        </Helmet>
        <Navbar />
        <div className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-3xl font-semibold pb-4">Chord Quiz</h1>
            <p>Which chord is shown below? Enter the root note and the chord type.</p>
            <Button variant="secondary" className="mt-4 mb-2" onClick={() => setSettingsVisible(true)}>
              <IoSettingsOutline />Settings
            </Button>
            <Dialog isOpen={settingsVisible} onClose={() => { setSettingsVisible(false); setDifficulty(difficulties[activeIndex]) }}>
              <h2 className="text-2xl font-semibold pb-1">Choose a difficulty</h2>
              <Button className={`text-wrap text-left bg-transparent text-foreground mt-2 shadow-none flex flex-row justify-start items-start gap-0 h-auto w-full transition-all focus-visible:outline-primary ${activeIndex === 0 ? "outline outline-1 outline-grey-400" : ""}`} onClick={() => setActiveIndex(0)}>
                <Music2 className="mt-1 mr-4" />
                <section>
                  <h3 className="text-lg font-semibold">Easy</h3>
                  <p>Minor and major chords only</p>
                </section>
              </Button>
              <Button className={`text-wrap text-left bg-transparent text-foreground mt-3 shadow-none flex flex-rpw justify-start items-start gap-0 h-auto w-full transition-all focus-visible:outline-primary ${activeIndex === 1 ? "outline outline-1 outline-grey-400" : ""}`} onClick={() => setActiveIndex(1)}>
                <Music className="mt-1 mr-4" />
                <section>
                  <h3 className="text-lg font-semibold">Medium</h3>
                  <p>Augmented and diminished chords as well.</p>
                </section>
              </Button>
              <Button className={`text-wrap text-left bg-transparent text-foreground mt-3 shadow-none flex flex-row justify-start items-start gap-0 h-auto w-full transition-all focus-visible:outline-primary ${activeIndex === 2 ? "outline outline-1 outline-grey-400" : ""}`} onClick={() => setActiveIndex(2)}>
                <Music4 className="mt-1 mr-4" />
                <section>
                  <h3 className="text-lg font-semibold">Hard</h3>
                  <p>All chords and inversions</p>
                </section>
              </Button>
            </Dialog>
            <div className="filter invert-stave" ref={scoreRef} />
          <form action="#" className="flex flex-col gap-4 lg:flex-row lg:flex-row lg:items-end lg:gap-7" onSubmit={e => handleSubmit(e)}>
            <Label htmlFor="root-number" className="flex flex-col gap-1.5 relative z-10">
              <span>Root Note</span>
              <Input type="text" pattern="^[a-gA-G](#|b)?$" id="root-number" placeholder="e. g. C, Eb, G, A#" value={input.root} onChange={e => setInput({ ...input, root: e.target.value })} />
            </Label>
            <Label htmlFor="number" className="relative z-10 flex flex-col gap-1.5">
              <span className="flex flex-col gap-1.5">Chord Type</span>
              <Select required value={input.type} onValueChange={value => setInput({ ...input, type: value })}>
              <SelectTrigger className="w-full relative -z-10" id="number">
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
          <h2 className="text-2xl font-semibold pb-1 pt-10">How to use</h2>
          <p className="mb-4">This tool shows every chord in its four different types: major, minor, augmented and diminished. Every chord is shown in its root position so determining the root note should not be too diffucult because it is the lowest note. Next you need to determine the chord type by figuring out the intervals between the three notes. If you are not sure how to determine these intervals you can check out <Link to="/building-intervals" className="underline">this article</Link>.</p>
          <h2 className="text-2xl font-semibold pb-1">How to identify chords</h2>
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