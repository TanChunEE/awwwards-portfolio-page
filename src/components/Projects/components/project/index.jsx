'use client';
import React from 'react'
import styles from './style.module.scss';

export default function index({index, title, manageModal}) {

    const handleInteraction = (isActive, e) => {
        // Check if device supports touch (mobile)
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        
        if (isTouchDevice) {
            // For mobile, use touch events
            if (e.type === 'touchstart') {
                manageModal(true, index, e.touches[0].clientX, e.touches[0].clientY);
            } else if (e.type === 'touchend') {
                manageModal(false, index, e.changedTouches[0].clientX, e.changedTouches[0].clientY);
            }
        } else {
            // For desktop, use mouse events
            manageModal(isActive, index, e.clientX, e.clientY);
        }
    };

    return (
        <div 
            onMouseEnter={(e) => handleInteraction(true, e)} 
            onMouseLeave={(e) => handleInteraction(false, e)}
            onTouchStart={(e) => handleInteraction(true, e)}
            onTouchEnd={(e) => handleInteraction(false, e)}
            className={styles.project}
        >
            <h2>{title}</h2>
            <p>Design & Development</p>
        </div>
    )
}
