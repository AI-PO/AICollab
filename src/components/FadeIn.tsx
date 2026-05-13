import { useEffect, useRef } from 'react'

export default function FadeIn({ children, delay = 0, className = '' }: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        el.style.opacity = '1'
        el.style.transform = 'translateY(0)'
        obs.disconnect()
      }
    }, { threshold: 0.08 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      className={className}
      style={{ opacity: 0, transform: 'translateY(28px)', transition: `opacity 0.75s cubic-bezier(.22,.68,0,1.2) ${delay}s, transform 0.75s cubic-bezier(.22,.68,0,1.2) ${delay}s` }}
    >
      {children}
    </div>
  )
}
