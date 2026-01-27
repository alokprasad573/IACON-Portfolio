'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Cpu, Swords, Zap, Thermometer, Activity, Network } from 'lucide-react';

// Type definitions for the terminal data
interface BootStep {
  id: number;
  text: string;
  type: 'base' | 'bumblebee' | 'error' | 'input' | 'system';
  pause?: number;
  isComplete?: boolean;
  timestamp?: string;
}

interface TypewriterLogProps {
  text: string;
  onComplete: () => void;
  speed?: number;
  className?: string;
  fastForward: boolean;
}

const TypewriterLog: React.FC<TypewriterLogProps> = ({ text, onComplete, speed = 30, className = "", fastForward }) => {
  const [displayedText, setDisplayedText] = useState('');
  const hasTriggered = useRef(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);
  
  useEffect(() => {
    if (fastForward) {
      setDisplayedText(text);
      if (!hasTriggered.current) {
        hasTriggered.current = true;
        onCompleteRef.current?.();
      }
      return;
    }

    let i = 0;
    const timer = setInterval(() => {
      setDisplayedText(text.substring(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(timer);
        if (!hasTriggered.current) {
          hasTriggered.current = true;
          onCompleteRef.current?.();
        }
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed, fastForward]);

  return <span className={className}>{displayedText}</span>;
};

// Static data
const BOOT_SEQUENCE: BootStep[] = [
    { "id": 0, "text": "INITIALIZING CONNECTION...", "type": "bumblebee", "pause": 2000 },
    { "id": 1, "text": "SEARCHING FOR AUTOBOT SIGNALS...", "type": "bumblebee", "pause": 5000 },
    { "id": 2, "text": "CYBERTRONIAN SIGNAL DETECTED.", "type": "bumblebee", "pause": 1500 },
    { "id": 3, "text": "DECRYPTING CYBERTRONIAN FREQUENCIES...", "type": "bumblebee", "pause": 4000 },
    { "id": 4, "text": "HI, I AM B-127.", "type": "bumblebee", "pause": 0 },
    { "id": 5, "text": "BIOMETRIC SCAN REQUIRED BEFORE ENTRY.", "type": "base", "pause": 1000 },
    { "id": 6, "text": "ACCESS GRANTED...", "type": "bumblebee", "pause": 0 },
    { "id": 7, "text": "IDENTITY CONFIRMED: B-127 [BUMBLEBEE]", "type": "base", "pause": 3000 },
    { "id": 8, "text": "WELCOME TO OUR NEW CYBERTRONIAN BASE.", "type": "base", "pause": 2000 },
    { "id": 9, "text": "I HAVE ARRIVED AT BASE. SUSTAINED DAMAGE WHILE ENTERING.", "type": "bumblebee", "pause": 6000 },
    { "id": 10, "text": "CURRENT SYSTEM INTEGRITY: 42% AND DROPPING.", "type": "base", "pause": 2000 },
    { "id": 11, "text": "ACCESS GRANTED. INITIATING CORE REPAIR PROTOCOL...", "type": "bumblebee", "pause": 2000 },
    { "id": 12, "text": "CORE REPAIR PROTOCOL HAS BEEN INITIATED. OPENING SYSTEM LOGS...", "type": "system", "pause": 4000 },
    { "id": 13, "text": "CLICK TO SEE SYSTEM LOGS", "type" : "system", "pause": 0}
  ];

const CyberTerminal: React.FC = () => {
  const [logs, setLogs] = useState<BootStep[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const currentIdRef = useRef<number>(-1);
  const isTransitioningRef = useRef<boolean>(false);
  const [isDamaged, setIsDamaged] = useState(false);
  const [fastForward, setFastForward] = useState(false);
  
  const [systemMetrics, setSystemMetrics] = useState({
    energon: 84.5,
    temp: 42.1,
    stability: 91.8
  });

  // Effect to detect when damage is reported (ID 9)
  useEffect(() => {
    const hasDamageReport = logs.some(l => l.id === 9);
    if (hasDamageReport && !isDamaged) {
      setIsDamaged(true);
      setSystemMetrics({
        energon: 36.8,
        temp: 68.2,
        stability: 40.0
      });
    }
  }, [logs, isDamaged]);

  // Background Telemetry Simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => {
        // If damaged, fluctuate aggressively around low values
        if (isDamaged) {
          return {
            energon: Math.max(0, Math.min(100, prev.energon + (Math.random() * 1.5 - 0.75))), // Unstable drop
            temp: Math.max(20, Math.min(100, prev.temp + (Math.random() * 2 - 0.5))), // Rising temp
            stability: Math.max(0, Math.min(60, prev.stability + (Math.random() * 3 - 1.5))) // Highly unstable
          };
        }
        // Normal stable fluctuations
        return {
          energon: Math.max(0, Math.min(100, prev.energon + (Math.random() * 0.4 - 0.2))),
          temp: Math.max(20, Math.min(90, prev.temp + (Math.random() * 0.6 - 0.3))),
          stability: Math.max(80, Math.min(100, prev.stability + (Math.random() * 0.2 - 0.1)))
        };
      });
    }, 1500); // Slightly faster update rate for visual feedback
    return () => clearInterval(interval);
  }, [isDamaged]);

  // Initialize strictly once
  useEffect(() => {
    if (currentIdRef.current === -1) {
      currentIdRef.current = 0;
      setLogs([{ ...BOOT_SEQUENCE[0], isComplete: false }]);
    }
  }, []);

  const handleLineComplete = useCallback((finishedId: number) => {
    if (finishedId !== currentIdRef.current || isTransitioningRef.current) return;

    setLogs(prev => prev.map(l => l.id === finishedId ? { ...l, isComplete: true } : l));

    const nextId = finishedId + 1;
    const nextStep = BOOT_SEQUENCE.find(s => s.id === nextId);

    if (nextStep) {
      isTransitioningRef.current = true;
      const delay = fastForward ? 0 : nextStep.pause ?? 300;

      setTimeout(() => {
        setLogs(prev => {
          if (prev.some(l => l.id === nextId)) {
            isTransitioningRef.current = false;
            return prev;
          }
          currentIdRef.current = nextId;
          isTransitioningRef.current = false;
          return [...prev, { ...nextStep, isComplete: false }];
        });
      }, delay);
    }
  }, [fastForward]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  // Map types to Tailwind classes for consistency
  const getColorClass = (type: string) => {
    switch (type) {
      case 'bumblebee': return 'text-[#FFD700] yellow-glow font-bold';
      case 'system': return 'text-cyan-200 cyan-glow';
      case 'base': return 'text-zinc-200';
      case 'error': return 'text-red-500';
      default: return 'text-zinc-400';
    }
  };

  const handleClick = () => {
    setFastForward(true);
  };

  return (
    <div className="min-h-screen bg-[#020202] p-4 md:p-10 font-mono text-zinc-300 flex flex-col items-center justify-center relative overflow-hidden" onClick={handleClick}>
    

      {/* Main Terminal Shell */}
      <div className={`w-full max-w-4xl bg-black/60 border rounded-sm overflow-hidden flex flex-col h-[50vh] backdrop-blur-xl relative z-10 transition-colors duration-500 ${isDamaged ? 'border-red-900/50 border-t-red-500/20' : 'border-[#FFD700] border-t-[#FFD700]/20'}`}>
        
        {/* Header Section */}
        <div className="flex flex-col border-b border-zinc-800/80 bg-zinc-950/60">
          <div className="px-6 py-3 flex items-center justify-between border-b border-zinc-900/50">
            <div className="flex items-center gap-3">
              <Cpu className={`w-3.5 h-3.5 animate-pulse ${isDamaged ? 'text-red-500' : 'text-[#FFD700]'}`} />
              <span className={`text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold font-orbitron ${isDamaged ? 'text-red-500 red-glow' : 'text-[#FFD700] yellow-glow'}`}>B-127 / CORE-LINK</span>
            </div>
            <div className="flex items-center gap-6">
               <div className="flex items-center gap-2">
                 <Network className="w-3 h-3 text-zinc-500" />
                 <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-orbitron">BASE-ALPHA-7</span>
               </div>
               <div className="flex items-center gap-2">
                 <Swords className="w-3.5 h-3.5 text-zinc-400" />
                 <span className="text-[10px] uppercase tracking-[0.3em] font-orbitron text-zinc-400">WARRIOR</span>
               </div>
            </div>
          </div>

          {/* Telemetry Bar */}
          <div className="px-6 py-2.5 flex items-center gap-8 overflow-x-auto no-scrollbar">
            {/* Energon */}
            <div className="flex items-center gap-3 min-w-fit">
              <Zap size={11} className={systemMetrics.energon < 40 ? 'text-red-500 animate-pulse' : 'text-[#FFD700]'} />
              <div className="flex flex-col gap-1">
                <div className="flex justify-between w-24 text-[8px] font-orbitron tracking-tighter text-zinc-500 uppercase">
                  <span>Energon</span>
                  <span className={systemMetrics.energon < 40 ? 'text-red-500 font-bold' : 'text-[#FFD700] font-bold'}>
                    {systemMetrics.energon.toFixed(1)}%
                  </span>
                </div>
                <div className="h-0.5 w-24 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${systemMetrics.energon < 40 ? 'bg-red-500' : 'bg-[#FFD700]'}`} 
                    style={{ width: `${systemMetrics.energon}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Core Temp */}
            <div className="flex items-center gap-3 min-w-fit">
              <Thermometer size={11} className={systemMetrics.temp > 65 ? 'text-red-500 animate-pulse' : 'text-red-500'} />
              <div className="flex flex-col gap-1">
                <div className="flex justify-between w-24 text-[8px] font-orbitron tracking-tighter text-zinc-500 uppercase">
                  <span>Core Temp</span>
                  <span className={systemMetrics.temp > 65 ? 'text-red-500 font-bold' : 'text-zinc-300'}>
                    {systemMetrics.temp.toFixed(1)}°
                  </span>
                </div>
                <div className="h-0.5 w-24 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-red-500 transition-all duration-1000" 
                    style={{ width: `${systemMetrics.temp}%` }} 
                  />
                </div>
              </div>
            </div>

            {/* Stability */}
            <div className="flex items-center gap-3 min-w-fit">
              <Activity size={11} className={systemMetrics.stability < 50 ? 'text-red-500 animate-pulse' : 'text-blue-400'} />
              <div className="flex flex-col gap-1">
                <div className="flex justify-between w-24 text-[8px] font-orbitron tracking-tighter text-zinc-500 uppercase">
                  <span>Stability</span>
                  <span className={systemMetrics.stability < 50 ? 'text-red-500 font-bold' : 'text-blue-400'}>
                    {systemMetrics.stability.toFixed(1)}%
                  </span>
                </div>
                <div className="h-0.5 w-24 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full transition-all duration-1000 ${systemMetrics.stability < 50 ? 'bg-red-500' : 'bg-blue-400'}`} 
                    style={{ width: `${systemMetrics.stability}%` }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Log Container */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div ref={scrollRef} className="flex-1 p-6 md:p-8 overflow-y-auto space-y-4 custom-scrollbar bg-black/10">
            {logs.map((log) => (
              <div key={log.id} className="flex flex-col gap-1">
                <span className="text-[10px] text-zinc-600 select-none font-mono opacity-50">
                  [{log.timestamp || new Date().toLocaleTimeString([], {hour:'2-digit', minute:'2-digit', second:'2-digit'})}]
                </span>
                <div className={`font-orbitron uppercase tracking-[0.3em] text-[11px] md:text-[13px] ${getColorClass(log.type)}`}>
                  {log.isComplete ? (
                    log.text
                  ) : (
                    <TypewriterLog 
                      text={log.text} 
                      speed={20} 
                      className={getColorClass(log.type)}
                      onComplete={() => handleLineComplete(log.id)} 
                      fastForward={fastForward}
                    />
                  )}
                  {!log.isComplete && (
                    <span className={`inline-block w-1.5 h-3 ml-1 animate-pulse ${
                      log.type === 'bumblebee' ? 'bg-[#FFD700]' : 
                      log.type === 'system' ? 'bg-cyan-200' : 
                      'bg-zinc-200'
                    }`} />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&family=JetBrains+Mono:wght@400;700&display=swap');
        .font-orbitron { font-family: 'Orbitron', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        .yellow-glow { text-shadow: 0 0 10px rgba(255, 215, 0, 0.4); }
        .cyan-glow { text-shadow: 0 0 10px rgba(165, 243, 252, 0.4); }
        .red-glow { text-shadow: 0 0 10px rgba(239, 68, 68, 0.6); }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        @keyframes scanline {
          0% { top: -100px; opacity: 0; }
          100% { top: 100vh; opacity: 0; }
        }
        .animate-scanline { animation: scanline 8s linear infinite; }
        .custom-scrollbar::-webkit-scrollbar { width: 3px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255, 215, 0, 0.2); border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CyberTerminal;