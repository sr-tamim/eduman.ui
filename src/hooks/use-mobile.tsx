'use client';

import { useState, useEffect } from 'react';

const MOBILE_BREAKPOINT = 768;

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);

  useEffect(() => {
    // Initial check needs to happen in browser environment
    if (typeof window !== 'undefined') {
      const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
      const onChange = () => {
        setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
      };

      // Modern API for event listener
      mql.addEventListener('change', onChange);

      // Set initial value
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);

      // Cleanup
      return () => mql.removeEventListener('change', onChange);
    }
  }, []);

  return !!isMobile;
}
