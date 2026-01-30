

import { useRef } from 'react';
import Image from 'next/image';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
        <nav ref={navRef} className="fixed top-0 left-0 w-full bg-black border-b border-yellow-500/10 backdrop-blur-xl z-10">
            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                {/* Left side Logo */}
                <div className="flex items-center gap-2">
                    <div className="w-15 h-15 flex items-center justify-center">
                        <Image src="/images/autobot_V.png" alt="Logo" width={150} height={150} />
                    </div>
                    <span className="text-lg font-black tracking-wider text-zinc-300">
                        B-127 | ALOK PRASAD
                        <p className="text-[10px] text-yellow-500 uppercase tracking-[0.5em]">IACON // Sector_7</p>
                    </span>
                </div>
                {/* CenternLinks */}
                <div className="hidden md:flex items-center gap-8">
                    {[
                        { name: 'Inbound', href: '#hero' },
                        { name: 'Arsenals', href: '#arsenals' },
                        { name: 'Modules', href: '#modules' },
                        { name: 'Operation', href: '#operation' },
                        { name: 'Clearences', href: '#clearences' },
                    ].map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[12px] font-bold uppercase tracking-[0.2em] text-zinc-400 hover:text-yellow-500 transition-colors"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right side Comm Links */}
                <div className="flex items-center">
                    <button className="px-6 py-2 bg-yellow-500/10 border border-yellow-500/30 text-yellow-500 text-[11px] font-black uppercase tracking-[0.2em] hover:bg-yellow-500 hover:text-black transition-all duration-300">
                        Comm_Link
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;