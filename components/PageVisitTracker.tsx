'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { logVisit } from '@/lib/api';

export default function PageVisitTracker() {
  const pathname = usePathname();
  
  useEffect(() => {
    const trackPageVisit = async () => {
      try {
        const referrer = document.referrer;
        await logVisit(pathname, referrer);
      } catch (error) {
        console.error('Failed to track page visit:', error);
      }
    };
    
    trackPageVisit();
  }, [pathname]);
  
  return null;
}