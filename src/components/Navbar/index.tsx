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
import { useTheme } from "@/components/theme-provider"
import { AnimatePresence, motion, usePresence } from 'framer-motion'
import { useEffect } from 'react'

const Navbar: React.FC = () => {
    const [visible, setVisible] = useState<boolean>(false)
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
      if(theme === "light") {
        setTheme("dark")
      } else {
        setTheme("light")
      }
    }

    const [isPresent, safeToRemove] = usePresence()

    const menuVariants = {
      open: { x: 0, transition: { duration: 0.5, ease: "easeInOut" } },
      closed: { x: "100%", transition: { duration: 0.5, ease: "easeInOut" } },
      exit: { x: "100%", transition: { duration: 0.5, ease: "easeInOut" } },
    }

    useEffect(() => {
      if(!isPresent) {
        setTimeout(safeToRemove, 500)
      }
    }, [isPresent, safeToRemove])

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
      <Link to="/" className="text-lg lg:row-start-1 font-serif"><span className="text-primary font-sans dark:text-primary-lighter">theo</span>rix</Link>
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
          <Link to="/interval-identification">Interval Identification</Link>
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
              <Link to="/chord-identification">Chord Identification</Link>
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
              <Link to="/musical-terms">Musical Terms</Link>
            </DropdownMenuItem>
            <DropdownMenuItem onKeyDown={handleKeyDown}>
              <Link to="/circle-of-fifths">Circle of Fifths</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      </div>
      </div>
      </nav>
      <AnimatePresence mode="wait">
        {visible ? (
          <motion.div
            className={`gap-6 lg:flex w-full h-full fixed z-[1000] top-0 left-0 px-4 pt-[10%] bg-background lg:translate-x-0 lg:relative lg:bg-white lg:p-0 lg:w-fit lg:h-fit`}
            initial="closed"
            animate="open"
            exit="exit"
            variants={menuVariants}
            key="menu"
          >
            <div className="pt-14 lg:hidden">
              <h2 className="font-semibold text-xl">Intervals</h2>
              <ul className="pb-4">
                <li className="text-lg">
                  <Link to="/interval-identification" onClick={() => setVisible(false)}>
                    Interval Identification
                  </Link>
                </li>
                <li className="text-lg">
                  <Link to="/interval-quiz" onClick={() => setVisible(false)}>
                    Interval Quiz
                  </Link>
                </li>
              </ul>
              <h2 className="font-semibold text-xl">Chords</h2>
              <ul className="pb-4">
                <li className="text-lg">
                  <Link to="/chord-identification" onClick={() => setVisible(false)}>
                    Chord Identification
                  </Link>
                </li>
                <li className="text-lg">
                  <Link to="/chord-quiz" onClick={() => setVisible(false)}>
                    Chord Quiz
                  </Link>
                </li>
              </ul>
              <h2 className="font-semibold text-xl">Tools</h2>
              <ul>
                <li className="text-lg">
                  <Link to="/metronome" onClick={() => setVisible(false)}>
                    Metronome
                  </Link>
                </li>
                <li className="text-lg">
                  <Link to="/musical-terms" onClick={() => setVisible(false)}>
                    Musical Terms
                  </Link>
                </li>
                <li className="text-lg">
                  <Link to="/circle-of-fifths" onClick={() => setVisible(false)}>
                    Circle of Fifths
                  </Link>
                </li>
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}

export default Navbar