import Dialog from "../Dialog"
import { Button } from "../ui/button"
import Music from "../../assets/music.svg"
import Music2 from "../../assets/music-2.svg"
import Music4 from "../../assets/music-4.svg"

export type Difficulty = "easy" | "medium" | "hard"

interface Settings {
    settingsVisible: boolean,
    setSettingsVisible: React.Dispatch<React.SetStateAction<boolean>>,
    setDifficulty: React.Dispatch<React.SetStateAction<Difficulty>>,
    activeIndex: number,
    setActiveIndex: React.Dispatch<React.SetStateAction<number>>,
    description: string[]
}

const SettingsDialog = ({ settingsVisible, setSettingsVisible, setDifficulty, activeIndex, setActiveIndex, description }: Settings) => {
    const difficulties: Difficulty[] = ["easy", "medium", "hard"]
    return (
        <Dialog isOpen={settingsVisible} onClose={() => { setSettingsVisible(false); setDifficulty(difficulties[activeIndex]) }}>
            <h2 className="text-2xl font-semibold pb-1">Choose a difficulty</h2>
            <Button className={`text-wrap text-left bg-transparent text-foreground mt-2 shadow-none flex flex-row justify-start items-start gap-0 h-auto w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-2 focus-visible:outline-primary ${activeIndex === 0 ? "outline outline-1 outline-grey-400" : ""}`} onClick={() => setActiveIndex(0)}>
                <img src={Music2} className="mt-1 mr-4 h-5 w-5 invert-stave" />
                <section>
                    <h3 className="text-lg font-semibold">Easy</h3>
                    <p>{description[0]}</p>
                </section>
            </Button>
            <Button className={`text-wrap text-left bg-transparent text-foreground mt-3 shadow-none flex flex-rpw justify-start items-start gap-0 h-auto w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-2 focus-visible:outline-primary ${activeIndex === 1 ? "outline outline-1 outline-grey-400" : ""}`} onClick={() => setActiveIndex(1)}>
                <img src={Music} className="mt-1 mr-4 h-5 w-5 invert-stave" />
                <section>
                    <h3 className="text-lg font-semibold">Medium</h3>
                    <p>{description[1]}</p>
                </section>
            </Button>
            <Button className={`text-wrap text-left bg-transparent text-foreground mt-3 shadow-none flex flex-row justify-start items-start gap-0 h-auto w-full focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-2 focus-visible:outline-primary ${activeIndex === 2 ? "outline outline-1 outline-grey-400" : ""}`} onClick={() => setActiveIndex(2)}>
                <img src={Music4} className="mt-1 mr-4 h-5 w-5 invert-stave" />
                <section>
                    <h3 className="text-lg font-semibold">Hard</h3>
                    <p>{description[2]}</p>
                </section>
            </Button>
        </Dialog>
    )
}

export default SettingsDialog