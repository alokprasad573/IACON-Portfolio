

import Image from 'next/image';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-100 border-b border-yellow-500/10 bg-black/40 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-8 h-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <div className="w-15 h-15 flex items-center justify-center">
                        <Image src="/images/autobot_V.png" alt="Logo" width={150} height={150} />
                    </div>
                    <span className="text-lg font-black tracking-wider text-zinc-300">
                        B-127 | ALOK PRASAD
                        <p className="text-[10px] text-yellow-500 uppercase tracking-[0.5em]">IACON // Sector_7</p>
                    </span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;