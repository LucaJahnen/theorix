import { createRoot } from 'react-dom/client'
import Error from './pages/error'
import App from './App.tsx'
import IntervalQuiz from './pages/interval-quiz'
import Metronome from './pages/metronome'
import Dictionary from './pages/dictionary'
import BuildingIntervals from './pages/building-intervals'
import ChordQuiz from './pages/chord-quiz/index.tsx'
import BuildingChords from './pages/building-chords/index.tsx'
import PrivacyPolicy from './pages/privacy-policy/index.tsx'
import TermsOfService from './pages/terms-of-service/index.tsx'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />
  },
  {
    path: "/interval-quiz",
    element: <IntervalQuiz />,
  },
  {
    path: "/metronome",
    element: <Metronome />,
  },
  {
    path: "/dictionary",
    element: <Dictionary />,
  },
  {
    path: "/building-intervals",
    element: <BuildingIntervals />,
  },
  {
    path: "/chord-quiz",
    element: <ChordQuiz />,
  },
  {
    path: "/building-chords",
    element: <BuildingChords />,
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />,
  },
  {
    path: "/terms-of-service",
    element: <TermsOfService />,
  },
]);

createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />
)
