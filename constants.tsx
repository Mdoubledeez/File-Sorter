
import { FileCategory } from './types';

export const CATEGORY_MAP: Record<string, FileCategory> = {
  '.pcap': 'Network',
  '.pcapng': 'Network',
  '.cap': 'Network',
  '.py': 'Scripts',
  '.sh': 'Scripts',
  '.js': 'Scripts',
  '.ts': 'Scripts',
  '.png': 'Images',
  '.jpg': 'Images',
  '.jpeg': 'Images',
  '.gif': 'Images',
  '.pdf': 'Docs',
  '.docx': 'Docs',
  '.txt': 'Docs',
  '.md': 'Docs',
  '.exe': 'Binary',
  '.deb': 'Binary',
  '.bin': 'Binary',
};

export const CATEGORY_COLORS: Record<FileCategory, string> = {
  Network: 'text-blue-400',
  Scripts: 'text-emerald-400',
  Images: 'text-purple-400',
  Docs: 'text-amber-400',
  Binary: 'text-rose-400',
  Unknown: 'text-zinc-500',
};

export const EXCLUDED_PATHS = ['~/Sorted', '.git', '.svn', 'node_modules', 'CTF_Writeup'];
