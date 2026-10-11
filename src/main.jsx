import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/base.css'
import AOS from 'aos'
import 'aos/dist/aos.css'

AOS.init({ duration: 700, once: true, offset: 80, startEvent: 'DOMContentLoaded' })

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>,
)