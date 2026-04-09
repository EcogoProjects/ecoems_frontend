'use client'

import { useEffect } from 'react'

export default function FaviconSwitcher() {
  useEffect(() => {
    function getOrCreateLink(): HTMLLinkElement {
      let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
      if (!link) {
        link = document.createElement('link')
        link.rel = 'icon'
        document.head.appendChild(link)
      }
      return link
    }

    function setLightFavicon() {
      getOrCreateLink().href = '/ecogo_logo.png'
    }

    function setDarkFavicon() {
      const canvas = document.createElement('canvas')
      canvas.width = 100
      canvas.height = 100
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      ctx.fillStyle = '#CDAD75'
      ctx.beginPath()
      ctx.roundRect(0, 0, 100, 100, 14)
      ctx.fill()

      const img = new Image()
      img.onload = () => {
        ctx.drawImage(img, 0, 0, 100, 100)
        getOrCreateLink().href = canvas.toDataURL('image/png')
      }
      img.src = '/ecogo_logo.png'
    }

    const mql = window.matchMedia('(prefers-color-scheme: dark)')

    function apply(dark: boolean) {
      if (dark) setDarkFavicon()
      else setLightFavicon()
    }

    const handler = (e: MediaQueryListEvent) => apply(e.matches)

    apply(mql.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return null
}
