'use client'

import Link from "next/link";
import { useGSAP } from "@gsap/react";
import gsap from 'gsap';

interface ButtonProps {
    className: string;
    id: string;
    text: string;
}

const Button = ({ className, id, text }: ButtonProps) => {

      useGSAP(() => {
        gsap.fromTo('.cta-button', {
            opacity: 0,
            y: 50,
        }, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'power2.inOut',
        })
    })

    return (
        <a onClick={(e) => {e.preventDefault();

            const target = document.getElementById('counter');
            if (target && id) {
                const offset = window.innerHeight * 0.15;
                const top = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
         }}
         className={`${className ?? ''} cta-wrapper`} id={id}>
            <div className="cta-button group">
                <div className="bg-circle" />
                <p className="text">{text}</p>
                <div className="arrow-wrapper">
                    <img src="/images/arrow-right.svg" alt="arrow-right" />
                </div>
            </div>
        </a>
    );
};

export default Button;