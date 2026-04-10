'use client'

import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

interface AnimateOnScrollProps {
  children: React.ReactNode
  className?: string
  animation?: 'fade-up' | 'fade-in' | 'scale-in'
  delay?: number
  threshold?: number
}

const AnimateOnScroll = ({
  children,
  className,
  animation = 'fade-up',
  delay = 0,
  threshold = 0.1,
}: AnimateOnScrollProps) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    el.style.opacity = '0'
    el.style.animation = 'none'

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.opacity = ''
          el.style.animation = 'none'
          void el.offsetHeight // forces reflow to restart animation
          el.style.animation = `${animation} 0.65s ease-out ${delay}ms both`
        } else {
          el.style.animation = 'none'
          el.style.opacity = '0'
        }
      },
      { threshold }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animation, delay, threshold])

  return (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  )
}

export default AnimateOnScroll
