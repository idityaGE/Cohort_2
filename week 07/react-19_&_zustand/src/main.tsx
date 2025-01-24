import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConterProvider } from './components/contextwithuse.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConterProvider>
      <App />
    </ConterProvider>
  </StrictMode>,
)
