import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Link } from "react-router-dom"
import React, { useState } from "react"
import click from "../../assets/click.wav"
// credit: https://samplefocus.com/samples/drum-percussion-click-stick
import { useMetronome } from "@/hooks/useMetronome"
import { useTapTempo } from "@/hooks/useTapTempo"
import { Helmet } from "react-helmet"

const Metronome: React.FC = () => {
    const [tempo, setTempo] = useState<number>(120)
    const [beatNumber, setBeatNumber] = useState<number>(4)
    const { activeIndex, handleStartStop, isActive, audioRef } = useMetronome(tempo, beatNumber)
    const handleTapTempo = useTapTempo(setTempo)

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.target as HTMLFormElement
        e.preventDefault()
        const { tempo, time } = form
        setTempo(Number(tempo.value))
        setBeatNumber(time.value)
    }

    const getTempo = (): string => {
        const tempoTerms: { [key: string]: string } = {
            "40-60": "Largo",
            "52-68": "Lento",
            "60-80": "Adagio",
            "76-100": "Andante",
            "88-112": "Moderato",
            "100-128": "Allegretto",
            "112-160": "Allegro",
            "138-142": "Vivace",
            "140-200": "Presto",
            "188-220": "Prestissimo"
        }
        const result = Object.keys(tempoTerms).find((range) => {
            const [min, max] = range.split('-').map(Number)
            return tempo >= min && tempo <= max
        })
        return result ? tempoTerms[result] : ""
    }

    return (
        <>
            <Helmet>
                <title>Metronome</title>
                <meta name="description" content="Practice keeping a tempo using this metronome." />
            </Helmet>
            <Navbar />
            <div className="px-4 pt-4 lg:w-[60%] lg:block lg:m-auto">
                <h1 className="text-2xl font-semibold pb-1 lg:text-3xl">Metronome</h1>
                <p>A metronome helps you to keep a tempo.</p>
                <div className="flex items-center flex-col gap-3 mt-10">
                    <p className="text-lg">{activeIndex >= 0 ? activeIndex + 1 : "---"}</p>
                    <div className="flex flex-row gap-6">
                        {Array.from({ length: beatNumber }, (_, index) => (
                            <div
                                key={index}
                                className={`h-5 w-5 rounded-full ${activeIndex === index ? "bg-primary" : "bg-gray-400"}`}>
                            </div>
                        ))}
                    </div>
                    <audio src={click} ref={audioRef}></audio>
                    <section>
                        <h3 className="text-lg mt-3">{tempo} BPM</h3>
                        <p className="text-center mb-3">{getTempo()}</p>
                    </section>
                    <div className="flex justify-center gap-4">
                        <Button className="w-full text-lg" onClick={handleStartStop}>{isActive ? "Stop" : "Start"}</Button>
                        <Button className="w-full text-lg" variant="secondary" onClick={handleTapTempo}>Tap Tempo</Button>
                    </div>
                </div>
                <form action="#" className="mt-12 flex flex-col gap-5 lg:flex-row lg:justify-between lg:items-end lg:gap-7" onSubmit={e => handleSubmit(e)}>
                    <Label className="flex flex-col gap-1.5 lg:w-full">
                        <span>Enter a tempo</span>
                        <Input type="number" placeholder="e. g. 60, 84, 120" min="40" max="220" required name="tempo" />
                    </Label>
                    <Label htmlFor="" className="flex flex-col gap-1.5 lg:w-full">
                        <span>Select Time Signature</span>
                        <Select name="time" required>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="e. g. 3/4, 6/8" />
                            </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="2">2/4</SelectItem>
                            <SelectItem value="3">3/4</SelectItem>
                            <SelectItem value="4">4/4</SelectItem>
                            <SelectItem value="6">6/8</SelectItem>
                        </SelectContent>
                        </Select>
                    </Label>
                    <Button className="lg:w-full">Save Changes</Button>
                </form>
                <section>
                    <h2 className="text-2xl font-semibold pb-1 pt-10">What is a metronome?</h2>
                    <p className="leading-relaxed">A metronome is a tool which produces a steady pulse to help you keep a tempo. Tempi are measured in beats per minute (BPM) and indicate how fast a song should be played. A marking of 60 BPM equals one beat per second while 120 BPM equals two beats per second.</p>
                </section>
                <section>
                    <h2 className="text-2xl font-semibold pb-1 pt-6">How to use the metronome</h2>
                    <p className="leading-relaxed">First, enter your desired tempo and hit start. By default, the metronome will play a 4/4 Time Signature but if you like to you can change it by selecting a different one from the dropdown. Hit Save Changes to apply your tempo and time signature. The metronome covers a BPM range from 40 BPM to 220 BPM.</p>
                    <p className="leading-relaxed mt-6">You can use the metronome to:</p>
                    <ul className="list-disc list-inside">
                      <li className="mb-2 mt-2 flex baseline before:inline-flex before:content-['\25CF'] before:pr-3 before:font-sans">
                        <span>Learn to play in time. It's really important for a musician not only to know how to play his instrument but to be able to keep a tempo and play in time as well.</span>
                      </li>
                      <li className="flex baseline before:inline-flex before:content-['\25CF'] before:pr-3 before:font-sans">
                        <span>Improve your technique. Start at a slow pace and gradually increase the tempo until you match the song's tempo. While doing this you should remember to avoid mistakes and only increase the tempo when you're comfortable with it.</span>
                      </li>
                    </ul>
                    <p className="leading-relaxed mt-6">If you aren't sure how fast you should play when the tempo marking says Allegro or Moderato, you can look it up <Link to="/dictionary" className="underline">here</Link>.</p>
                </section>
            </div>
            <Footer />
        </>
    )
}

export default Metronome