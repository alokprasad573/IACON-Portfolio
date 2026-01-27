'use client'

import { useState } from 'react';
import Link from 'next/link';
import { FontAwesomeIcon, FontAwesomeLayers } from '@fortawesome/react-fontawesome';
import { faHouse, faCircleInfo, faCode, faCertificate, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <>
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group fixed top-8 left-8 z-50 p-3 rounded bg-white/10 backdrop-blur-md border border-white/20 text-white transition-all hover:bg-[#FFD700] hover:text-black"
                >
                    <span className="text-xl">
                        <FontAwesomeIcon icon={faBars} />
                    </span>
                </button>
            )}

            {isOpen && (
                <nav className="fixed top-4 left-4 z-50 w-fit">
                    <div className="relative overflow-hidden rounded-2xl bg-white/10 px-6 py-3 shadow-lg backdrop-blur-md border border-white/5">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-8 text-xl font-bold text-white/80">
                                <button
                                    onClick={() => setIsOpen(!isOpen)}
                                >
                                    <span className="group-hover:hidden text-white">
                                        <FontAwesomeIcon icon={faXmark} /> Close
                                    </span>

                                </button>
                                <Link href="/" className="group flex items-center gap-2 transition-colors duration-300">
                                    <span className="group-hover:hidden text-white">
                                        <FontAwesomeIcon icon={faHouse} />
                                    </span>
                                    <span className="hidden group-hover:inline-block font-bold">
                                        <FontAwesomeIcon icon={faHouse} style={{ color: "#00ffff", }} /> &nbsp;Home
                                    </span>
                                </Link>
                                <Link href="/about" className="group flex items-center gap-2 transition-colors duration-300">
                                    <span className="group-hover:hidden text-white">
                                        <FontAwesomeIcon icon={faCircleInfo} />
                                    </span>
                                    <span className="hidden group-hover:inline-block font-bold">
                                        <FontAwesomeIcon icon={faCircleInfo} style={{ color: "#1e90ff", }} /> &nbsp;About
                                    </span>
                                </Link>
                                <Link href="/projects" className="group flex items-center gap-2 transition-colors duration-300">
                                    <span className="group-hover:hidden text-white">
                                        <FontAwesomeIcon icon={faCode} />
                                    </span>
                                    <span className="hidden group-hover:inline-block font-bold">
                                        <FontAwesomeIcon icon={faCode} style={{ color: "#2ecc71", }} /> &nbsp;Projects
                                    </span>
                                </Link>
                                <Link href="/certifications" className="group flex items-center gap-2 transition-colors duration-300">
                                    <span className="group-hover:hidden text-white">
                                        <FontAwesomeIcon icon={faCertificate} />
                                    </span>
                                    <span className="hidden group-hover:inline-block font-bold">
                                        <FontAwesomeIcon icon={faCertificate} style={{ color: "#dc143c", }} />&nbsp;Certifications
                                    </span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            )}
        </>
    );
};

export default Navbar;