'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import { usePathname } from 'next/navigation';
import { AnimatePresence } from 'framer-motion';
import Nav from './nav';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Rounded from '../../common/RoundedButton';
import Magnetic from '../../common/Magnetic';

export default function index() {
    const header = useRef(null);
    const [isActive, setIsActive] = useState(false);
    const pathname = usePathname();
    const button = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect( () => {
      if(isActive) setIsActive(false)
    }, [pathname])

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handler = () => setIsActive(false);
        window.addEventListener('app:closeNav', handler);
        return () => window.removeEventListener('app:closeNav', handler);
    }, [])

    useLayoutEffect( () => {
        gsap.registerPlugin(ScrollTrigger)
        
        // Kill any existing ScrollTrigger to prevent conflicts
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger === document.documentElement) {
                trigger.kill();
            }
        });
        
        // Check if we're on home page or other pages
        const isHomePage = pathname === '/';
        
        if (isHomePage) {
            // On home page: hide button initially and show after scrolling 100vh
            gsap.set(button.current, {scale: 0}); // Hide button initially
            setIsVisible(false);
            
            gsap.to(button.current, {
                scrollTrigger: {
                    trigger: document.documentElement,
                    start: 0,
                    end: window.innerHeight,
                    onLeave: () => {
                        gsap.to(button.current, {scale: 1, duration: 0.25, ease: "power1.out"})
                        setIsVisible(true);
                    },
                    onEnterBack: () => {
                        gsap.to(button.current, {scale: 0, duration: 0.25, ease: "power1.out"})
                        setIsVisible(false);
                        setIsActive(false);
                    }
                }
            })
        } else {
            // On other pages: show button immediately
            gsap.set(button.current, {scale: 1});
            setIsVisible(true);
        }
        
        // Cleanup function
        return () => {
            ScrollTrigger.getAll().forEach(trigger => {
                if (trigger.vars.trigger === document.documentElement) {
                    trigger.kill();
                }
            });
        }
    }, [pathname])

    return (
        <>
        <div ref={header} className={styles.header}>
            <div className={styles.logo}>
                <p className={styles.copyright}>©</p>
                <div className={styles.name}>
                    <p className={styles.codeBy}>Code by</p>
                    <p className={styles.dennis}>Dennis</p>
                    <p className={styles.snellenberg}>Snellenberg</p>
                </div>
            </div>
            <div className={styles.nav}>
                <Magnetic>
                    <div className={styles.el}>
                        <a>Work</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <a>About</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
                <Magnetic>
                    <div className={styles.el}>
                        <a>Contact</a>
                        <div className={styles.indicator}></div>
                    </div>
                </Magnetic>
            </div>
        </div>
        <div ref={button} className={styles.headerButtonContainer}>
            <Rounded onClick={() => {setIsActive(!isActive)}} className={`${styles.button}`}>
                <div className={`${styles.burger} ${isActive ? styles.burgerActive : ""}`}></div>
            </Rounded>
        </div>
        <AnimatePresence mode="wait">
            {isActive && <Nav />}
        </AnimatePresence>
        </>
    )
}
