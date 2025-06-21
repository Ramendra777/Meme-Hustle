import { useEffect } from 'react'

export const useCyberpunkEffects = () => {
  const applyGlitch = (element) => {
    if (!element) return
    
    // Add glitch effect
    element.style.animation = 'glitch 1s linear infinite'
    
    // Add hover effect
    element.addEventListener('mouseenter', () => {
      element.style.textShadow = '0 0 10px #ff00ff, 0 0 20px #00f0ff'
    })
    
    element.addEventListener('mouseleave', () => {
      element.style.textShadow = ''
    })
  }

  const applyScanlines = (element) => {
    if (!element) return
    
    const scanlines = document.createElement('div')
    scanlines.style.position = 'absolute'
    scanlines.style.top = '0'
    scanlines.style.left = '0'
    scanlines.style.width = '100%'
    scanlines.style.height = '100%'
    scanlines.style.background = `linear-gradient(
      to bottom,
      transparent 95%,
      rgba(0, 240, 255, 0.1) 95%
    )`
    scanlines.style.backgroundSize = '100% 5px'
    scanlines.style.pointerEvents = 'none'
    scanlines.style.zIndex = '100'
    
    element.style.position = 'relative'
    element.appendChild(scanlines)
  }

  const applyTerminalEffect = (element) => {
    if (!element) return
    
    let originalText = element.textContent
    element.textContent = ''
    
    let i = 0
    const typing = setInterval(() => {
      if (i < originalText.length) {
        element.textContent += originalText.charAt(i)
        i++
      } else {
        clearInterval(typing)
      }
    }, 50)
  }

  return { applyGlitch, applyScanlines, applyTerminalEffect }
}