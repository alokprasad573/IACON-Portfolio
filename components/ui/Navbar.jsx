import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef(null);

    useGSAP(() => {
        gsap.set(navRef.current, { yPercent: -100 });

        ScrollTrigger.create({
            start: "top top",
            end: 99999,
            onUpdate: (self) => {
                // Show navbar when scrolled down > 100px
                const shouldShow = self.scroll() > 100;
                gsap.to(navRef.current, {
                    yPercent: shouldShow ? 0 : -100,
                    duration: 0.3,
                    ease: "power2.out"
                });
            }
        });
    }, { scope: navRef });

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full bg-[#0a1e2f]/90 border-b border-cyan-400/20 backdrop-blur-xl z-50">
            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                {/* Left side Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-15 h-15 flex items-center justify-center">
                        <Image src="/images/autobot_V.png" alt="Logo" width={150} height={150} className="brightness-150 contrast-125 saturate-0 sepia hue-rotate-180 text-cyan-400" />
                    </div>
                    <span className="text-lg font-black tracking-wider text-cyan-100">
                        B-127 | ALOK PRASAD
                        <p className="text-[10px] text-cyan-400 uppercase tracking-[0.5em]">IACON // Sector_7</p>
                    </span>
                </div>
                {/* CenternLinks */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: 'Inbound', href: '#inbound' },
                        { name: 'Arsenals', href: '#arsenals' },
                        { name: 'Modules', href: '#modules' },
                        { name: 'Operation', href: '#operation' },
                        { name: 'Clearences', href: '#clearences' },
                    ].map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[12px] font-bold uppercase tracking-[0.2em] text-cyan-200/60 hover:text-cyan-400 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right side Comm Links */}
                <div className="flex items-center">
                    <Button variant="primary">
                        Comm_Link
                    </Button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;