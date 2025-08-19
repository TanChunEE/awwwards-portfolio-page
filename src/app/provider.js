"use client";

import { useRef, startTransition, useEffect, useState } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import styles from "./provider.module.scss";

export default function Provider({ children }) {
    const firstLayer = useRef(null);
    const secondLayer = useRef(null);
    const thirdLayer = useRef(null);
    const floatingElements = useRef([]);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        // Ensure GSAP is properly initialized
        if (typeof window !== 'undefined') {
            gsap.set([firstLayer.current, secondLayer.current, thirdLayer.current], { 
                scale: 0,
                rotation: 45,
                opacity: 0
            });

            // Initialize floating elements
            floatingElements.current.forEach((el, index) => {
                gsap.set(el, {
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    rotation: Math.random() * 360,
                    scale: 0.3 + Math.random() * 0.7
                });
            });

            // Animate floating elements
            floatingElements.current.forEach((el, index) => {
                gsap.to(el, {
                    x: Math.random() * window.innerWidth,
                    y: Math.random() * window.innerHeight,
                    rotation: Math.random() * 360,
                    duration: 15 + Math.random() * 10,
                    ease: "none",
                    repeat: -1,
                    yoyo: true
                });
            });

            // Mouse tracking for interactive effects
            const handleMouseMove = (e) => {
                setMousePosition({ x: e.clientX, y: e.clientY });
                
                // Parallax effect on layers
                const xOffset = (e.clientX - window.innerWidth / 2) * 0.02;
                const yOffset = (e.clientY - window.innerHeight / 2) * 0.02;
                
                gsap.to(thirdLayer.current, {
                    x: xOffset,
                    y: yOffset,
                    duration: 0.5,
                    ease: "power2.out"
                });
            };

            window.addEventListener('mousemove', handleMouseMove);
            return () => window.removeEventListener('mousemove', handleMouseMove);
        }
    }, []);

    return (
        <TransitionRouter
            auto
            leave={(next, from, to) => {
                let timelineInstance;

                const waitForNavExit = () => {
                    if (typeof window === 'undefined') return Promise.resolve();
                    return new Promise((resolve) => {
                        let settled = false;
                        const done = () => { if (!settled) { settled = true; resolve(); } };
                        const handler = () => { window.removeEventListener('app:navExited', handler); done(); };
                        window.addEventListener('app:navExited', handler, { once: true });
                        window.dispatchEvent(new Event('app:closeNav'));
                        setTimeout(done, 800); // Reduced from 1200ms
                    });
                };

                waitForNavExit().then(() => {
                    timelineInstance = gsap
                        .timeline({ onComplete: next })
                        .fromTo(
                            firstLayer.current,
                            { 
                                scale: 0,
                                rotation: 45,
                                opacity: 0
                            },
                            {
                                scale: 1,
                                rotation: 0,
                                opacity: 1,
                                duration: 0.6, // Reduced from 1.2s
                                ease: "back.out(1.7)",
                            },
                        )
                        .fromTo(
                            secondLayer.current,
                            {
                                scale: 0,
                                rotation: -45,
                                opacity: 0
                            },
                            {
                                scale: 1,
                                rotation: 0,
                                opacity: 1,
                                duration: 0.6, // Reduced from 1.2s
                                ease: "back.out(1.7)",
                            },
                            "<20%",
                        )
                        .fromTo(
                            thirdLayer.current,
                            {
                                scale: 0,
                                rotation: 90,
                                opacity: 0
                            },
                            {
                                scale: 1,
                                rotation: 0,
                                opacity: 1,
                                duration: 0.5, // Reduced from 1.0s
                                ease: "elastic.out(1, 0.5)",
                            },
                            "<30%",
                        )
                        .fromTo(
                            floatingElements.current,
                            {
                                scale: 0,
                                opacity: 0
                            },
                            {
                                scale: 1,
                                opacity: 1,
                                duration: 0.4, // Reduced from 0.8s
                                stagger: 0.05, // Reduced from 0.1s
                                ease: "back.out(1.7)",
                            },
                            "<40%",
                        );
                });

                return () => {
                    if (timelineInstance) timelineInstance.kill();
                };
            }}
            enter={(next) => {
                const tl = gsap
                .timeline()
                .fromTo(
                    floatingElements.current,
                    { 
                        scale: 1,
                        opacity: 1
                    },
                    {
                        scale: 0,
                        opacity: 0,
                        duration: 0.3, // Reduced from 0.4s
                        stagger: 0.03, // Reduced from 0.05s
                        ease: "power2.in",
                    },
                )
                .fromTo(
                    thirdLayer.current,
                    { 
                        scale: 1,
                        rotation: 0,
                        opacity: 1
                    },
                    {
                        scale: 0,
                        rotation: 180,
                        opacity: 0,
                        duration: 0.4, // Reduced from 0.7s
                        ease: "power2.in",
                    },
                    "<20%",
                )
                .fromTo(
                    secondLayer.current,
                    { 
                        scale: 1,
                        rotation: 0,
                        opacity: 1
                    },
                    {
                        scale: 0,
                        rotation: -180,
                        opacity: 0,
                        duration: 0.4, // Reduced from 0.7s
                        ease: "power2.in",
                    },
                    "<30%",
                )
                .fromTo(
                    firstLayer.current,
                    { 
                        scale: 1,
                        rotation: 0,
                        opacity: 1
                    },
                    {
                        scale: 0,
                        rotation: 180,
                        opacity: 0,
                        duration: 0.4, // Reduced from 0.7s
                        ease: "power2.in",
                    },
                    "<40%",
                )
                .call(() => {
                    // Defer React updates to prevent jank during animation
                    requestAnimationFrame(() => {
                        startTransition(next);
                    });
                }, undefined, "<50%"); // Reduced from 60%

                return () => {
                tl.kill();
                };
            }}
        >
            <main>{children}</main>

            {/* Animated background layers */}
            <div
                ref={firstLayer}
                className={styles.firstLayer}
            />
            <div
                ref={secondLayer}
                className={styles.secondLayer}
            />
            <div
                ref={thirdLayer}
                className={styles.thirdLayer}
            />

            {/* Floating interactive elements - reduced from 8 to 4 */}
            {[...Array(4)].map((_, index) => (
                <div
                    key={index}
                    ref={(el) => (floatingElements.current[index] = el)}
                    className={styles.floatingElement}
                    style={{
                        '--hue': (index * 90) % 360, // Adjusted for 4 elements
                        '--delay': index * 0.3 // Adjusted for 4 elements
                    }}
                />
            ))}

            {/* Dynamic cursor follower */}
            <div 
                className={styles.cursorFollower}
                style={{
                    left: mousePosition.x,
                    top: mousePosition.y
                }}
            />
        </TransitionRouter>
    )
}