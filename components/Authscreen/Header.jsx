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
                <div className="text-sm text-left tracking-[0.2em] opacity-80 border border-current px-2 py-0.5 inline-flex items-center gap-2">
                   BASE : ALPHA-7 <br />STATUS : ACTIVE
                </div>
            </div>
        </div>
    );
};

export default Header;