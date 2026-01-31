'use client';

import IaconCmdCtr from '@/components/ui/IaconCmdCtr';
import MainContent from '@/components/Authscreen/MainContent';
import ConnectionStatus from '@/components/Authscreen/ConnectionStatus';
import CyberFrame from '@/components/screens/CyberFrame';
import { useSystem } from '@/context/SystemContext';

const Main = () => {
    const {
        screenRef,
        contentRef,
        progressBarRef,
        showFinalContent,
        accentColor,
        isVerified,
        connectionLabel,
        authState
    } = useSystem();

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black">
            {/* Background Layer - IaconCmdCtr */}
            <div className="absolute inset-0 z-0">
                <IaconCmdCtr />
            </div>

            {/* Foreground Layer - CyberFrame */}
            <div className="relative z-10 w-full max-w-4xl p-4">
                <CyberFrame
                    screenRef={screenRef}
                    accentColor={accentColor}
                    glowLevel={showFinalContent ? "50" : "20"}
                >
                    <div ref={contentRef} className="p-8 opacity-0 will-change-transform">
                        {!showFinalContent ? (
                            <ConnectionStatus
                                authState={authState}
                                progressBarRef={progressBarRef}
                                connectionStatus={connectionLabel}
                            />
                        ) : (
                            <div className="w-full h-full">
                                <MainContent />

                                {isVerified && (
                                    <div className="mt-6 border-t border-white/10 pt-4 animate-in fade-in slide-in-from-bottom-2 duration-700">
                                        <div className="flex gap-4 text-[10px] text-cyan-400/70">
                                            <span>ENERZONE: 98%</span>
                                            <span>T-COG: ONLINE</span>
                                            <span>SIGNAL: ENCRYPTED</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </CyberFrame>
            </div>
        </div>
    );
};

export default Main;