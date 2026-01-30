import { memo } from 'react';

import Header from '@/components/Authscreen/Header';
import Scanner from '@/components/Authscreen/Scanner';
import ActionStatus from '@/components/Authscreen/ActionStatus';
import DetailPanel from '@/components/Authscreen/DetailPanel';
import Logs from '@/components/Authscreen/Logs';
import Button from '@/components/Authscreen/Button';


const MainContent = ({ statusText, isVerified, glyphText, actionLabel, logs, authState, setAuthState, setStatusText, setActionLabel, setGlyphText, addLog, wait, handleClose }) => {

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

                {/* Footer Buttons */}
                <Button
                    authState={authState}
                    setAuthState={setAuthState}
                    setStatusText={setStatusText}
                    setActionLabel={setActionLabel}
                    setGlyphText={setGlyphText}
                    addLog={addLog}
                    wait={wait}
                    handleClose={handleClose} />
            </div>
        </>
    )
}

export default memo(MainContent);
