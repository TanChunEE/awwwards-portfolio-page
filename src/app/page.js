'use client';
import styles from './page.module.scss'
import { useEffect, useState } from 'react'
import { AnimatePresence } from 'framer-motion';
import Preloader from '../components/Preloader';
import Landing from '../components/Landing';
import Projects from '../components/Projects';
import Description from '../components/Description';
import SlidingImages from '../components/SlidingImages';
import Contact from '../components/Contact';
import { useLocomotiveScroll } from '../hooks/useLocomotiveScroll';

export default function Home() {

  const [isLoading, setIsLoading] = useState(true);

  // Initialize Locomotive Scroll
  useLocomotiveScroll();

  useEffect( () => {
    // Simulate loading time for preloader
    setTimeout( () => {
      setIsLoading(false);
    }, 2000)
  }, [])

  return (
    <main className={styles.main} data-scroll-container>
      <AnimatePresence mode='wait'>
        {isLoading && <Preloader />}
      </AnimatePresence>
      <Landing />
      <Description />
      <Projects />
      <SlidingImages />
      <Contact />
    </main>
  )
}
