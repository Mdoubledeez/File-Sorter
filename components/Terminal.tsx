
import React, { useEffect, useRef } from 'react';
import { LogEntry } from '../types';
import { Terminal as TermIcon, Circle, AlertCircle, CheckCircle2, Loader2 } from 'lucide-react';

interface TerminalProps {
  logs: LogEntry[];
}

const Terminal: React.FC<TerminalProps> = ({ logs }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [logs]);

  return (
    <div className="h-full flex flex-col bg-black rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800 bg-zinc-900/40">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <Circle className="w-3 h-3 fill-rose-500 text-rose-500" />
            <Circle className="w-3 h-3 fill-amber-500 text-amber-500" />
            <Circle className="w-3 h-3 fill-emerald-500 text-emerald-500" />
          </div>
          <div className="h-4 w-px bg-zinc-700" />
          <div className="flex items-center gap-2 text-zinc-400 text-xs mono">
            <TermIcon className="w-3.5 h-3.5" />
            <span>sys_organizer.service</span>
          </div>
        </div>
        <div className="text-[10px] text-zinc-600 mono">PID: 49210</div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex-1 p-6 font-mono text-sm space-y-2 overflow-y-auto"
      >
        {logs.length === 0 ? (
          <div className="text-zinc-600 italic">Waiting for process initiation...</div>
        ) : (
          logs.map((log) => (
            <div key={log.id} className="flex gap-4 group hover:bg-zinc-900/30 -mx-4 px-4 py-0.5 transition-colors">
              <span className="text-zinc-600 shrink-0 select-none">[{log.timestamp}]</span>
              <div className="flex gap-3 items-start">
                <span className="shrink-0 mt-1">
                  {log.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-500" />}
                  {log.type === 'error' && <AlertCircle className="w-4 h-4 text-rose-500" />}
                  {log.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-500" />}
                  {log.type === 'process' && <Loader2 className="w-4 h-4 text-blue-500 animate-spin" />}
                  {log.type === 'info' && <Circle className="w-2 h-2 text-zinc-500 mt-1" />}
                </span>
                <span className={`
                  ${log.type === 'error' ? 'text-rose-400' : ''}
                  ${log.type === 'success' ? 'text-emerald-400' : ''}
                  ${log.type === 'warning' ? 'text-amber-400' : ''}
                  ${log.type === 'process' ? 'text-blue-400' : ''}
                  ${log.type === 'info' ? 'text-zinc-300' : ''}
                `}>
                  {log.message}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
      
      <div className="px-6 py-4 bg-zinc-900/20 border-t border-zinc-800 flex gap-2 items-center">
        <span className="text-emerald-500 font-bold">$</span>
        <input 
          type="text" 
          placeholder="Enter system command..." 
          className="bg-transparent border-none outline-none flex-1 text-zinc-400 placeholder:text-zinc-700 mono text-xs"
        />
      </div>
    </div>
  );
};

export default Terminal;
