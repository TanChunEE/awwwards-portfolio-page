"use client";

import { useRef, startTransition, useEffect } from "react";
import { gsap } from "gsap";
import { TransitionRouter } from "next-transition-router";
import styles from "./provider.module.scss";

export default function Provider({ children }) {
    const firstLayer = useRef(null);
    const secondLayer = useRef(null);

    useEffect(() => {
        // Ensure GSAP is properly initialized
        if (typeof window !== 'undefined') {
            gsap.set([firstLayer.current, secondLayer.current], { 
                scale: 0,
                rotation: 45,
                opacity: 0
            });
        }
    }, []);

    return (
        <TransitionRouter
            auto
            leave={(next, from, to) => {
                console.log({ from, to });

                const tl = gsap
                .timeline({
                    onComplete: next,
                })
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
                        duration: 0.8,
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
                        duration: 0.8,
                        ease: "back.out(1.7)",
                    },
                    "<30%",
                );

                return () => {
                tl.kill();
                };
            }}
            enter={(next) => {
                const tl = gsap
                .timeline()
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
                        duration: 0.6,
                        ease: "power2.in",
                    },
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
                        duration: 0.6,
                        ease: "power2.in",
                    },
                    "<40%",
                )
                .call(() => {
                    // Defer React updates to prevent jank during animation
                    requestAnimationFrame(() => {
                        startTransition(next);
                    });
                }, undefined, "<60%");

                return () => {
                tl.kill();
                };
            }}
        >
            <main>{children}</main>

            <div
                ref={firstLayer}
                className={styles.firstLayer}
            />
            <div
                ref={secondLayer}
                className={styles.secondLayer}
            />
        </TransitionRouter>
    )
}