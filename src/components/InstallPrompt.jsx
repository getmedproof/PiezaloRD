import { useState, useEffect } from 'react'
import './InstallPrompt.css'

function InstallPrompt() {
  const [show, setShow] = useState(false)
  const [isIOS, setIsIOS] = useState(false)

  useEffect(() => {
    const dismissed = localStorage.getItem('installPromptDismissed')
    if (dismissed) return

    const ios = /iphone|ipad|ipod/.test(navigator.userAgent.toLowerCase())
    const isInStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
    
    if (ios && !isInStandaloneMode) {
      setIsIOS(true)
      setShow(true)
    }
  }, [])

  function dismiss() {
    localStorage.setItem('installPromptDismissed', 'true')
    setShow(false)
  }

  if (!show) return null

  return (
    <div className="install-prompt">
      <div className="install-prompt-content">
        <img src="/piezalordicon.png" alt="PiezaloRD" className="install-icon" />
        <div className="install-text">
          <p className="install-title">¡Instala PiezaloRD!</p>
          <p className="install-desc">Toca <strong>compartir</strong> <span>⎙</span> y luego <strong>"Agregar a pantalla de inicio"</strong></p>
        </div>
        <button className="install-close" onClick={dismiss}>✕</button>
      </div>
    </div>
  )
}

export default InstallPrompt