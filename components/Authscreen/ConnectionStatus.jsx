

const ConnectionStatus = ({ authState, progressBarRef, connectionStatus }) => {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-widest opacity-60">IACON MAINFRAME UPLINK: AUTOBOT SECURE CHANNEL
</span>
            <div className={`relative w-full p-4 text-xs font-extrabold tracking-[0.2em] uppercase border border-current bg-current/5 transition-opacity duration-300 overflow-hidden ${authState === 'SCANNING' ? 'opacity-0' : 'opacity-100'}`}>
                {/* Progress Bar Background Overlay */}
                <div
                    ref={progressBarRef}
                    className="absolute top-0 left-0 h-full bg-current opacity-10"
                    style={{ width: '0%' }}
                />
                <span className="relative z-10">
                    {connectionStatus}
                </span>
            </div>
        </div>
    )
}

export default ConnectionStatus;