

import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-100 border-b border-yellow-500/10 bg-black/40 backdrop-blur-xl">
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
                        { name: 'Clearences', href: '#clearences' },
                        { name: 'Operation', href: '#operation' },
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