import { useRef, useState } from 'react';
import Image from 'next/image';
import { Menu, X } from 'lucide-react';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from './Button';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const navRef = useRef(null);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navLinks = [
        { name: 'Inbound', href: '#inbound' },
        { name: 'Arsenals', href: '#arsenals' },
        { name: 'Modules', href: '#modules' },
        { name: 'Clearences', href: '#clearences' },
        { name: 'Operation', href: '#operation' },
    ];

    useGSAP(() => {
        // Hide navbar by default
        gsap.set(navRef.current, { yPercent: -100, opacity: 0 });

        // Show navbar when scrolling down past a threshold
        ScrollTrigger.create({
            start: "top -100", // Start showing when we've scrolled down 100px
            onUpdate: (self) => {
                if (self.direction === 1) {
                    // Scrolling down - keep it hidden or show if passed threshold
                    if (self.scroll() > 500) {
                        gsap.to(navRef.current, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
                    }
                } else {
                    // Scrolling up - show it
                    if (self.scroll() > 100) {
                        gsap.to(navRef.current, { yPercent: 0, opacity: 1, duration: 0.4, ease: "power2.out" });
                    } else {
                        // Back at top - hide it
                        gsap.to(navRef.current, { yPercent: -100, opacity: 0, duration: 0.4, ease: "power2.in" });
                    }
                }
            }
        });
    }, { scope: navRef });

    return (
        <nav ref={navRef} className="fixed top-0 left-0 w-full bg-cyan-950/20 backdrop-blur-xl z-50 border-b border-cyan-400/10">
            <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex flex-row items-center justify-between">
                {/* Left side Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 flex items-center justify-center">
                        <Image src="/images/autobot_UV.png" alt="Logo" width={120} height={120} className="object-contain" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-lg font-black tracking-wider text-cyan-100 leading-tight">
                            B-127 | ALOK PRASAD
                        </span>
                        <p className="text-[9px] text-cyan-400 uppercase tracking-[0.4em] font-bold">IACON // Sector_7</p>
                    </div>
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-10">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-200/50 hover:text-cyan-400 transition-all hover:scale-105"
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Right side Actions */}
                <div className="flex items-center gap-4">
                    <div className="hidden md:block">
                        <Button variant="primary">
                            Comm_Link
                        </Button>
                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="md:hidden text-cyan-400 p-2 hover:bg-cyan-400/10 rounded-sm transition-colors border border-cyan-400/20"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation Drawer */}
            <div className={`fixed top-20 left-0 w-full bg-black/95 backdrop-blur-2xl border-b border-cyan-400/20 transition-all duration-300 overflow-hidden ${isMenuOpen ? 'max-h-screen' : 'max-h-0'}`}>
                <div className="flex flex-col p-8 gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-black uppercase tracking-[0.3em] text-cyan-200 hover:text-cyan-400 border-l-2 border-transparent hover:border-cyan-400 pl-4 transition-all"
                        >
                            {link.name}
                        </a>
                    ))}
                    <div className="pt-4 border-t border-cyan-400/10">
                        <Button variant="primary" className="w-full">
                            Comm_Link
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;