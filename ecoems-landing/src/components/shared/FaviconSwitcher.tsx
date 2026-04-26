'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

let darkDataUrl: string | null = null

function getOrCreateLink(): HTMLLinkElement {
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]')
  if (!link) {
    link = document.createElement('link')
    link.rel = 'icon'
    document.head.appendChild(link)
  }
  return link
}

function applyFavicon(dark: boolean) {
  const link = getOrCreateLink()
  if (dark && darkDataUrl) {
    link.href = darkDataUrl
  } else if (!dark) {
    link.href = '/ecogo_logo.png'
  }
}

function generateDarkFavicon(onReady: () => void) {
  if (darkDataUrl) { onReady(); return }

  const canvas = document.createElement('canvas')
  canvas.width = 100
  canvas.height = 100
  const ctx = canvas.getContext('2d')
  if (!ctx) { onReady(); return }

  ctx.fillStyle = '#CDAD75'
  ctx.beginPath()
  ctx.roundRect(0, 0, 100, 100, 14)
  ctx.fill()

  const img = new Image()
  img.onload = () => {
    ctx.drawImage(img, 0, 0, 100, 100)
    darkDataUrl = canvas.toDataURL('image/png')
    onReady()
  }
  img.src = '/ecogo_logo.png'
}

export default function FaviconSwitcher() {
  const pathname = usePathname()

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')

    function apply(dark: boolean) {
      if (dark) {
        generateDarkFavicon(() => applyFavicon(true))
      } else {
        applyFavicon(false)
      }
    }

    const handler = (e: MediaQueryListEvent) => apply(e.matches)

    apply(mql.matches)
    mql.addEventListener('change', handler)

    return () => mql.removeEventListener('change', handler)
  }, [pathname])

  return null
}
