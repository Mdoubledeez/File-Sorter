
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
  FolderTree, 
  Terminal as TerminalIcon, 
  ShieldCheck, 
  Activity, 
  Code, 
  LayoutDashboard,
  Settings as SettingsIcon,
  Play,
  Square,
  RefreshCw,
  FolderSync
} from 'lucide-react';
import Dashboard from './components/Dashboard';
import Terminal from './components/Terminal';
import PythonCodeBlock from './components/PythonCodeBlock';
import { OrganizerStats, LogEntry, FileEntry } from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'code' | 'logs'>('dashboard');
  const [stats, setStats] = useState<OrganizerStats>({
    filesMoved: 0,
    foldersCleaned: 0,
    duplicatesRemoved: 0,
    totalSize: 0,
    status: 'idle'
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [recentFiles, setRecentFiles] = useState<FileEntry[]>([]);
  const logContainerRef = useRef<HTMLDivElement>(null);

  const addLog = useCallback((message: string, type: LogEntry['type'] = 'info') => {
    const newLog: LogEntry = {
      id: Math.random().toString(36).substr(2, 9),
      type,
      message,
      timestamp: new Date().toLocaleTimeString()
    };
    setLogs(prev => [...prev.slice(-49), newLog]);
  }, []);

  const startScan = async () => {
    setStats(prev => ({ ...prev, status: 'scanning' }));
    addLog('Initializing Deep Scan of root_dir...', 'process');
    addLog('Excluded directories: ~/Sorted, .git, .svn, CTF_Writeup', 'warning');
    
    // Simulate Recursive Scan logic
    await new Promise(r => setTimeout(r, 1000));
    addLog('Traversing directory tree (bottom-up approach)...', 'info');
    
    // Simulate finding and moving files
    const mockFiles: string[] = ['capture_01.pcap', 'exploit.py', 'evidence.png', 'notes.txt', 'payload.bin'];
    for (const file of mockFiles) {
      await new Promise(r => setTimeout(r, 600));
      addLog(`Found ${file} - Validating hash...`, 'info');
      addLog(`Moving ${file} to ~/Sorted/ByCategory/`, 'success');
      setStats(prev => ({ 
        ...prev, 
        filesMoved: prev.filesMoved + 1,
        totalSize: prev.totalSize + Math.random() * 5000000
      }));
    }

    addLog('Scan complete. Cleaning up empty directories...', 'info');
    await new Promise(r => setTimeout(r, 800));
    addLog('Deleted 14 empty subdirectories.', 'success');
    setStats(prev => ({ 
      ...prev, 
      status: 'monitoring',
      foldersCleaned: 14 
    }));
    addLog('Watchdog monitoring active. Listening for file system events...', 'process');
  };

  const stopService = () => {
    setStats(prev => ({ ...prev, status: 'idle' }));
    addLog('Service halted by user.', 'error');
  };

  return (
    <div className="flex h-screen w-full bg-zinc-950">
      {/* Sidebar */}
      <nav className="w-16 md:w-64 border-r border-zinc-800 flex flex-col bg-zinc-900/50 backdrop-blur-xl">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-emerald-500/20 p-2 rounded-lg">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <span className="hidden md:block font-bold text-lg tracking-tight">Recursive Arch</span>
        </div>

        <div className="flex-1 px-3 py-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="hidden md:block">Dashboard</span>
          </button>
          <button 
            onClick={() => setActiveTab('logs')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'logs' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}
          >
            <TerminalIcon className="w-5 h-5" />
            <span className="hidden md:block">Process Logs</span>
          </button>
          <button 
            onClick={() => setActiveTab('code')}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${activeTab === 'code' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-200'}`}
          >
            <Code className="w-5 h-5" />
            <span className="hidden md:block">Python Config</span>
          </button>
        </div>

        <div className="p-4 border-t border-zinc-800">
          <div className="hidden md:block mb-4">
            <div className="flex justify-between items-center mb-1">
              <span className="text-xs text-zinc-500">Service Status</span>
              <span className={`text-xs uppercase font-bold ${stats.status === 'monitoring' ? 'text-emerald-400' : 'text-zinc-500'}`}>
                {stats.status}
              </span>
            </div>
            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${stats.status === 'scanning' ? 'w-2/3 bg-blue-500 animate-pulse' : stats.status === 'monitoring' ? 'w-full bg-emerald-500' : 'w-0'}`} />
            </div>
          </div>
          
          <button 
            onClick={stats.status === 'idle' ? startScan : stopService}
            className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all shadow-lg ${stats.status === 'idle' ? 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-900/20' : 'bg-rose-600/10 hover:bg-rose-600/20 text-rose-400 border border-rose-600/20'}`}
          >
            {stats.status === 'idle' ? <><Play className="w-4 h-4 fill-current" /> Run Full Scan</> : <><Square className="w-4 h-4 fill-current" /> Stop Service</>}
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-zinc-800 flex items-center justify-between px-8 bg-zinc-950/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-2">
            <span className="text-zinc-400 capitalize">{activeTab}</span>
            <span className="text-zinc-600">/</span>
            <span className="font-medium">System_Root</span>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-xs text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-full border border-zinc-800">
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-time Monitoring Active</span>
            </div>
            <button className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors">
              <SettingsIcon className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          {activeTab === 'dashboard' && <Dashboard stats={stats} />}
          {activeTab === 'logs' && <Terminal logs={logs} />}
          {activeTab === 'code' && <PythonCodeBlock />}
        </div>
      </main>
    </div>
  );
};

export default App;
