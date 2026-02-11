'use client'

import { useScrollAnimation } from '@/hooks/useScrollAnimation'
import { ReactNode } from 'react'

interface AnimatedSectionProps {
  children: ReactNode
  animation?: 'fade-in-up' | 'fade-in-down' | 'slide-in-left' | 'slide-in-right' | 'scale-in'
  delay?: number
}

export function AnimatedSection({
  children,
  animation = 'fade-in-up',
  delay = 0,
}: AnimatedSectionProps) {
  const { ref, isVisible } = useScrollAnimation()

  const animationMap = {
    'fade-in-up': 'animate-fade-in-up',
    'fade-in-down': 'animate-fade-in-down',
    'slide-in-left': 'animate-slide-in-left',
    'slide-in-right': 'animate-slide-in-right',
    'scale-in': 'animate-scale-in',
  }

  return (
    <div
      ref={ref}
      className={isVisible ? animationMap[animation] : 'opacity-0'}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  )
}
