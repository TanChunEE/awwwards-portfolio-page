'use client';
import { useEffect, useRef } from 'react';

export const useLocomotiveScroll = () => {
  const locomotiveRef = useRef(null);

  useEffect(() => {
    const initLocomotive = async () => {
      try {
        const LocomotiveScroll = (await import('locomotive-scroll')).default;
        
        // Destroy existing instance if it exists
        if (locomotiveRef.current) {
          locomotiveRef.current.destroy();
        }

        // Initialize new instance
        locomotiveRef.current = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]'),
          smooth: true,
          multiplier: 1,
          class: 'is-revealed',
          reloadOnContextChange: true,
          touchMultiplier: 2,
          smoothMobile: false,
        });

        // Set cursor to default after initialization
        document.body.style.cursor = 'default';
        
        // Scroll to top
        window.scrollTo(0, 0);
        
      } catch (error) {
        console.error('Error initializing Locomotive Scroll:', error);
        // Fallback to normal scrolling if Locomotive fails
        document.body.style.cursor = 'default';
      }
    };

    // Small delay to ensure DOM is ready
    const timer = setTimeout(initLocomotive, 100);

    return () => {
      clearTimeout(timer);
      if (locomotiveRef.current) {
        locomotiveRef.current.destroy();
      }
    };
  }, []);

  return locomotiveRef.current;
};
