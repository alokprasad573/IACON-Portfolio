import { useState } from "react";

const Screen = ({ children, accentColor = "#FFD700", glowLevel = 30, className = "" }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Helper to handle both hex and other color formats for the glow
  const getGlowStyle = (intensity) => {
    // If it's a hex color, we can try to add opacity, otherwise we use it as is
    const color = accentColor.startsWith('#') ? accentColor : '#FFD700';
    return `0 0 ${intensity}px ${color}`;
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative w-full bg-[#030712]/90 border backdrop-blur-xl transition-all duration-500 accelerated flex flex-col ${className} z-50 ${isHovered ? '-translate-y-2' : ''}`}
      style={{
        clipPath: 'polygon(0% 20px, 20px 0%, calc(100% - 20px) 0%, 100% 20px, 100% calc(100% - 20px), calc(100% - 20px) 100%, 20px 100%, 0% calc(100% - 20px))',
        boxShadow: isHovered
          ? `${getGlowStyle(glowLevel * 5)}, ${getGlowStyle(glowLevel * 2)}, inset 0 0 30px ${accentColor}44`
          : `${getGlowStyle(glowLevel * 0.5)}, inset 0 0 10px ${accentColor}11`,
        borderColor: isHovered ? accentColor : `${accentColor}88`,
        color: accentColor,
      }}
    >
      {/* Cyber-Frame Accents - Top Runner with Pips */}
      <div
        className="absolute top-0 left-[10%] right-[10%] h-[2px] transition-all duration-500"
        style={{
          backgroundColor: accentColor,
          boxShadow: isHovered ? `0 0 15px ${accentColor}` : `0 0 5px ${accentColor}`
        }}
      >
        <div className="absolute left-0 top-0 h-2 w-px bg-current" />
        <div className="absolute right-0 top-0 h-2 w-px bg-current" />
      </div>

      {/* Cyber-Frame Accents - Bottom Runner with Pips */}
      <div
        className="absolute bottom-0 left-[10%] right-[10%] h-[2px] transition-all duration-500"
        style={{
          backgroundColor: accentColor,
          boxShadow: isHovered ? `0 0 15px ${accentColor}` : `0 0 5px ${accentColor}`
        }}
      >
        <div className="absolute left-0 bottom-0 h-2 w-px bg-current" />
        <div className="absolute right-0 bottom-0 h-2 w-px bg-current" />
      </div>

      {/* Side Brackets */}
      <div className={`absolute top-1/2 -translate-y-1/2 left-0 w-[2px] transition-all duration-500 ${isHovered ? 'h-16 opacity-100' : 'h-8 opacity-40'}`} style={{ backgroundColor: accentColor }} />
      <div className={`absolute top-1/2 -translate-y-1/2 right-0 w-[2px] transition-all duration-500 ${isHovered ? 'h-16 opacity-100' : 'h-8 opacity-40'}`} style={{ backgroundColor: accentColor }} />

      <div className="relative p-6 md:p-8 w-full h-full flex flex-col">
        {children}
      </div>

      {/* Scanline pattern overlay (visual only) */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />
    </div>
  );
};

export default Screen;