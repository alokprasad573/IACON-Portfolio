'use client';

import { useState, useEffect, useRef } from 'react';

export const useGsap = () => {
    const [gsapLoaded, setGsapLoaded] = useState(false);
    const gsapRef = useRef(null);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Check if GSAP is already loaded
        if (window.gsap) {
            gsapRef.current = window.gsap;
            setGsapLoaded(true);
            return;
        }

        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js";
        script.async = true;
        script.onload = () => {
            gsapRef.current = window.gsap;
            setGsapLoaded(true);
        };
        document.head.appendChild(script);

        return () => {
            // Optional: Cleanup script if needed, but GSAP is usually fine to stay
        };
    }, []);

    return { gsapLoaded, gsap: gsapRef.current, gsapRef };
};
