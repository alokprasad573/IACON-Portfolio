import { useState } from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

/**
 * Reusable Cyberpunk Button Component
 * Matches the Cyan/Light-Glass aesthetic of IaconCmdCtr.
 * Supports both 'button' and 'link' modes via 'href' prop.
 */
const Button = ({
    children,
    href,
    onClick,
    className = "",
    variant = "primary",
    icon: Icon,
    disabled = false,
    fullWidth = false
}) => {
    const [isHovered, setIsHovered] = useState(false);

    // Styles
    const baseStyles = `relative inline-flex items-center justify-center gap-2 uppercase transition-all duration-300 border backdrop-blur-sm overflow-hidden group ${fullWidth ? 'w-full' : ''} ${disabled ? 'opacity-50 cursor-not-allowed' : 'opacity-100'}`;

    const variants = {
        primary: `px-6 py-2 tracking-[0.2em] font-bold text-[11px] text-cyan-400 border-cyan-400/30 hover:bg-cyan-400 hover:text-black hover:shadow-[0_0_20px_#22d3ee]`,
        secondary: `px-6 py-2 tracking-[0.2em] font-bold text-[11px] text-white border-white/20 hover:border-cyan-400/50 hover:text-cyan-400 bg-cyan-900/10`,
        neon: `py-4 text-xs font-extrabold tracking-[0.4em] border-current bg-current/5 hover:bg-current/10`
    };

    const currentVariant = variants[variant] || variants.primary;

    const content = (
        <>
            <span className="relative z-10 flex items-center gap-2">
                {children}
                {Icon && <Icon size={14} className="group-hover:translate-x-1 transition-transform" />}
            </span>

            {/* Hover Glitch Effect Overlay */}
            <div className={`absolute inset-0 bg-cyan-400/20 translate-y-full transition-transform duration-300 group-hover:translate-y-0 ${variant === 'primary' || variant === 'neon' ? 'hidden' : 'block'}`} />
        </>
    );

    if (href) {
        if (href.startsWith('http') || href.startsWith('#')) {
            return (
                <a
                    href={href}
                    className={`${baseStyles} ${currentVariant} ${className}`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    target={href.startsWith('http') ? "_blank" : "_self"}
                    rel={href.startsWith('http') ? "noopener noreferrer" : ""}
                >
                    {content}
                </a>
            );
        }
        return (
            <Link
                href={href}
                className={`${baseStyles} ${currentVariant} ${className}`}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {content}
            </Link>
        );
    }

    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`${baseStyles} ${currentVariant} ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {content}
        </button>
    );
};

export default Button;
