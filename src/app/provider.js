"use client";

import { useRef, startTransition, useEffect, useState } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import styles from "./provider.module.scss";

export default function Provider({ children }) {
    const transitionOverlay = useRef(null);
    const liquidShape = useRef(null);
    const particles = useRef([]);
    const glassPanel = useRef(null);
    const logoReveal = useRef(null);
    const colorWave1 = useRef(null);
    const colorWave2 = useRef(null);
    const [isTransitioning, setIsTransitioning] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Initialize particles with deterministic positions
            particles.current.forEach((particle, index) => {
                if (particle) {
                    gsap.set(particle, {
                        x: (index * 137.5) % window.innerWidth - window.innerWidth / 2,
                        y: (index * 89.3) % window.innerHeight - window.innerHeight / 2,
                        scale: 0,
                        opacity: 0
                    });
                }
            });
        }
    }, []);

    return (
        <TransitionRouter
            auto
            leave={(next, from, to) => {
                let timelineInstance;
                setIsTransitioning(true);

                const waitForNavExit = () => {
                    if (typeof window === 'undefined') return Promise.resolve();
                    return new Promise((resolve) => {
                        let settled = false;
                        const done = () => { if (!settled) { settled = true; resolve(); } };
                        const handler = () => { window.removeEventListener('app:navExited', handler); done(); };
                        window.addEventListener('app:navExited', handler, { once: true });
                        window.dispatchEvent(new Event('app:closeNav'));
                        setTimeout(done, 600);
                    });
                };

                waitForNavExit().then(() => {
                    timelineInstance = gsap
                        .timeline({ 
                            onComplete: () => {
                                next();
                                setIsTransitioning(false);
                            }
                        })
                        // Color waves sweep in
                        .fromTo(
                            colorWave1.current,
                            { 
                                left: '-100%',
                                rotation: -15,
                                opacity: 0
                            },
                            {
                                left: '0%',
                                rotation: 0,
                                opacity: 1,
                                duration: 0.8,
                                ease: "power3.out",
                            }
                        )
                        .fromTo(
                            colorWave2.current,
                            { 
                                right: '-100%',
                                rotation: 15,
                                opacity: 0
                            },
                            {
                                right: '0%',
                                rotation: 0,
                                opacity: 1,
                                duration: 0.8,
                                ease: "power3.out",
                            },
                            "<0.1"
                        )
                        // Liquid shape morphs in
                        .fromTo(
                            liquidShape.current,
                            {
                                scale: 0,
                                rotation: 180,
                                borderRadius: '50%'
                            },
                            {
                                scale: 1,
                                rotation: 0,
                                borderRadius: '30%',
                                duration: 1,
                                ease: "elastic.out(1, 0.6)",
                            },
                            "<0.2"
                        )
                        // Particles burst
                        .fromTo(
                            particles.current,
                            {
                                scale: 0,
                                opacity: 0,
                                x: 0,
                                y: 0
                            },
                            {
                                scale: (index) => 0.5 + (index % 3) * 0.3,
                                opacity: 1,
                                x: (index) => ((index * 73) % 100 - 50) * window.innerWidth * 0.01,
                                y: (index) => ((index * 47) % 100 - 50) * window.innerHeight * 0.01,
                                rotation: (index) => (index * 137.5) % 360,
                                duration: 0.8,
                                stagger: {
                                    amount: 0.3,
                                    from: "center"
                                },
                                ease: "power2.out"
                            },
                            "<0.3"
                        )
                        // Glass panel slides in
                        .fromTo(
                            glassPanel.current,
                            {
                                scale: 0.8,
                                y: 100,
                                opacity: 0
                            },
                            {
                                scale: 1,
                                y: 0,
                                opacity: 1,
                                duration: 0.6,
                                ease: "back.out(1.5)"
                            },
                            "<0.4"
                        )
                        // Logo reveal
                        .fromTo(
                            logoReveal.current,
                            {
                                scale: 0,
                                rotation: -180,
                                opacity: 0
                            },
                            {
                                scale: 1,
                                rotation: 0,
                                opacity: 1,
                                duration: 0.7,
                                ease: "back.out(2)"
                            },
                            "<0.2"
                        );
                });

                return () => {
                    if (timelineInstance) timelineInstance.kill();
                };
            }}
            enter={(next) => {
                const tl = gsap
                    .timeline()
                    // Logo disappears
                    .to(logoReveal.current, {
                        scale: 0,
                        rotation: 180,
                        opacity: 0,
                        duration: 0.4,
                        ease: "power2.in"
                    })
                    // Glass panel slides out
                    .to(glassPanel.current, {
                        scale: 1.1,
                        y: -100,
                        opacity: 0,
                        duration: 0.5,
                        ease: "power2.in"
                    }, "<0.1")
                    // Particles implode
                    .to(particles.current, {
                        scale: 0,
                        opacity: 0,
                        x: 0,
                        y: 0,
                        duration: 0.5,
                        stagger: {
                            amount: 0.2,
                            from: "edges"
                        },
                        ease: "power2.in"
                    }, "<0.1")
                    // Liquid shape morphs out
                    .to(liquidShape.current, {
                        scale: 0,
                        rotation: -180,
                        borderRadius: '0%',
                        duration: 0.6,
                        ease: "power2.in"
                    }, "<0.1")
                    // Color waves sweep out
                    .to(colorWave1.current, {
                        left: '100%',
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.in"
                    }, "<0.2")
                    .to(colorWave2.current, {
                        right: '100%',
                        opacity: 0,
                        duration: 0.6,
                        ease: "power3.in"
                    }, "<0.2")
                    .call(() => {
                        requestAnimationFrame(() => {
                            startTransition(next);
                        });
                    }, undefined, "<0.3");

                return () => {
                    tl.kill();
                };
            }}
        >
            <main>{children}</main>

            {/* Transition Overlay */}
            <div ref={transitionOverlay} className={styles.transitionOverlay}>
                {/* Color Wave 1 */}
                <div ref={colorWave1} className={styles.colorWave1} />
                
                {/* Color Wave 2 */}
                <div ref={colorWave2} className={styles.colorWave2} />

                {/* Liquid Morphing Shape */}
                <div ref={liquidShape} className={styles.liquidShape}>
                    <div className={styles.liquidInner} />
                </div>

                {/* Glass Panel */}
                <div ref={glassPanel} className={styles.glassPanel}>
                    <div className={styles.glassShine} />
                </div>

                {/* Logo/Icon Reveal */}
                <div ref={logoReveal} className={styles.logoReveal}>
                    <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
                        <path 
                            d="M30 5L55 17.5V42.5L30 55L5 42.5V17.5L30 5Z" 
                            stroke="white" 
                            strokeWidth="2" 
                            fill="rgba(255,255,255,0.1)"
                        />
                        <circle cx="30" cy="30" r="8" fill="white" />
                    </svg>
                </div>

                {/* Particle System */}
                {[...Array(20)].map((_, index) => (
                    <div
                        key={index}
                        ref={(el) => (particles.current[index] = el)}
                        className={styles.particle}
                        style={{
                            '--hue': (index * 18) % 360,
                            '--size': `${8 + (index % 5) * 2.4}px`
                        }}
                    />
                ))}
            </div>
        </TransitionRouter>
    );
}
