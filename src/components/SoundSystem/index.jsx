'use client';
import { useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';

export default function SoundSystem() {
    const audioContextRef = useRef(null);
    const backgroundMusicRef = useRef(null);
    const [isEnabled, setIsEnabled] = useState(true);
    const [volume, setVolume] = useState(0.3);
    const [backgroundMusicEnabled, setBackgroundMusicEnabled] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        // Initialize Web Audio API
        if (typeof window !== 'undefined' && window.AudioContext) {
            audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        }

        // Create soft background music using Web Audio API
        const createBackgroundMusic = () => {
            if (!audioContextRef.current || !backgroundMusicEnabled) return null;

            const oscillator1 = audioContextRef.current.createOscillator();
            const oscillator2 = audioContextRef.current.createOscillator();
            const gainNode = audioContextRef.current.createGain();
            const filterNode = audioContextRef.current.createBiquadFilter();

            // Soft ambient pad sound
            oscillator1.type = 'sine';
            oscillator1.frequency.setValueAtTime(220, audioContextRef.current.currentTime); // A3
            oscillator2.type = 'sine';
            oscillator2.frequency.setValueAtTime(330, audioContextRef.current.currentTime); // E4

            // Soft filter for ambient sound
            filterNode.type = 'lowpass';
            filterNode.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
            filterNode.Q.setValueAtTime(1, audioContextRef.current.currentTime);

            // Very low volume for background
            gainNode.gain.setValueAtTime(volume * 0.1, audioContextRef.current.currentTime);

            oscillator1.connect(filterNode);
            oscillator2.connect(filterNode);
            filterNode.connect(gainNode);
            gainNode.connect(audioContextRef.current.destination);

            oscillator1.start();
            oscillator2.start();

            return { oscillator1, oscillator2, gainNode, filterNode };
        };

        // Enhanced sound effects
        const sounds = {
            hover: () => {
                if (!audioContextRef.current || !isEnabled) return;
                const oscillator = audioContextRef.current.createOscillator();
                const gainNode = audioContextRef.current.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContextRef.current.destination);
                
                oscillator.frequency.setValueAtTime(800, audioContextRef.current.currentTime);
                oscillator.type = 'sine';
                
                gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
                gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContextRef.current.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.15);
                
                oscillator.start(audioContextRef.current.currentTime);
                oscillator.stop(audioContextRef.current.currentTime + 0.15);
            },
            
            click: () => {
                if (!audioContextRef.current || !isEnabled) return;
                const oscillator = audioContextRef.current.createOscillator();
                const gainNode = audioContextRef.current.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContextRef.current.destination);
                
                oscillator.frequency.setValueAtTime(600, audioContextRef.current.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(400, audioContextRef.current.currentTime + 0.1);
                oscillator.type = 'square';
                
                gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
                gainNode.gain.linearRampToValueAtTime(volume * 0.4, audioContextRef.current.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.2);
                
                oscillator.start(audioContextRef.current.currentTime);
                oscillator.stop(audioContextRef.current.currentTime + 0.2);
            },
            
            success: () => {
                if (!audioContextRef.current || !isEnabled) return;
                // Pleasant chord progression
                const frequencies = [523, 659, 784]; // C5, E5, G5
                frequencies.forEach((freq, index) => {
                    const oscillator = audioContextRef.current.createOscillator();
                    const gainNode = audioContextRef.current.createGain();
                    
                    oscillator.connect(gainNode);
                    gainNode.connect(audioContextRef.current.destination);
                    
                    oscillator.frequency.setValueAtTime(freq, audioContextRef.current.currentTime);
                    oscillator.type = 'sine';
                    
                    gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
                    gainNode.gain.linearRampToValueAtTime(volume * 0.2, audioContextRef.current.currentTime + 0.01);
                    gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.3);
                    
                    oscillator.start(audioContextRef.current.currentTime + index * 0.1);
                    oscillator.stop(audioContextRef.current.currentTime + 0.3 + index * 0.1);
                });
            },
            
            notification: () => {
                if (!audioContextRef.current || !isEnabled) return;
                const oscillator = audioContextRef.current.createOscillator();
                const gainNode = audioContextRef.current.createGain();
                
                oscillator.connect(gainNode);
                gainNode.connect(audioContextRef.current.destination);
                
                oscillator.frequency.setValueAtTime(1000, audioContextRef.current.currentTime);
                oscillator.type = 'triangle';
                
                gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
                gainNode.gain.linearRampToValueAtTime(volume * 0.3, audioContextRef.current.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.25);
                
                oscillator.start(audioContextRef.current.currentTime);
                oscillator.stop(audioContextRef.current.currentTime + 0.25);
            },

            pageTransition: () => {
                if (!audioContextRef.current || !isEnabled) return;
                // Soft whoosh sound for page transitions
                const oscillator = audioContextRef.current.createOscillator();
                const gainNode = audioContextRef.current.createGain();
                const filterNode = audioContextRef.current.createBiquadFilter();
                
                oscillator.connect(filterNode);
                filterNode.connect(gainNode);
                gainNode.connect(audioContextRef.current.destination);
                
                oscillator.frequency.setValueAtTime(200, audioContextRef.current.currentTime);
                oscillator.frequency.exponentialRampToValueAtTime(50, audioContextRef.current.currentTime + 0.5);
                oscillator.type = 'sawtooth';
                
                filterNode.type = 'lowpass';
                filterNode.frequency.setValueAtTime(1000, audioContextRef.current.currentTime);
                filterNode.frequency.exponentialRampToValueAtTime(200, audioContextRef.current.currentTime + 0.5);
                
                gainNode.gain.setValueAtTime(0, audioContextRef.current.currentTime);
                gainNode.gain.linearRampToValueAtTime(volume * 0.2, audioContextRef.current.currentTime + 0.01);
                gainNode.gain.exponentialRampToValueAtTime(0.001, audioContextRef.current.currentTime + 0.5);
                
                oscillator.start(audioContextRef.current.currentTime);
                oscillator.stop(audioContextRef.current.currentTime + 0.5);
            }
        };

        // Background music control
        const startBackgroundMusic = () => {
            if (backgroundMusicEnabled && !isPlaying) {
                backgroundMusicRef.current = createBackgroundMusic();
                setIsPlaying(true);
            }
        };

        const stopBackgroundMusic = () => {
            if (backgroundMusicRef.current) {
                backgroundMusicRef.current.oscillator1.stop();
                backgroundMusicRef.current.oscillator2.stop();
                backgroundMusicRef.current = null;
                setIsPlaying(false);
            }
        };

        // Add sound effects to interactive elements
        const addSoundToElement = (selector, soundType) => {
            const elements = document.querySelectorAll(selector);
            elements.forEach(element => {
                element.addEventListener('mouseenter', sounds[soundType]);
                element.addEventListener('click', sounds.click);
            });
        };

        // Apply sounds to common interactive elements
        addSoundToElement('button', 'hover');
        addSoundToElement('.btn', 'hover');
        addSoundToElement('.project', 'hover');
        addSoundToElement('a', 'hover');
        addSoundToElement('.roundedButton', 'hover');
        addSoundToElement('.skillPill', 'hover');

        // Page transition sound
        const handlePageTransition = () => {
            sounds.pageTransition();
        };

        window.addEventListener('beforeunload', handlePageTransition);

        // Background music control
        if (backgroundMusicEnabled) {
            startBackgroundMusic();
        } else {
            stopBackgroundMusic();
        }

        // Cleanup
        return () => {
            window.removeEventListener('beforeunload', handlePageTransition);
            stopBackgroundMusic();
            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [isEnabled, volume, backgroundMusicEnabled]);

    return (
        <div className={styles.soundControls}>
            <button
                onClick={() => setIsEnabled(!isEnabled)}
                className={`${styles.soundToggle} ${isEnabled ? styles.enabled : styles.disabled}`}
                title={isEnabled ? 'Disable sounds' : 'Enable sounds'}
            >
                {isEnabled ? '🔊' : '🔇'}
            </button>
            
            <button
                onClick={() => setBackgroundMusicEnabled(!backgroundMusicEnabled)}
                className={`${styles.musicToggle} ${backgroundMusicEnabled ? styles.enabled : styles.disabled}`}
                title={backgroundMusicEnabled ? 'Stop background music' : 'Start background music'}
            >
                {backgroundMusicEnabled ? '🎵' : '🎶'}
            </button>
            
            {isEnabled && (
                <div className={styles.volumeControl}>
                    <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.1"
                        value={volume}
                        onChange={(e) => setVolume(parseFloat(e.target.value))}
                        className={styles.volumeSlider}
                        title={`Volume: ${Math.round(volume * 100)}%`}
                    />
                </div>
            )}
        </div>
    );
}
