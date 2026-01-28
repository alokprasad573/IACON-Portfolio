
const Scanner = ({isVerified, authState, glyphText}) => {

    if(isVerified) return null;

    return (
        <div className="relative w-64 h-64 mx-auto mb-8 flex items-center justify-center overflow-hidden">
            <div
                className={`absolute inset-0 border transition-colors duration-1000 'border-cyan-200/20'`}
                style={{ clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' }}
            />

            <div className="absolute inset-2 border border-dotted border-current rounded-full opacity-20 animate-[spin_25s_linear_infinite]" />
            <div className="absolute inset-8 border-2 border-double border-current rounded-full opacity-20 animate-[spin_15s_linear_reverse_infinite]" />
            <div className="absolute inset-16 border border-current rounded-full opacity-10" />

    
                <div className="absolute w-[120%] h-1 bg-gradient-to-r from-transparent via-current to-transparent shadow-[0_0_20px_currentColor] opacity-80 z-10 animate-[scan_2.5s_ease-in-out_infinite]" />

            <div className="text-3xl font-black tracking-[0.2em] drop-shadow-[0_0_10px_currentColor] opacity-90 text-center">
                {glyphText}
            </div>
        </div>
    );
};


export default Scanner;