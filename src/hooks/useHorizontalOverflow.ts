'use client'

import { useEffect, useRef, useState } from 'react'

export function useHorizontalOverflow(dependencyKey?: string) {
  const scrollerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(false)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) {
      return
    }

    const updateOverflow = () => {
      const maxScroll = scroller.scrollWidth - scroller.clientWidth
      setCanScrollLeft(scroller.scrollLeft > 1)
      setCanScrollRight(maxScroll - scroller.scrollLeft > 1)
    }

    updateOverflow()
    scroller.addEventListener('scroll', updateOverflow, { passive: true })
    const observer = new ResizeObserver(updateOverflow)
    observer.observe(scroller)

    return () => {
      scroller.removeEventListener('scroll', updateOverflow)
      observer.disconnect()
    }
  }, [dependencyKey])

  return {
    scrollerRef,
    canScrollLeft,
    canScrollRight,
    overflowing: canScrollLeft || canScrollRight,
  }
}
