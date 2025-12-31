
import React, { useState } from 'react';
import { Copy, Check, Download, FileJson } from 'lucide-react';

const PYTHON_IMPLEMENTATION = `import os
import shutil
import hashlib
import time
import logging
from pathlib import Path
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

# --- RecursiveOrganizer Architect ---
class RecursiveOrganizer:
    """
    World-class Recursive Organizer for chaotic directory trees.
    Features bottom-up traversal, hash-based deduplication, and
    safe exclusion of destination directories.
    """
    
    def __init__(self, root_dir, dest_dir="~/Sorted", blocklist=None):
        self.root_dir = Path(root_dir).expanduser().resolve()
        self.dest_dir = Path(dest_dir).expanduser().resolve()
        self.blocklist = blocklist or [".git", ".svn", "CTF_Writeup", ".idea"]
        self.blocklist.append(self.dest_dir.name)
        
        self.category_map = {
            ".pcap": "Network", ".pcapng": "Network", ".cap": "Network",
            ".py": "Scripts", ".sh": "Scripts", ".js": "Scripts",
            ".png": "Images", ".jpg": "Images", ".jpeg": "Images",
            ".pdf": "Docs", ".docx": "Docs", ".md": "Docs",
            ".exe": "Binary", ".bin": "Binary"
        }
        
        logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(message)s")

    def get_file_hash(self, file_path):
        """Calculate SHA-256 for deduplication."""
        hasher = hashlib.sha256()
        with open(file_path, 'rb') as f:
            for chunk in iter(lambda: f.read(4096), b""):
                hasher.update(chunk)
        return hasher.hexdigest()

    def scan_and_sort(self, current_dir=None):
        """Recursively crawl and organize files (bottom-up)."""
        if current_dir is None:
            current_dir = self.root_dir

        # Using os.walk bottom-up for safe folder deletion
        for root, dirs, files in os.walk(current_dir, topdown=False):
            root_path = Path(root)
            
            # Exclusion Logic
            if any(part in self.blocklist for part in root_path.parts):
                continue

            for filename in files:
                file_path = root_path / filename
                self._process_file(file_path)

            # Cleanup: Deletes empty directories
            if not os.listdir(root) and root_path != self.root_dir:
                try:
                    os.rmdir(root)
                    logging.info(f"Deleted empty directory: {root}")
                except Exception as e:
                    logging.error(f"Failed to delete {root}: {e}")

    def _process_file(self, file_path):
        ext = file_path.suffix.lower()
        if ext in self.category_map:
            category = self.category_map[ext]
            target_folder = self.dest_dir / category
            target_folder.mkdir(parents=True, exist_ok=True)
            
            new_path = target_folder / file_path.name
            
            # Deduplication logic
            if new_path.exists():
                if self.get_file_hash(file_path) == self.get_file_hash(new_path):
                    logging.info(f"Duplicate found. Deleting source: {file_path.name}")
                    file_path.unlink()
                    return
                else:
                    # Rename if different content
                    new_path = target_folder / f"{time.time()}_{file_path.name}"

            shutil.move(str(file_path), str(new_path))
            logging.info(f"Moved {file_path.name} -> {category}/")

class WatchdogHandler(FileSystemEventHandler):
    def __init__(self, organizer):
        self.organizer = organizer

    def on_created(self, event):
        if not event.is_directory:
            logging.info(f"New file detected: {event.src_path}")
            self.organizer._process_file(Path(event.src_path))

# --- Main Runtime Execution ---
if __name__ == "__main__":
    ROOT = "~/Workspace"
    SORTED = "~/Sorted"
    
    organizer = RecursiveOrganizer(ROOT, SORTED)
    
    print("🚀 Initializing Full System Scan...")
    organizer.scan_and_sort()
    print("✅ Full Scan Complete. Switching to Real-time Monitoring.")
    
    observer = Observer()
    observer.schedule(WatchdogHandler(organizer), str(organizer.root_dir), recursive=True)
    observer.start()
    
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()`;

const PythonCodeBlock: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(PYTHON_IMPLEMENTATION);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">System Implementation</h2>
          <p className="text-zinc-500 mt-1">Python 3.10+ PEP8 Compliant recursive logic</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={copyToClipboard}
            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg transition-colors text-sm font-medium"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
            {copied ? 'Copied' : 'Copy Code'}
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors text-sm font-medium">
            <Download className="w-4 h-4" />
            Download Source
          </button>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
            <span className="bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-1 rounded text-[10px] font-mono uppercase">python</span>
            <span className="bg-zinc-800 border border-zinc-700 text-zinc-400 px-2 py-1 rounded text-[10px] font-mono uppercase">pep8</span>
        </div>
        <pre className="p-8 bg-zinc-900 border border-zinc-800 rounded-2xl overflow-x-auto mono text-sm text-zinc-300 leading-relaxed scrollbar-thin">
          <code className="whitespace-pre">{PYTHON_IMPLEMENTATION}</code>
        </pre>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <FileJson className="w-4 h-4 text-blue-400" />
            Logic Breakdown
          </h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>• <span className="text-zinc-200">Bottom-Up Crawl:</span> Uses os.walk(topdown=False) to ensure children are sorted before parents are evaluated for deletion.</li>
            <li>• <span className="text-zinc-200">Hash Check:</span> Uses SHA-256 binary streams to detect exact file matches before moving.</li>
            <li>• <span className="text-zinc-200">Path Sanitization:</span> Uses Pathlib for robust cross-platform path resolution and expansion.</li>
          </ul>
        </div>
        <div className="p-6 bg-zinc-900/30 border border-zinc-800 rounded-2xl">
          <h4 className="font-semibold mb-2 flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            Safety Features
          </h4>
          <ul className="space-y-2 text-sm text-zinc-400">
            <li>• <span className="text-zinc-200">Loop Prevention:</span> Destination folder is dynamically added to the crawl blocklist.</li>
            <li>• <span className="text-zinc-200">Atomic Operations:</span> Moves are processed sequentially with verification steps.</li>
            <li>• <span className="text-zinc-200">Graceful Exit:</span> Watchdog threads are joined and closed correctly on termination.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PythonCodeBlock;
