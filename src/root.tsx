import { lazy, Suspense } from 'react'
import { useLocation } from 'react-router-dom'
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Fallback from './components/Fallback'
import { Link } from 'react-router-dom'

const App = lazy(() => import('./App'))
const Error = lazy(() => import('./pages/error'))
const IntervalQuiz = lazy(() => import('./pages/interval-quiz'))
const Metronome = lazy(() => import('./pages/metronome'))
const Dictionary = lazy(() => import('./pages/dictionary'))
const CircleOfFifths = lazy(() => import('./pages/circle-of-fifths'))
const BuildingIntervals = lazy(() => import('./pages/building-intervals'))
const ChordQuiz = lazy(() => import('./pages/chord-quiz'))
const BuildingChords = lazy(() => import('./pages/building-chords'))
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'))
const TermsOfService = lazy(() => import('./pages/terms-of-service'))

const Root: React.FC = () => {
  const location = useLocation()
  interface RouteConfigInterface {
    path: string
    element: React.ReactNode
    aboveTheFold: React.ReactNode
  }

  const RouteConfig: RouteConfigInterface[] = [{
    path: "/chord-quiz",
    element: <ChordQuiz />,
    aboveTheFold:
      <>
        <h1 className="text-3xl font-semibold pb-4">Chord Quiz</h1>
        <p style={{ maxWidth: "65ch" }}>Your task is to identify the chord shown below. If you need help, you can refer to the provided resources down below. To fit every level, you may select one of the available difficulty settings: easy, medium, or hard.</p>
      </>
  },
  {
    path: "/interval-quiz",
    element: <IntervalQuiz />,
    aboveTheFold: 
    <>
      <h1 className="text-3xl font-semibold pb-4">Interval Quiz</h1>
      <p>Your task is to identify the interval shown below. If you need help, you can refer to the provided resources down below. To fit every level, you may select one of the available difficulty settings: easy, medium, or hard.</p>
    </>
  },
  {
    path: "/musical-terms",
    element: <Dictionary />,
    aboveTheFold:
      <>
        <h1 className="text-3xl font-semibold pb-4">Italian music terms</h1>
        <p className="leading-relaxed max-w-[65ch]">Italian is the universal language of classical music. This page provides definitions and explanations of common Italian musical terms used to indicate tempo, expression, dynamics, articulation, and more &#8210; helping musicians interpret music accurately and with style. You can quickly find any term using the search function below.</p>
      </>
  },
  {
    path: "/circle-of-fifths",
    element: <CircleOfFifths />,
    aboveTheFold: 
    <>
      <h1 className="text-3xl font-semibold pb-4">Circle of Fifths</h1>
      <p className="pb-10 max-w-[65ch] leading-relaxed">This interactive Circle of Fifths Chart is a powerful tool for understanding the relationships between keys, chords, and scales in music theory. Use this interactive diagram to explore how major and minor keys connect, discover key signatures, and see which chords belong to each key. Click or tap on any segment to rotate the circle and learn more about each key and its chord functions.</p>
    </>
  },
  {
    path: "/metronome",
    element: <Metronome />,
    aboveTheFold: 
    <>
      <h1 className="text-3xl font-semibold pb-4">Metronome</h1>
      <p>A free online metronome to practice your tempo. It features different time signatures and both visual and acoustic beats. You can select any tempo between 40 and 220 beats per minute (BPM).</p>
    </>
  },
  {
    path: "/interval-identification",
    element: <BuildingIntervals />,
    aboveTheFold: 
    <>
      <h1 className="text-3xl font-semibold pb-4">How to identify Intervals</h1>
      <p className="mb-7 leading-relaxed">When learning music theory, intervals are one of the most fundamental concepts. Intervals are the building blocks of melodies and chords, and understanding them will greatly improve your ability to read, play, and compose music. In this article, I'll explain what intervals are and how they are measured.</p>
    </>
  },
  {
    path: "/chord-identification",
    element: <BuildingChords />,
    aboveTheFold:
    <>
      <h1 className="text-3xl font-semibold pb-4">How to identify chords</h1>
      <p className="mb-7 leading-relaxed">Chords are a key topic in music theory. Each and every song is built on top of them and this gives them their mood (e. g. happy, sad). But before reading this article I would strongly recommend to read the <Link to="/interval-identification" className="underline">guide on how to find intervals in music theory.</Link> because this will improve your understanding of chords and make this session easier overall.</p>
    </>
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
    aboveTheFold: <></>
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
    aboveTheFold: <></>
  },
  {
    path: "/",
    element: <App />,
    aboveTheFold: <></>
  },
  {
    path: "*",
    element: <Error />,
    aboveTheFold: <></>
  }
]

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navbar />
      <main className="px-4 pt-6 lg:w-[60%] lg:block lg:m-auto">
        <Routes location={location} key={location.pathname}>
          {RouteConfig.map(({path, element, aboveTheFold}) => (
            <Route key={path} path={path} element={
            <>
              {aboveTheFold}
              <Suspense fallback={<><Fallback /><div className="min-h-[400px]" /></>}>
                {element}
              </Suspense>
            </>
            } />
          ))}
        </Routes>
      </main>
      <Footer />
    </ThemeProvider>
  )
}

export default Root