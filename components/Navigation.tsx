
import React from 'react';
import { 
  LayoutDashboard, 
  Leaf, 
  Zap, 
  Cpu, 
  Settings, 
  LogOut, 
  Menu,
  Bell,
  Search,
  Database,
  Bot,
  MessageSquarePlus
} from 'lucide-react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isSidebarOpen: boolean;
  setIsSidebarOpen: (isOpen: boolean) => void;
  role: string;
}

export const Sidebar: React.FC<NavigationProps> = ({ activeTab, setActiveTab, isSidebarOpen, setIsSidebarOpen }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'copilot', label: 'AI Copilot Analyst', icon: Bot },
    { id: 'food', label: 'Food Intelligence', icon: Leaf },
    { id: 'energy', label: 'Energy Intelligence', icon: Zap },
    { id: 'compute', label: 'Compute Intelligence', icon: Cpu },
    { id: 'upload', label: 'Data Integration', icon: Database },
    { id: 'reviews', label: 'Reviews & Doubts', icon: MessageSquarePlus },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <aside 
      className={`fixed left-0 top-0 z-40 h-screen w-64 transform border-r border-white/5 bg-slate-950/90 backdrop-blur-xl transition-transform duration-300 ease-in-out ${
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}
    >
      <div className="flex h-16 items-center px-6 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center">
            <Leaf className="h-5 w-5 text-white" />
          </div>
          <span className="font-display text-xl font-bold tracking-tight text-white">Eco<span className="text-emerald-500">Orchestrator</span></span>
        </div>
      </div>

      <nav className="mt-6 px-3">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                activeTab === item.id 
                  ? 'bg-emerald-500/10 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.1)]' 
                  : 'text-slate-400 hover:bg-white/5 hover:text-slate-100'
              }`}
            >
              <item.icon className={`h-5 w-5 ${activeTab === item.id ? 'text-emerald-500' : 'text-slate-400'}`} />
              {item.label}
            </button>
          ))}
        </div>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-white/5">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-400 hover:text-red-400 transition-colors">
          <LogOut className="h-5 w-5" />
          Sign Out
        </button>
      </div>
    </aside>
  );
};

export const Topbar: React.FC<NavigationProps> = ({ isSidebarOpen, setIsSidebarOpen, role }) => {
  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-white/5 bg-slate-950/80 px-6 backdrop-blur-xl transition-all lg:pl-72">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="rounded-lg p-2 text-slate-400 hover:bg-white/5 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
        <div className="hidden md:flex relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <input 
                type="text" 
                placeholder="Ask Eco-Orchestrator or search..." 
                className="h-10 w-64 rounded-full border border-white/10 bg-white/5 pl-10 pr-4 text-sm text-slate-200 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
                 <kbd className="hidden rounded bg-slate-800 px-1.5 py-0.5 text-[10px] font-bold text-slate-400 sm:inline-block">⌘K</kbd>
            </div>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-medium text-slate-200">PES University</p>
          <p className="text-xs text-emerald-500">{role}</p>
        </div>
        <button className="relative rounded-full bg-white/5 p-2 text-slate-400 hover:text-white transition-colors">
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_8px_#10b981]"></span>
        </button>
        <div className="h-9 w-9 overflow-hidden rounded-full border border-white/10 bg-slate-800">
            <img src="https://picsum.photos/100/100" alt="User" className="h-full w-full object-cover" />
        </div>
      </div>
    </header>
  );
};
