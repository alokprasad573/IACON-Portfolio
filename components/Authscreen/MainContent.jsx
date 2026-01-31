import { memo } from 'react';
import { useSystem } from '@/context/SystemContext';
import { runAuthSequence, redirectToHome } from '@/lib/scripts';

import Header from '@/components/Authscreen/Header';
import Scanner from '@/components/Authscreen/Scanner';
import ActionStatus from '@/components/Authscreen/ActionStatus';
import DetailPanel from '@/components/Authscreen/DetailPanel';
import Logs from '@/components/Authscreen/Logs';
import Button from '@/components/ui/Button';


const MainContent = () => {
    const {
        statusText, isVerified, glyphText, actionLabel, logs,
        authState, setAuthState, setStatusText, setActionLabel, setGlyphText,
        addLog, wait, handleClose
    } = useSystem();

    return (
        <>
            {/* Main Content */}
            <div className="flex flex-col gap-4">
                {/* Header Section */}
                <Header statusText={statusText} />

                {/* Scanner Core */}
                <Scanner isVerified={isVerified} glyphText={glyphText} />

                {/* Action Status */}
                <ActionStatus actionLabel={actionLabel} />

                {/* Details Panel */}
                <DetailPanel isVerified={isVerified} />

                {/* Logs */}
                <Logs logs={logs} />

                {/* Footer Buttons - Inlined Logic */}
                {authState === 'VERIFIED' ? (
                    <Button
                        variant="neon"
                        fullWidth
                        onClick={() => {
                            handleClose();
                            setTimeout(() => {
                                redirectToHome(addLog);
                            }, 1000);
                        }}
                        className="text-cyan-400 border-cyan-400/50"
                    >
                        See Detail
                    </Button>
                ) : (
                    <Button
                        variant="neon"
                        fullWidth
                        onClick={() => runAuthSequence(setAuthState, setStatusText, setActionLabel, setGlyphText, addLog, wait)}
                        disabled={authState === 'SCANNING'}
                        className={authState === 'SCANNING' ? 'cursor-wait' : ''}
                    >
                        {authState === 'SCANNING' ? 'In Progress...' : 'Initiate Protocol'}
                    </Button>
                )}
            </div>
        </>
    )
}

export default memo(MainContent);
