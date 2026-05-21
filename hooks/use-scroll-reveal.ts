'use client'

import { useEffect, useState } from 'react'

export function useScrollReveal() {
  const [visible, setVisible] = useState(true)
  const [scrollPos, setScrollPos] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset

      if (Math.abs(scrollPos - currentScrollPos) > 10) {
        const isVisible = scrollPos > currentScrollPos || currentScrollPos < 10
        setScrollPos(currentScrollPos)
        setVisible(isVisible)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [scrollPos])

  return visible
}
