'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

export default function ParticleSystem() {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const particlesRef = useRef([]);
    const mouseRef = useRef({ x: 0, y: 0 });
    const [isEnabled, setIsEnabled] = useState(true);

    useEffect(() => {
        if (!isEnabled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Particle class
        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.size = Math.random() * 2 + 1;
                this.opacity = Math.random() * 0.5 + 0.2;
                this.hue = Math.random() * 360;
                this.life = 1;
                this.maxLife = Math.random() * 300 + 200;
            }

            update() {
                // Mouse attraction
                const dx = mouseRef.current.x - this.x;
                const dy = mouseRef.current.y - this.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    this.vx += (dx / distance) * force * 0.01;
                    this.vy += (dy / distance) * force * 0.01;
                }

                // Update position
                this.x += this.vx;
                this.y += this.vy;

                // Boundary check
                if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
                if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

                // Life cycle
                this.life -= 1 / this.maxLife;
                if (this.life <= 0) {
                    this.reset();
                }

                // Friction
                this.vx *= 0.99;
                this.vy *= 0.99;
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.vx = (Math.random() - 0.5) * 0.5;
                this.vy = (Math.random() - 0.5) * 0.5;
                this.life = 1;
                this.hue = Math.random() * 360;
            }

            draw() {
                ctx.save();
                ctx.globalAlpha = this.opacity * this.life;
                ctx.fillStyle = `hsl(${this.hue}, 70%, 60%)`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }
        }

        // Initialize particles
        const particleCount = Math.min(100, Math.floor((canvas.width * canvas.height) / 10000));
        particlesRef.current = Array.from({ length: particleCount }, () => new Particle());

        // Mouse tracking
        const handleMouseMove = (e) => {
            mouseRef.current.x = e.clientX;
            mouseRef.current.y = e.clientY;
        };

        window.addEventListener('mousemove', handleMouseMove);

        // Animation loop
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particlesRef.current.forEach(particle => {
                particle.update();
                particle.draw();
            });

            // Draw connections
            particlesRef.current.forEach((particle, i) => {
                particlesRef.current.slice(i + 1).forEach(otherParticle => {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.save();
                        ctx.globalAlpha = (100 - distance) / 100 * 0.1;
                        ctx.strokeStyle = `hsl(${(particle.hue + otherParticle.hue) / 2}, 70%, 60%)`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(otherParticle.x, otherParticle.y);
                        ctx.stroke();
                        ctx.restore();
                    }
                });
            });

            animationId = requestAnimationFrame(animate);
        };

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            window.removeEventListener('mousemove', handleMouseMove);
            if (animationId) {
                cancelAnimationFrame(animationId);
            }
        };
    }, [isEnabled]);

    if (!isEnabled) return null;

    return (
        <canvas
            ref={canvasRef}
            className={styles.particleCanvas}
            style={{ pointerEvents: 'none' }}
        />
    );
}
