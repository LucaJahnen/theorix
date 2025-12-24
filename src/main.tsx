import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import AppRoutes from './root'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <AppRoutes />
  </BrowserRouter>
)