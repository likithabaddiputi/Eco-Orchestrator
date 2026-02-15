
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Leaf, Zap, Cpu, MessageSquare, Menu, X, ChevronDown, User, Bell } from 'lucide-react';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import FoodModule from './pages/FoodModule';
import EnergyModule from './pages/EnergyModule';
import ComputeModule from './pages/ComputeModule';
import Insights from './pages/Insights';
import { CAMPUSES, COLORS } from './constants';
import { Campus } from './types';

// Simple Carbon Clock
const CarbonClock = () => {
  const [timeLeft, setTimeLeft] = useState(1242); // seconds until next low carbon window
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 1242));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col items-center">
      <span className="text-[10px] uppercase tracking-widest text-cyan-400 opacity-60">Clean Window</span>
      <span className="text-xl mono font-bold text-cyan-400 tabular-nums">{formatTime(timeLeft)}</span>
    </div>
  );
};

const Sidebar = ({ isOpen, toggle }: { isOpen: boolean, toggle: () => void }) => {
  const location = useLocation();
  const navItems = [
    { path: '/dashboard', label: 'Command Center', icon: LayoutDashboard },
    { path: '/food', label: 'Smart Kitchen', icon: Leaf },
    { path: '/energy', label: 'Power Symphony', icon: Zap },
    { path: '/compute', label: 'Workload Orchestra', icon: Cpu },
    { path: '/insights', label: 'AI Oracle', icon: MessageSquare },
  ];

  return (
    <div className={`fixed inset-y-0 left-0 z-50 transform ${isOpen ? 'w-64' : 'w-20'} glass border-r border-cyan-400/10 transition-all duration-500 ease-out flex flex-col`}>
      <div className="p-6 flex items-center gap-4">
        <button onClick={toggle} className="p-2 hover:bg-cyan-400/10 rounded-lg transition-colors">
          {isOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5 text-cyan-400" />}
        </button>
        {isOpen && <span className="font-bold text-cyan-400 tracking-tighter text-xl">ECO-O</span>}
      </div>

      <nav className="flex-1 px-4 py-8 space-y-2">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3 rounded-xl transition-all duration-300 group ${
                isActive ? 'bg-cyan-400 text-forest shadow-[0_0_20px_rgba(0,245,255,0.3)]' : 'text-slate-300 hover:bg-cyan-400/10 hover:text-cyan-400'
              }`}
            >
              <item.icon className={`w-6 h-6 ${isActive ? 'text-forest' : 'group-hover:scale-110 transition-transform'}`} />
              {isOpen && <span className="font-medium">{item.label}</span>}
            </Link>
          );
        })}
      </nav>
      
      <div className="p-6 border-t border-cyan-400/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-cyan-400/20 flex items-center justify-center">
            <User className="w-4 h-4 text-cyan-400" />
          </div>
          {isOpen && (
            <div className="flex-1">
              <p className="text-xs font-bold text-white truncate">Admin Account</p>
              <p className="text-[10px] text-cyan-400 opacity-60">Verified Admin</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TopBar = () => {
  const [campus, setCampus] = useState(CAMPUSES[0]);
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="fixed top-0 left-20 right-0 h-20 glass border-b border-cyan-400/10 z-40 px-8 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <div className="relative">
          <button 
            onClick={() => setShowMenu(!showMenu)}
            className="flex items-center gap-3 px-4 py-2 bg-forest/50 border border-cyan-400/20 rounded-full hover:border-cyan-400/50 transition-all"
          >
            <img src={campus.avatar} alt={campus.name} className="w-6 h-6 rounded-full ring-1 ring-cyan-400" />
            <span className="text-sm font-semibold">{campus.name}</span>
            <ChevronDown className="w-4 h-4 opacity-60" />
            <div className="px-2 py-0.5 rounded-full bg-emerald-400/20 text-emerald-400 text-[10px] font-bold">
              Score: {campus.carbonScore}
            </div>
          </button>
          
          {showMenu && (
            <div className="absolute top-full left-0 mt-2 w-64 glass rounded-2xl border border-cyan-400/20 overflow-hidden shadow-2xl">
              {CAMPUSES.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setCampus(c); setShowMenu(false); }}
                  className="w-full p-3 flex items-center gap-3 hover:bg-cyan-400/10 transition-colors border-b border-cyan-400/5 last:border-0"
                >
                  <img src={c.avatar} alt={c.name} className="w-6 h-6 rounded-full" />
                  <div className="text-left">
                    <p className="text-sm font-semibold">{c.name}</p>
                    <p className="text-[10px] text-emerald-400">Efficiency: {c.carbonScore}%</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <CarbonClock />
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-end mr-4">
          <span className="text-[10px] text-slate-400 uppercase tracking-widest">Sustainability Score</span>
          <div className="flex items-center gap-2">
            <div className="h-2 w-32 bg-forest rounded-full overflow-hidden border border-cyan-400/10">
              <div className="h-full bg-gradient-to-r from-amber-400 to-cyan-400" style={{ width: '92%' }}></div>
            </div>
            <span className="text-sm font-bold text-cyan-400">92%</span>
          </div>
        </div>
        <button className="p-3 relative rounded-xl bg-forest/50 border border-cyan-400/10 hover:border-cyan-400/40 transition-all group">
          <Bell className="w-5 h-5 text-cyan-400 group-hover:animate-bounce" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-amber-400 rounded-full animate-ping"></span>
        </button>
      </div>
    </header>
  );
};

const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <HashRouter>
      <div className="min-h-screen">
        <div className="fixed top-4 left-6 z-[60] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_8px_#00F5FF]"></div>
          <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-cyan-400 drop-shadow-[0_0_8px_rgba(0,245,255,0.5)]">
            Align every meal, every kilowatt, and every GPU with the cleanest moments of the day.
          </span>
        </div>

        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/*" element={
            <>
              <Sidebar isOpen={sidebarOpen} toggle={() => setSidebarOpen(!sidebarOpen)} />
              <div className={`transition-all duration-500 ${sidebarOpen ? 'pl-64' : 'pl-20'}`}>
                <TopBar />
                <main className="pt-24 p-8 min-h-screen">
                  <Routes>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/food" element={<FoodModule />} />
                    <Route path="/energy" element={<EnergyModule />} />
                    <Route path="/compute" element={<ComputeModule />} />
                    <Route path="/insights" element={<Insights />} />
                  </Routes>
                </main>
              </div>
            </>
          } />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
