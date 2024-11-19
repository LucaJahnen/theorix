import { createRoot } from 'react-dom/client'
import { Suspense } from "react"
import './index.css'
import AppRoutes from './root'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Suspense fallback={<p>Loading...</p>}>
      <AppRoutes />
    </Suspense>
  </BrowserRouter>
)