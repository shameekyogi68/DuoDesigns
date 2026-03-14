import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/constants/app';
import { 
  Search, 
  LayoutDashboard, 
  Package, 
  IndianRupee, 
  FileText, 
  Settings,
  ArrowRight,
  LogOut,
  Infinity
} from 'lucide-react';
import { useAuthStore } from '@/store/authStore';

const commands = [
  { label: 'Go to Dashboard', icon: LayoutDashboard, route: ROUTES.DASHBOARD, shortcut: '⌘ D' },
  { label: 'View Revenue Logs', icon: Package, route: ROUTES.ORDERS, shortcut: '⌘ L' },
  { label: 'Monthly Settlements', icon: IndianRupee, route: ROUTES.SETTLEMENTS, shortcut: '⌘ S' },
  { label: 'Audit Reports', icon: FileText, route: ROUTES.REPORTS, shortcut: '⌘ R' },
  { label: 'System Configuration', icon: Settings, route: ROUTES.SETTINGS, shortcut: '⌘ X' },
  { label: 'Duo Designs Home', icon: Infinity, route: 'https://duodesigns.in', external: true, shortcut: '⌘ H' },
];

const CommandMenu = ({ isOpen, onClose }) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const logout = useAuthStore(state => state.logout);

  const filteredCommands = commands.filter(cmd => 
    cmd.label.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 10);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) {
        if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
          e.preventDefault();
          onClose(false); // Toggle logic usually happens in parent, but we can call it here if needed
        }
        return;
      }

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
      } else if (e.key === 'Enter') {
        const cmd = filteredCommands[selectedIndex];
        if (cmd) {
          if (cmd.external) window.open(cmd.route, '_blank');
          else navigate(cmd.route);
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex, navigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="command-menu-overlay" onClick={onClose}>
      <div className="command-menu reveal" onClick={e => e.stopPropagation()}>
        <div className="relative border-b border-[#222]">
           <Search size={20} className="absolute left-6 top-1/2 -translate-y-1/2 text-[var(--gray)]" />
           <input 
            ref={inputRef}
            type="text" 
            className="command-search !pl-16 !border-none" 
            placeholder="EXECUTE COMMAND OR SEARCH MODULES..." 
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
        </div>
        
        <div className="command-list py-4">
          {filteredCommands.length === 0 ? (
            <div className="p-10 text-center text-[var(--gray)] text-[11px] font-bold uppercase tracking-widest">
              Zero matches for "{query}"
            </div>
          ) : (
            filteredCommands.map((cmd, idx) => {
              const Icon = cmd.icon;
              return (
                <div 
                  key={cmd.label} 
                  className={`command-item ${idx === selectedIndex ? 'selected' : ''}`}
                  onClick={() => {
                    if (cmd.external) window.open(cmd.route, '_blank');
                    else navigate(cmd.route);
                    onClose();
                  }}
                >
                  <div className="flex items-center gap-4">
                    <Icon size={16} />
                    <span className="label !tracking-[1px]">{cmd.label}</span>
                  </div>
                  <span className="shortcut">{cmd.shortcut}</span>
                </div>
              );
            })
          )}
        </div>

        <div className="p-4 border-t border-[#222] bg-[#0a0a0a] flex items-center justify-between">
           <div className="flex gap-4 text-[9px] font-black uppercase tracking-[2px] text-[#444]">
              <span className="flex items-center gap-1"><ArrowRight size={10} /> Navigate</span>
              <span className="flex items-center gap-1"><ArrowRight size={10} /> Select</span>
              <span className="flex items-center gap-1"><ArrowRight size={10} /> Dismiss</span>
           </div>
           <button 
            onClick={() => { logout(); onClose(); }}
            className="text-[9px] font-black uppercase tracking-[2px] text-[var(--red)] flex items-center gap-2"
           >
             <LogOut size={12} /> Termination Procedure
           </button>
        </div>
      </div>
    </div>
  );
};

export default CommandMenu;
