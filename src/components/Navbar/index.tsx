import { Button } from "../ui/button"
import { Link } from "react-router-dom"
import { IoMdClose } from "react-icons/io"
import { CiMenuBurger } from "react-icons/ci"
import { useState } from "react"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { FaRegMoon } from "react-icons/fa"
import { MdOutlineWbSunny } from "react-icons/md"
import { useTheme } from "@/hooks/useTheme"
import { useNavigate } from "react-router-dom"
// import { easeInOut, motion } from 'framer-motion'

const Navbar = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const { theme, toggleTheme } = useTheme()

    // const menuVariants = {
    //   open: { x: 0, transition: { duration: 0.3, ease: easeInOut } },
    //   closed: { x: '100%', transition: { duration: 0.3, ease: easeInOut } },
    // };

    // variants={menuVariants}
    // initial="closed"
    // animate={visible ? 'open' : 'closed'}
    // exit="closed"

    //const [isAnimating, setIsAnimating] = useState(false)
    const navigate = useNavigate()

    const handleLinkClick = (path: string) => {
      //setIsAnimating(true); // Setze den Animations-Status auf "wird animiert"
      setVisible(false)
      setTimeout(() => {
        navigate(path) // Wechsle die Seite nach der Verzögerung
      }, 300) // Wartezeit in ms, abhängig von der Dauer deiner CSS-Animation
    }

    const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>)=> {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        const button = event.currentTarget as HTMLElement
        const link = button.querySelector('a')
        if (link) {
          link.click()
        }
      }
    }

  return (
    <>
    <nav className="grid place-items-center sticky top-0 left-0 z-[1001] bg-background" id="navbar">
    <div className="flex items-center justify-between w-full px-4 py-6 lg:w-[80%] lg:pb-8 lg:pt-12">
      <Link to="/" className="text-lg lg:row-start-1 font-serif"><span className="text-primary font-sans">theo</span>rix</Link>
      <div className="flex flex-row gap-2">
        <Button size="icon" className="bg-transparent text-foreground shadow-none hover:bg-transparent" onClick={toggleTheme} aria-label="toggle colour theme">
            {theme === "dark" ? <FaRegMoon className="h-8 w-8" /> : <MdOutlineWbSunny className="h-8 w-8" />}
        </Button>
        <Button variant="ghost" size="icon" className="text-foreround lg:hidden" onClick={() => setVisible(!visible)} aria-label="toggle menu visibility">
          {visible ? <IoMdClose className="h-5 w-5" /> : <CiMenuBurger className="h-5 w-5" />}
        </Button>
        <div className="gap-10 hidden lg:flex lg:pl-6">
        <DropdownMenu>
          <DropdownMenuTrigger>Intervals</DropdownMenuTrigger>
          <DropdownMenuContent className="relative z-[2000]">
        <DropdownMenuItem onKeyDown={handleKeyDown}>
          <Link to="/building-intervals">Building Intervals</Link>
        </DropdownMenuItem>
        <DropdownMenuItem onKeyDown={handleKeyDown}>
          <Link to="/interval-quiz">Interval Quiz</Link>
        </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>Chords</DropdownMenuTrigger>
          <DropdownMenuContent className="relative z-[2000]">
            <DropdownMenuItem onKeyDown={handleKeyDown}>
              <Link to="/building-chords">Building Chords</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onKeyDown={handleKeyDown}>
              <Link to="/chord-quiz">Chord Quiz</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger>Tools</DropdownMenuTrigger>
          <DropdownMenuContent className="relative z-[2000]">
            <DropdownMenuItem onKeyDown={handleKeyDown}>
              <Link to="/metronome">Metronome</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onKeyDown={handleKeyDown}>
              <Link to="/dictionary">Dictionary</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      </div>
      </nav>
      <div className={`gap-6 lg:flex w-full h-full fixed z-[1000] top-0 left-0 px-4 pt-[10%] bg-background ${visible ? "translate-x-0" : "translate-x-full"} transition-transform ease-in-out duration-700 transition-background-color duration-300 transition-color duration-300 lg:translate-x-0 lg:relative lg:bg-white lg:p-0 lg:w-fit lg:h-fit`}>
        <div className="pt-14 lg:hidden">
          <h2 className="font-semibold text-xl">Intervals</h2>
          <ul className="pb-4">
            <li className="text-lg">
              <Link to="/building-intervals" onClick={(e) => { e.preventDefault(); handleLinkClick("/building-intervals") }}>Building Intervals</Link>
            </li>
            <li className="text-lg">
              <Link to="/interval-quiz" onClick={(e) => { e.preventDefault(); handleLinkClick("/interval-quiz") }}>Interval Quiz</Link>
            </li>
          </ul>
          <h2 className="font-semibold text-xl">Chords</h2>
          <ul className="pb-4">
            <li className="text-lg">
              <Link to="/building-chords">Building Chords</Link>
            </li>
            <li className="text-lg">
              <Link to="/chord-quiz">Chord Quiz</Link>
            </li>
          </ul>
          <h2 className="font-semibold text-xl">Tools</h2>
          <ul>
            <li className="text-lg">
              <Link to="/metronome">Metronome</Link>
            </li>
            <li className="text-lg">
              <Link to="/dictionary">Dictionary</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  )
}

export default Navbar