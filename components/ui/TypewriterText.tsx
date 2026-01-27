'use client';
import React, { useState, useEffect } from 'react';

const words = ["Constant Transformation", "Future Forged", "Fuel Learning", "Optimized by Energon"];

const TypewriterText = () => {
    const [currentWordIndex, setCurrentWordIndex] = useState(0);
    const [displayText, setDisplayText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);

    // Typing speed configuration
    const typeSpeed = 150;
    const deleteSpeed = 75;
    const pauseTime = 2000;

    useEffect(() => {
        const handleType = () => {
            const currentFullWord = words[currentWordIndex];

            if (isDeleting) {
                // Deleting text
                setDisplayText(prev => prev.substring(0, prev.length - 1));
            } else {
                // Typing text
                setDisplayText(prev => currentFullWord.substring(0, prev.length + 1));
            }

            // Determine next state
            if (!isDeleting && displayText === currentFullWord) {
                // Completed typing word, pause before deleting
                setTimeout(() => setIsDeleting(true), pauseTime);
            } else if (isDeleting && displayText === '') {
                // Completed deleting, switch to next word
                setIsDeleting(false);
                setCurrentWordIndex((prev) => (prev + 1) % words.length);
            }
        };

        const timer = setTimeout(handleType, isDeleting ? deleteSpeed : typeSpeed);
        return () => clearTimeout(timer);
    }, [displayText, isDeleting, currentWordIndex]);

    return (
        <span className="bg-[#FFD700] w-[fit-content] text-black px-4 py-1 mr-4 rounded-md font-bold">
            {displayText}
            <span className="animate-pulse"></span>
        </span>
    );
};

export default TypewriterText;
