import { lazy } from 'react'
import { useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"

import App from './App'
const CookieConsent = lazy(() => import('./components/CookieConsent'))
const Error = lazy(() => import('./pages/error'))
const IntervalQuiz = lazy(() => import('./pages/interval-quiz'))
const Metronome = lazy(() => import('./pages/metronome'))
const Dictionary = lazy(() => import('./pages/dictionary'))
const BuildingIntervals = lazy(() => import('./pages/building-intervals'))
const ChordQuiz = lazy(() => import('./pages/chord-quiz'))
const BuildingChords = lazy(() => import('./pages/building-chords'))
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'))
const TermsOfService = lazy(() => import('./pages/terms-of-service'))

const Root: React.FC = () => {
  const location = useLocation()
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <CookieConsent />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo(0, 0)}>
        <Routes location={location} key={location.pathname}>
          <Route path="/"element={<App />}/>
          <Route path="*" element={<Error />} />
          <Route path="/interval-quiz" element={<IntervalQuiz />} />
          <Route path="/metronome" element={<Metronome />} />
          <Route path="/dictionary" element={<Dictionary />} />
          <Route path="/building-intervals" element={<BuildingIntervals />} />
          <Route path="/chord-quiz" element={<ChordQuiz />} />
          <Route path="/building-chords" element={<BuildingChords />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  )
}

export default Root