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
import { Helmet } from "react-helmet"
import useCreateInterval from "../../hooks/useCreateInterval"
import { IoSettingsOutline } from "react-icons/io5"
import { Difficulty } from "@/components/SettingsDialog"
import SettingsDialog from "@/components/SettingsDialog"
import displayInterval from "./helpers"
import schema from "../../assets/schemas/interval-quiz.json"

interface Input {
  quality: string,
  number: string
}

const IntervalQuiz = () => {
  const [correct, setCorrect] = useState<boolean>(false)
  const [visible, setVisible] = useState<boolean>(false)
  const [difficulty, setDifficulty] = useState<Difficulty>("easy")
  const [settingsVisible, setSettingsVisible] = useState<boolean>(false)
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const scoreRef = useRef<HTMLDivElement | null>(null)
  const [solution, setSolution] = useState<string[]>([])
  const [input, setInput] = useState<Input>({
    quality: "",
    number: ""
  })
  const description = ["Only determine the interval number", "Determine the quality as well. C is alway the first note.", "Determine quality and number. Any startnote."]

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setVisible(true)

    switch(difficulty) {
      case "easy":
        setCorrect(input.number === solution[2])
        break
      case "medium":
        setCorrect(input.quality + " " + input.number === solution[2])
        break
      case "hard":
        setCorrect(input.quality + " " + input.number === solution[2])
    }

    setInput({
      quality: "",
      number: ""
    })
  }

  const [startNote, endNote, interval] = useCreateInterval(difficulty)

  useEffect(() => {
    displayInterval({ scoreRef, visible, startNote, endNote, interval, setSolution })

    const svg = document?.getElementById('vexflow')?.querySelector('.vf-stavenote') as HTMLElement
    svg.style.transform = 'translateX(40px)'

    // including these dependencies would cause too many rerenders 
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, difficulty])

  return (
    <>
        <Helmet>
            <title>Interval Identification Quiz</title>
            <meta name="description" content="Challenge your knowledge on intervals with our fun, interactive tool! Choose from Easy, Medium, or Hard Mode and see how well you can perform. Start now and challenge yourself!" />
            <script type="application/ld+json">{JSON.stringify(schema)}</script>
        </Helmet>
        <Navbar />
        <div className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
            <h1 className="text-3xl font-semibold pb-4">Interval Quiz</h1>
            <p>Which interval is shown below? Enter the quality and the interval number</p>
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
            <div className="filter invert-stave" ref={scoreRef} id="vexflow" />
          <form action="#" className="flex flex-col gap-4 lg:flex-row lg:flex-row lg:items-end lg:gap-7 lg:gap-7" onSubmit={e => handleSubmit(e)}>
          <Label htmlFor="number" className="relative z-10 flex flex-col gap-1.5 lg:w-[27.5%]">
              <span className="flex flex-col gap-1.5">Interval Quality</span>
              <Select name="number" required value={input.quality} onValueChange={value => setInput({ ...input, quality: value })} disabled={difficulty === "easy"}>
              <SelectTrigger className="w-full relative -z-10">
                <SelectValue placeholder="e. g. Major, Diminished" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Perfect">Perfect</SelectItem>
                <SelectItem value="Major">Major</SelectItem>
                <SelectItem value="Minor">Minor</SelectItem>
                <SelectItem value="Augmented">Augmented</SelectItem>
                <SelectItem value="Diminished">Diminished</SelectItem>
              </SelectContent>
            </Select>
            </Label>
            <Label htmlFor="number" className="relative z-10 flex flex-col gap-1.5 lg:w-[27.5%]">
              <span className="flex flex-col gap-1.5">Interval Number</span>
              <Select name="number" required value={input.number} onValueChange={value => setInput({ ...input, number: value })}>
              <SelectTrigger className="w-full relative -z-10">
                <SelectValue placeholder="e. g. Third, Sixth" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Unison">Unison</SelectItem>
                <SelectItem value="Second">Second</SelectItem>
                <SelectItem value="Third">Third</SelectItem>
                <SelectItem value="Fourth">Fourth</SelectItem>
                <SelectItem value="Fifth">Fifth</SelectItem>
                <SelectItem value="Sixth">Sixth</SelectItem>
                <SelectItem value="Seventh">Seventh</SelectItem>
                <SelectItem value="Octave">Octave</SelectItem>
              </SelectContent>
            </Select>
            </Label>
            <Button className="mt-1 w-full lg:w-auto">Submit Answer</Button>
          </form>
          <Modal correct={correct} visible={visible} setVisible={setVisible} type="interval" solution={solution[2]} />
          <h2 className="text-2xl font-semibold pb-1 pt-12">How to use this interval identification tool</h2>
          <p className="mb-4">Test your knowledge on intervals. Start by choosing a difficulty: Easy, Medium or Hard. With Easy Mode you only need to determine the interval number. If you want to move on, you can pick Medium or Hard Mode. You need to determine the interval number and quality in both of them but while Medium Mode always sets the first note to C, Hard Mode chooses any note.</p>
          <h2 className="text-2xl font-semibold pb-1">How to identify Intervals</h2>
          <p className="mb-4">To identify an interval between two notes, follow this step:</p>
          <ol className="">
                <li className="before:content-['1.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline"><span><span className="font-semibold">Count the Letter Names:</span> Start with the lower note and count up through the musical alphabet to the higher note. For example, from C to E, count C (1), D (2), E (3), giving you a "third."</span></li>
                <li className="before:content-['2.'] before:inline-flex before:pr-3 before:font-medium before:text-primary mb-4 flex baseline">
                  <span>
                      <span className="font-semibold">Determine the Quality: </span> 
                      After finding the number, determine the interval's quality (perfect, major, minor, diminished, or augmented):
                    <ul className="list-disc list-inside">
                      <li className="mb-4 mt-4 flex baseline before:inline-flex before:content-['\25CF'] before:pr-3 before:font-sans">
                        <span>Perfect intervals (unison, fourth, fifth, octave) sound stable.</span>
                      </li>
                      <li className="mb-4 flex baseline before:inline-flex before:content-['\25CF'] before:pr-3 before:font-sans">
                        <span>Major intervals (2nd, 3rd, 6th, 7th) are slightly larger and brighter.</span>
                      </li>
                      <li className="flex baseline before:inline-flex before:content-['\25CF'] before:pr-3 before:font-sans">
                        <span>Minor intervals are one half-step smaller than major intervals and sound slightly darker.</span>
                      </li>
                    </ul>
                    </span>
                  </li>
            </ol>
            <p>By counting the steps and identifying the quality, you'll quickly recognize each interval! For more details, check out our <Link to="/building-intervals" className="underline">dedicated article</Link> on intervals in music theory.</p>
        </div>
        <Footer />
    </>
  )
}

export default IntervalQuiz