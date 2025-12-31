
import React from 'react';
import { 
  FileText, 
  Trash2, 
  Copy, 
  HardDrive, 
  ArrowUpRight,
  TrendingUp,
  FolderOpen
} from 'lucide-react';
import { OrganizerStats } from '../types';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardProps {
  stats: OrganizerStats;
}

const data = [
  { name: '00:00', processed: 400 },
  { name: '04:00', processed: 300 },
  { name: '08:00', processed: 1200 },
  { name: '12:00', processed: 900 },
  { name: '16:00', processed: 1500 },
  { name: '20:00', processed: 1800 },
  { name: '23:59', processed: 1700 },
];

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard 
          icon={<FileText className="text-emerald-400" />} 
          label="Files Processed" 
          value={stats.filesMoved.toLocaleString()} 
          trend="+12% from last scan"
        />
        <StatCard 
          icon={<Trash2 className="text-rose-400" />} 
          label="Folders Cleaned" 
          value={stats.foldersCleaned.toLocaleString()} 
          trend="Bottom-up cleanup"
        />
        <StatCard 
          icon={<Copy className="text-blue-400" />} 
          label="Duplicates Removed" 
          value={stats.duplicatesRemoved.toLocaleString()} 
          trend="SHA-256 Verified"
        />
        <StatCard 
          icon={<HardDrive className="text-purple-400" />} 
          label="Total Sorted Vol" 
          value={formatSize(stats.totalSize)} 
          trend="Archive density: 100%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              Activity Throughput
            </h3>
            <span className="text-xs text-zinc-500">Live Feed</span>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorProc" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis dataKey="name" stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#52525b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px' }}
                  itemStyle={{ color: '#10b981' }}
                />
                <Area type="monotone" dataKey="processed" stroke="#10b981" fillOpacity={1} fill="url(#colorProc)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-6 flex items-center gap-2">
            <FolderOpen className="w-5 h-5 text-amber-400" />
            Category Distribution
          </h3>
          <div className="space-y-4">
            <CategoryItem label="Network Tools" progress={45} count={124} color="bg-blue-500" />
            <CategoryItem label="Python Scripts" progress={78} count={452} color="bg-emerald-500" />
            <CategoryItem label="Evidence (Images)" progress={22} count={89} color="bg-purple-500" />
            <CategoryItem label="Pentest Docs" progress={34} count={112} color="bg-amber-500" />
            <CategoryItem label="Payloads" progress={12} count={45} color="bg-rose-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard: React.FC<{ icon: React.ReactNode; label: string; value: string; trend: string }> = ({ icon, label, value, trend }) => (
  <div className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:border-zinc-700 transition-colors group">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-zinc-800 rounded-xl group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <ArrowUpRight className="w-4 h-4 text-zinc-600" />
    </div>
    <div className="space-y-1">
      <p className="text-zinc-500 text-sm">{label}</p>
      <p className="text-2xl font-bold tracking-tight">{value}</p>
    </div>
    <p className="text-[10px] text-zinc-600 mt-4 font-mono uppercase tracking-widest">{trend}</p>
  </div>
);

const CategoryItem: React.FC<{ label: string; progress: number; count: number; color: string }> = ({ label, progress, count, color }) => (
  <div className="space-y-2">
    <div className="flex justify-between text-sm">
      <span className="text-zinc-300">{label}</span>
      <span className="text-zinc-500">{count} files</span>
    </div>
    <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
      <div className={`h-full ${color}`} style={{ width: `${progress}%` }} />
    </div>
  </div>
);

export default Dashboard;
