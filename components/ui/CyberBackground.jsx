
const CyberBackground = ({ isVerified }) => {

    const color = isVerified ? '255, 215, 0' : '128, 222, 234';

    return (
        <div className="fixed inset-0 pointer-events-none">
            {/* Deep Gradient */}
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, rgba(${color}, 0.15), transparent 100%)`
                }}
            />

            {/* Static Scanline Overlay */}
            <div className="static-scanlines opacity-20" />

            {/* Moving Scanline */}
            <div
                className="scanline"
                style={{
                    backgroundImage: `linear-gradient(to bottom, transparent 0%, rgba(${color}, 0.05) 10%, rgba(${color}, 0.35) 50%, rgba(${color}, 0.05) 90%, transparent 100%)`
                }}
            />
        </div>
    );
};

export default CyberBackground;
