import { createRoot } from 'react-dom/client'
import { Suspense } from "react"
import './index.css'
import AppRoutes from './root'
import { BrowserRouter } from 'react-router-dom'
import Fallback from './components/Fallback'
import Navbar from './components/Navbar'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Suspense fallback={<><Navbar /><Fallback /></>}>
      <AppRoutes />
    </Suspense>
  </BrowserRouter>
)