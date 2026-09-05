'use client'

import { useEffect } from 'react'

export function useBodyScrollLock(locked: boolean) {
  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', locked)
    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [locked])
}
