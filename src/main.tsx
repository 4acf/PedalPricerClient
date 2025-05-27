import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './Home'
import { useIsMobile } from './hooks/use-mobile'

function App() {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '1rem',
          textAlign: 'center',
          fontFamily: 'system-ui, sans-serif',
          fontSize: '1.5rem',
        }}
      >
        🚫 Screen width too small. Please switch to a desktop device or rotate device.
      </div>
    )
  }

  return <Home />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
