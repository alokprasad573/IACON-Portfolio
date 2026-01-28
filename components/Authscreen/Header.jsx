import { Network } from "lucide-react";


const Header = ({ statusText }) => {
    return (
        <div className="flex justify-between items-end mb-8 border-b border-white/5 pb-4">
            <div>
                <h1 className="text-xs font-black tracking-[0.4em] uppercase opacity-60 mb-1 flex items-center gap-2">
                    Iacon Mainframe
                </h1>
                <p className="text-xs font-bold tracking-[0.4em] italic">
                    {statusText}
                </p>
            </div>
            <div className="text-right">
                <div className="text-sm tracking-[0.3em] opacity-80 border border-current px-2 py-0.5 inline-flex items-center gap-2">
                    <Network size={10} />BASE : ALPHA-7
                </div>
            </div>
        </div>
    );
};

export default Header;