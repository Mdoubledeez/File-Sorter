
export type FileCategory = 'Network' | 'Scripts' | 'Images' | 'Docs' | 'Binary' | 'Unknown';

export interface FileEntry {
  id: string;
  name: string;
  path: string;
  category: FileCategory;
  extension: string;
  size: number;
  hash: string;
  timestamp: number;
}

export interface LogEntry {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'process';
  message: string;
  timestamp: string;
}

export interface OrganizerStats {
  filesMoved: number;
  foldersCleaned: number;
  duplicatesRemoved: number;
  totalSize: number;
  status: 'idle' | 'scanning' | 'monitoring' | 'error';
}
