import Navbar from "../../components/Navbar"
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
import { Helmet } from "react-helmet"
import { IoSettingsOutline } from "react-icons/io5"
import { displayChord } from "./helpers"
import SettingsDialog from "@/components/SettingsDialog"
import { Difficulty } from "@/components/SettingsDialog"
import schema from "../../assets/chord-quiz.json"

interface Input {
  root: string,
  type: string
}

const ChordQuiz: React.FC = () => {
  const [correct, setCorrect] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [chord, setChord] = useState<string[]>([])
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const scoreRef = useRef<HTMLDivElement | null>(null)
  const [input, setInput] = useState<Input>({
    root: "", 
    type: ""
  })
  const description = ["Minor and major chords only", "Augmented and diminished chords as well.", "All chords and inversions"]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setVisible(true)
    setCorrect(input.root.toUpperCase() + " " + input.type === chord[3])
    setInput({
      root: "", 
      type: "" 
    })
  }

  const [root, third, fifth, chordName] = useCreateChord(difficulty)
  
  useEffect(() => {
    displayChord({ root, third, fifth, chordName, scoreRef, visible, setChord, difficulty })

    const svg = document?.getElementById('stave')?.querySelector('.vf-stavenote') as HTMLElement
    svg.style.transform = 'translateX(30px)'

  // including these dependencies would cause too many rerenders 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, difficulty])

  return (
    <>
        <Helmet>
            <title>Chord Quiz</title>
            <meta name="description" content="Test your knowledge on major, minor, diminished and augmented chords using this tool. Begin by choosing a difficulty and get started now!" />
            <meta name="keywords" content="chord identification, chord quiz, chord training" />
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Navbar />
        <div className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-3xl font-semibold pb-4">Chord Quiz</h1>
            <p>Which chord is shown below? Enter the root note and the chord type.</p>
            <Button variant="secondary" className="mt-4 mb-2" onClick={() => setSettingsVisible(true)}>
              <IoSettingsOutline />{difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </Button>
            <SettingsDialog 
              settingsVisible={settingsVisible} 
              setSettingsVisible={setSettingsVisible}
              setDifficulty={setDifficulty}
              activeIndex={activeIndex}
              setActiveIndex={setActiveIndex}
              description={description}
            />
            <div className="filter invert-stave" ref={scoreRef} id="stave"/>
          <form action="#" className="flex flex-col gap-4 lg:flex-row lg:flex-row lg:items-end lg:gap-7" onSubmit={e => handleSubmit(e)}>
            <Label htmlFor="root-number" className="flex flex-col gap-1.5 relative z-10 lg:w-[27.5%]">
              <span>Root Note</span>
              <Input type="text" pattern="^[a-gA-G](#|b)?$" id="root-number" placeholder="e. g. C, Eb, G, A#" value={input.root} onChange={e => setInput({ ...input, root: e.target.value })} required />
            </Label>
            <Label htmlFor="number" className="relative z-10 flex flex-col gap-1.5 lg:w-[27.5%]">
              <span className="flex flex-col gap-1.5">Chord Type</span>
              <Select required value={input.type} onValueChange={value => setInput({ ...input, type: value })}>
              <SelectTrigger className="relative -z-10" id="number">
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
          <p className="mb-4">This tool shows every chord in its four different types: major, minor, augmented and diminished. In Easy and Mode Mode every chord is shown in its root position so determining the root note should not be too diffucult because it is the lowest note. But if you decide to pick Hard Mode, chords will only be shown in the first or second inversion, so you determining the root note and chrod type is a bit trickier. Try to mentally convert the note position to fit the root position before determining the chord type by figuring out the intervals between the three notes. If you are not sure how to determine these intervals you can check out <Link to="/interval-identification" className="underline">this article</Link>.</p>
          <h2 className="text-2xl font-semibold pb-1">How to identify chords</h2>
          <p className="mb-4">To identify an interval between two notes, follow these steps:</p>
          <ol className="">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Determine the root note:</span> In this example the root note is always the lowest note but in some excercises you might need to change the chord inversion to root position.</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline">
                  <span><span className="font-semibold">Determine the chord type:</span> If the interval between the note is a major third between root and third and a minor third between third and fifth it is called a major chord. If it's a minor third first and then a major third it is a minor chord. An augmented chord is built using two major thirds and a diminished chord uses two minor thirds.</span>
                </li>
            </ol>
            <p>If you need more info on chords you can check out this <Link to="/chord-identification" className="underline">dedicated article</Link>.</p>
        </div>
        <Footer />
    </>
  )
}

export default ChordQuiz