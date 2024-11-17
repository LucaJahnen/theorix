import { Suspense, lazy } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import App from './App'
const Error = lazy(() => import('./pages/error'))
const IntervalQuiz = lazy(() => import('./pages/interval-quiz'))
const Metronome = lazy(() => import('./pages/metronome'))
const Dictionary = lazy(() => import('./pages/dictionary'))
const BuildingIntervals = lazy(() => import('./pages/building-intervals'))
const ChordQuiz = lazy(() => import('./pages/chord-quiz'))
const BuildingChords = lazy(() => import('./pages/building-chords'))
const PrivacyPolicy = lazy(() => import('./pages/privacy-policy'))
const TermsOfService = lazy(() => import('./pages/terms-of-service'))

const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Suspense fallback={<p>Loading...</p>}>
            <App />
        </Suspense>
      ),
      errorElement: (
        <Suspense fallback={<p>Loading...</p>}>
          <Error />
        </Suspense>
      )
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
])

const Root = () => <RouterProvider router={router} />
export default Root