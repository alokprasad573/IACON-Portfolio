
import { runAuthSequence, redirectToHome } from '@/lib/scripts';

const Button = ({ authState, setAuthState, setStatusText, setActionLabel, setGlyphText, addLog, wait, contentRef,handleClose }) => {


    if (authState === 'VERIFIED') {
        return (
            <button
                onClick={() => {
                    handleClose();
                    setTimeout(() => {
                        redirectToHome(addLog);
                    }, 1000);
                }}
                className="w-full py-4 text-xs font-extrabold tracking-[0.4em] uppercase border border-yellow-400 bg-yellow-400/10 text-yellow-400 hover:bg-yellow-400/20 transition-colors"
                style={{ clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)' }}
            >
                See Detail
            </button>
        );
    }
    return (
        <button
            onClick={() => runAuthSequence(setAuthState, setStatusText, setActionLabel, setGlyphText, addLog, wait)}
            disabled={authState === 'SCANNING'}
            className={`w-full py-4 text-xs font-extrabold tracking-[0.4em] uppercase border border-current bg-current/5 transition-all duration-300 ${authState === 'SCANNING' ? 'opacity-50 cursor-wait' : 'opacity-100 hover:bg-current/10'}`}
            style={{ clipPath: 'polygon(20px 0, 100% 0, calc(100% - 20px) 100%, 0 100%)' }}
        >
            {authState === 'SCANNING' ? 'In Progress...' : 'Initiate Authorization'}
        </button>
    );
};


export default Button;