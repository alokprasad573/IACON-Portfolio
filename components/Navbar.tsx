'use client'

import Link from 'next/link'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo, faCode, faCertificate } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    return (
        <nav className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-fit">
            <div className="relative overflow-hidden rounded-2xl bg-white/10 px-6 py-3 shadow-lg backdrop-blur-md border border-white/5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8 text-xl font-bold text-white/80">
                        <Link href="/" className="group flex items-center gap-2 transition-colors duration-300">
                            <span className="group-hover:hidden text-white">
                                <FontAwesomeIcon icon={faHouse} />
                            </span>
                            <span className="hidden group-hover:inline-block text-[#FFD700] font-bold">
                                Home
                            </span>
                        </Link>
                        <Link href="/about" className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#FFD700]">
                            <span className="group-hover:hidden text-white">
                                <FontAwesomeIcon icon={faCircleInfo} />
                            </span>
                            <span className="hidden group-hover:inline-block text-[#FFD700] font-bold">
                                About
                            </span>
                        </Link>
                        <Link href="/projects" className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#FFD700]">
                            <span className="group-hover:hidden text-white">
                                <FontAwesomeIcon icon={faCode} />
                            </span>
                            <span className="hidden group-hover:inline-block text-[#FFD700] font-bold">
                                Projects
                            </span>
                        </Link>
                        <Link href="/certifications" className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#FFD700]">
                            <span className="group-hover:hidden text-white">
                                <FontAwesomeIcon icon={faCertificate} />
                            </span>
                            <span className="hidden group-hover:inline-block text-[#FFD700] font-bold">
                                Certifications
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;