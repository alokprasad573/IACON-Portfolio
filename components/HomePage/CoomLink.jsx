import React, { useState, useEffect, useRef } from 'react';
import { Ellipsis, X, ChevronRight, SatelliteDish } from 'lucide-react';
import CyberFrame from '../screens/CyberFrame';
import Button from '../ui/Button';

const CommLink = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({ email: '', context: '', message: '' });
    const [status, setStatus] = useState('idle');
    const [logs, setLogs] = useState([]);
    const [signalIntensity, setSignalIntensity] = useState(45);
    const [errors, setErrors] = useState({});
    const logEndRef = useRef(null);

    const connectionSteps = [
        "Initializing connection...",
        "Connecting Mainframe...",
        "Establishing Secured Channel...",
        "Initializing Encryption Protocols..."
    ];

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    useEffect(() => {
        const interval = setInterval(() => {
            setSignalIntensity(Math.floor(Math.random() * 120) + 10);
        }, 2500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (step < connectionSteps.length) {
            const timer = setTimeout(() => {
                const timestamp = new Date().toLocaleTimeString([], { hour12: false });
                setLogs(prev => [...prev, { text: connectionSteps[step], type: 'info', timestamp }]);
                setStep(s => s + 1);
            }, 2000);
            return () => clearTimeout(timer);
        } else if (step === connectionSteps.length && status === 'idle') {
            setStatus('form');
        }
    }, [step, status]);

    const handleSend = (e) => {
        e.preventDefault();

        const newErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!formData.email) {
            newErrors.email = true;
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = true;
        }

        if (!formData.context) newErrors.context = true;
        if (!formData.message) newErrors.message = true;

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            const timestamp = new Date().toLocaleTimeString([], { hour12: false });
            const errorLogs = [];

            if (!formData.email) {
                errorLogs.push({ text: ">> CRITICAL ERROR: ENTER SOURCE COORDINATES", type: 'error', timestamp });
            } else if (!emailRegex.test(formData.email)) {
                errorLogs.push({ text: ">> MALFORMED DATA: INVALID SOURCE COORDINATE FORMAT", type: 'error', timestamp });
            }

            if (newErrors.context) errorLogs.push({ text: ">> CRITICAL ERROR: ENTER DECRYPTED CONTEXT", type: 'error', timestamp });
            if (newErrors.message) errorLogs.push({ text: ">> CRITICAL ERROR: ENTER TRANSMISSION PAYLOAD", type: 'error', timestamp });
            setLogs(prev => [...prev, ...errorLogs]);
            return;
        }

        setErrors({});
        setStatus('encrypting');
        const timestamp1 = new Date().toLocaleTimeString([], { hour12: false });
        setLogs(prev => [...prev, { text: ">> INITIATING DATA PACKET FRAGMENTATION...", type: 'warning', timestamp: timestamp1 }]);

        setTimeout(() => {
            const timestamp2 = new Date().toLocaleTimeString([], { hour12: false });
            setLogs(prev => [...prev, { text: ">> ENCRYPTING MESSAGE (RSA-4096)...", type: 'info', timestamp: timestamp2 }]);
            setTimeout(() => {
                const timestamp3 = new Date().toLocaleTimeString([], { hour12: false });
                setLogs(prev => [...prev, { text: `>> CONTEXT SENT TO ${formData.email.toUpperCase()}`, type: 'success', timestamp: timestamp3 }]);
                setStatus('sent');
            }, 2000);
        }, 1500);
    };

    const resetTerm = () => {
        setStep(0);
        setLogs([]);
        setStatus('idle');
        setFormData({ email: '', context: '', message: '' });
        setErrors({});
    };

    return (
        <div
            id="comm-link"
            className="min-h-screen flex items-center justify-center p-6 font-mono">
            <CyberFrame className="max-w-3xl h-[80vh] bg-cyan-950/20 hover:bg-cyan-950/30 transition-colors border-cyan-400/50">
                <div className="flex flex-col h-full bg-black/40">
                    {/* Header Bar */}
                    <div className="bg-cyan-500/10 border-b border-cyan-500/20 p-4 flex items-center justify-between">
                        <div className="flex flex-col items-start justify-baseline gap-3 ml-5">
                            <div className="flex items-center gap-2">
                                <SatelliteDish className="w-4 h-4 text-cyan-400 animate-pulse " />
                                <h1 className="text-cyan-400 text-xs font-bold tracking-widest uppercase">
                                    Comm_Link
                                </h1>
                            </div>
                            <div className="flex items-center gap-2 text-xs">
                                <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${signalIntensity <= 30 ? 'bg-red-500' :
                                    signalIntensity <= 75 ? 'bg-yellow-500' : 'bg-green-500'
                                    }`} />
                                Uplink_Strength : {signalIntensity}ms
                            </div>
                        </div>
                        {(status === 'idle' || status === 'form') && (
                            <Button
                                onClick={onClose}
                                variant="primary"
                                className="px-6! mr-5"
                            >
                                Close
                            </Button>
                        )}
                    </div>

                    {/* Terminal Content */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-4 custom-scrollbar relative">
                        <div className="space-y-2">
                            {logs.map((log, i) => (
                                <div key={i} className={`text-sm flex gap-3 ${log.type === 'success' ? 'text-green-400' :
                                    log.type === 'warning' ? 'text-yellow-400' :
                                        log.type === 'error' ? 'text-red-500' : 'text-cyan-400/80'
                                    }`}>
                                    <span className="opacity-30">[{log.timestamp}]</span>
                                    <span className="font-bold tracking-widest leading-relaxed">{log.text}</span>
                                </div>
                            ))}

                            {step < connectionSteps.length && (
                                <div className="flex items-center gap-2 text-cyan-400 animate-pulse text-sm font-bold">
                                    <ChevronRight className="w-4 h-4" />
                                    <span className="tracking-widest">PROCESSING_DATA_LINK...</span>
                                </div>
                            )}
                        </div>

                        {(status === 'form' || status === 'encrypting' || status === 'sent') && (
                            <div className={`mt-8 border-t border-cyan-400/10 pt-8 transition-all duration-700 ${status === 'encrypting' ? 'opacity-30 grayscale pointer-events-none' : 'opacity-100'}`}>
                                <form onSubmit={handleSend} noValidate className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className={`text-[10px] uppercase tracking-[0.3em] font-black block border-l-2 pl-2 transition-colors ${errors.email ? 'text-red-500 border-red-500' : 'text-cyan-500 border-cyan-500'}`}>
                                                Source Coordinates
                                            </label>
                                            <input
                                                type="email"
                                                disabled={status === 'sent'}
                                                className={`w-full bg-cyan-950/20 border p-3 text-cyan-100 focus:outline-none transition-all placeholder:text-cyan-900/50 ${errors.email ? 'border-red-500/50 focus:border-red-500' : 'border-cyan-500/20 focus:border-cyan-400/60'
                                                    }`}
                                                placeholder="user@mainframe.sys"
                                                value={formData.email}
                                                onChange={e => {
                                                    setFormData({ ...formData, email: e.target.value });
                                                    if (e.target.value) setErrors(prev => ({ ...prev, email: false }));
                                                }}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className={`text-[10px] uppercase tracking-[0.3em] font-black block border-l-2 pl-2 transition-colors ${errors.context ? 'text-red-500 border-red-500' : 'text-cyan-500 border-cyan-500'}`}>
                                                Decrypted Context
                                            </label>
                                            <input
                                                type="text"
                                                disabled={status === 'sent'}
                                                className={`w-full bg-cyan-950/20 border p-3 text-cyan-100 focus:outline-none transition-all placeholder:text-cyan-900/50 ${errors.context ? 'border-red-500/50 focus:border-red-500' : 'border-cyan-500/20 focus:border-cyan-400/60'
                                                    }`}
                                                placeholder="Priority Alpha..."
                                                value={formData.context}
                                                onChange={e => {
                                                    setFormData({ ...formData, context: e.target.value });
                                                    if (e.target.value) setErrors(prev => ({ ...prev, context: false }));
                                                }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className={`text-[10px] uppercase tracking-[0.3em] font-black block border-l-2 pl-2 transition-colors ${errors.message ? 'text-red-500 border-red-500' : 'text-cyan-500 border-cyan-500'}`}>
                                            Transmission Payload
                                        </label>
                                        <textarea
                                            rows="4"
                                            disabled={status === 'sent'}
                                            className={`w-full bg-cyan-950/20 border p-3 text-cyan-100 focus:outline-none transition-all placeholder:text-cyan-900/50 resize-none ${errors.message ? 'border-red-500/50 focus:border-red-500' : 'border-cyan-500/20 focus:border-cyan-400/60'
                                                }`}
                                            placeholder="Input transmission stream..."
                                            value={formData.message}
                                            onChange={e => {
                                                setFormData({ ...formData, message: e.target.value });
                                                if (e.target.value) setErrors(prev => ({ ...prev, message: false }));
                                            }}
                                        />
                                    </div>

                                    <div className="flex justify-end gap-4">
                                        {status === 'sent' ? (
                                            <button
                                                type="button"
                                                onClick={() => { resetTerm(); onClose(); }}
                                                className="flex items-center gap-2 px-8 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all uppercase tracking-[0.2em] text-xs"
                                            >
                                                Close UpLink
                                            </button>
                                        ) : (status === 'form' || status === 'encrypting') ? (
                                            status === 'encrypting' ? (
                                                <button
                                                    type="button"
                                                    onClick={resetTerm}
                                                    className="flex items-center gap-2 px-8 py-3 border bg-cyan-500/10 border-cyan-400 text-cyan-400 hover:bg-cyan-500/20 transition-all font-bold uppercase tracking-[0.2em] text-xs"
                                                >
                                                    Encrypting... <Ellipsis className="w-4 h-4" />
                                                </button>
                                            ) : (
                                                <button
                                                    type="submit"
                                                    className="group flex items-center gap-2 px-10 py-3 bg-cyan-500/10 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-all uppercase tracking-[0.2em] text-xs"
                                                >
                                                    Send Payload
                                                </button>
                                            )
                                        ) : null}
                                    </div>
                                </form>
                            </div>
                        )}
                        <div ref={logEndRef} />
                    </div>

                    {/* Footer Info */}
                    <div className="p-3 px-6 bg-cyan-500/5 border-t border-cyan-500/10 flex justify-between items-center text-[9px] uppercase tracking-[0.3em] text-cyan-500/40 font-bold">
                        <div className="flex gap-6">
                            <span>ENCRYTION PROTOCOL: RSA_4096</span>
                        </div>
                        <div>
                            <span>CYBRTRN OS v2.42.1</span>
                        </div>
                    </div>
                </div>
            </CyberFrame>
        </div>
    );
};

export default CommLink;