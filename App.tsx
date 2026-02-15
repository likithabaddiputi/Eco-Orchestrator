
import React, { useState, useEffect } from 'react';
import { Sidebar, Topbar } from './components/Navigation';
import { Dashboard } from './components/Dashboard';
import { GlassCard } from './components/GlassCard';
import { DataUpload } from './components/DataUpload';
import { DataService } from './services/DataService';
import { AICopilot } from './components/AICopilot';
import { ReviewForm } from './components/ReviewForm';
import { UserRole, Suggestion, PredictionResult } from './types';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { ChevronRight, Globe, PlayCircle, TrendingUp, TrendingDown, Minus, AlertTriangle, CheckCircle } from 'lucide-react';

// Landing Page Component (Internal to App for single-file requirement simplicity in this demo structure)
const LandingPage: React.FC<{ onEnterApp: () => void }> = ({ onEnterApp }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden relative selection:bg-emerald-500/30">
      {/* Background Gradients */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-teal-500/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Nav */}
      <nav className="relative z-10 mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight">
          Eco<span className="text-emerald-500">Orchestrator</span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a href="#" className="hover:text-white transition-colors">Platform</a>
          <a href="#" className="hover:text-white transition-colors">Case Studies</a>
          <a href="#" className="hover:text-white transition-colors">Pricing</a>
          <button onClick={onEnterApp} className="rounded-full bg-white/10 px-5 py-2 hover:bg-white/20 transition-colors">Login</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-32 lg:pt-32 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          New: AI-Powered Grid Balancing Live
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1] animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
          Stop guessing. <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Start orchestrating.</span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-slate-400 mb-10 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-200">
          The first web-native platform that treats your campus as one intelligent organism. 
          Automate food, energy, and compute to hit lowest-carbon windows in real-time.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <button onClick={onEnterApp} className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-full bg-emerald-500 px-8 font-medium text-white transition-all hover:bg-emerald-600 hover:scale-105 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]">
                <span className="mr-2">Start Free Campus Pilot</span>
                <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={onEnterApp} className="inline-flex h-12 items-center justify-center rounded-full border border-slate-700 bg-slate-900/50 px-8 font-medium text-white transition-all hover:bg-slate-800 hover:border-slate-600">
                <PlayCircle className="mr-2 h-4 w-4 text-slate-400" />
                Live Demo
            </button>
        </div>

        {/* Globe/Pulse Visual Placeholder */}
        <div className="mt-20 relative mx-auto max-w-4xl h-[400px] w-full rounded-2xl border border-white/10 bg-slate-900/40 backdrop-blur-sm overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-1000 delay-500">
           <div className="absolute inset-0 flex items-center justify-center">
              {/* Abstract Globe representation */}
              <div className="relative h-64 w-64 rounded-full border border-emerald-500/20 bg-emerald-900/10 animate-pulse-slow flex items-center justify-center">
                 <div className="absolute h-48 w-48 rounded-full border border-teal-500/20 animate-spin-slow"></div>
                 <Globe className="h-32 w-32 text-emerald-500/50 animate-float" />
                 
                 {/* Satellites */}
                 <div className="absolute top-0 right-0 p-3 bg-slate-900 border border-emerald-500/30 rounded-lg shadow-lg transform translate-x-1/2 -translate-y-1/2">
                    <div className="text-[10px] text-slate-400">Carbon Intensity</div>
                    <div className="text-lg font-bold text-emerald-400">142g</div>
                 </div>
                 
                 <div className="absolute bottom-10 left-0 p-3 bg-slate-900 border border-teal-500/30 rounded-lg shadow-lg transform -translate-x-1/2">
                    <div className="text-[10px] text-slate-400">Compute Load</div>
                    <div className="text-lg font-bold text-teal-400">Optimized</div>
                 </div>
              </div>
           </div>
           
           {/* Grid overlay */}
           <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]"></div>
        </div>

        {/* Trust Bar */}
        <div className="mt-20 border-t border-white/5 pt-10">
          <p className="text-sm font-medium text-slate-500 mb-6">ALREADY TRUSTED BY 12 UNIVERSITIES SAVING 4,800 tCO₂e/YEAR</p>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
             {/* Mock Logos */}
             {['Stanford', 'MIT', 'Cambridge', 'ETH Zurich', 'Berkeley'].map(uni => (
               <span key={uni} className="text-xl font-display font-bold text-white">{uni}</span>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [isLandingPage, setIsLandingPage] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Use DataService to get initial stats from the CSVs
  const [stats, setStats] = useState(DataService.getInstance().getDashboardStats());
  const foodChartData = DataService.getInstance().getFoodChartData();

  // Simulate live data updates
  useEffect(() => {
    if (isLandingPage) return;
    
    const interval = setInterval(() => {
      // Re-fetch stats in case data was uploaded/changed
      const currentStats = DataService.getInstance().getDashboardStats();
      
      setStats(prev => ({
        ...currentStats,
        // Add subtle live fluctuation to intensity for demo purposes
        carbonIntensity: Math.max(80, Math.min(200, currentStats.carbonIntensity + (Math.random() - 0.5) * 5)),
      }));
    }, 5000); 

    return () => clearInterval(interval);
  }, [isLandingPage]);

  if (isLandingPage) {
    return <LandingPage onEnterApp={() => setIsLandingPage(false)} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard stats={stats} />;
      case 'copilot':
        return <AICopilot />;
      case 'upload':
        return <DataUpload />;
      case 'reviews':
        return <ReviewForm />;
      case 'food':
      case 'energy':
      case 'compute':
        // Reuse Dashboard concepts but fueled by ML suggestions
        const suggestions = DataService.getInstance().getMLInsights(activeTab);
        const prediction = DataService.getInstance().getPredictiveAnalysis(activeTab);

        return (
          <div className="space-y-6">
             <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Intelligence</h2>
                <button className="px-4 py-2 bg-emerald-500 rounded text-sm font-medium text-white">View Full Report</button>
             </div>
             
             {/* ML Prediction Banner */}
             <GlassCard className="bg-slate-900/60">
                <div className="flex items-center gap-6">
                    <div className="flex-1">
                        <p className="text-slate-400 text-sm mb-1">{prediction.label}</p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-4xl font-bold text-white">{prediction.value}</span>
                            <span className={`flex items-center text-sm font-medium ${
                                prediction.trend === 'decreasing' ? 'text-emerald-400' : 
                                prediction.trend === 'increasing' ? 'text-amber-400' : 'text-slate-400'
                            }`}>
                                {prediction.trend === 'decreasing' ? <TrendingDown className="h-4 w-4 mr-1" /> : 
                                 prediction.trend === 'increasing' ? <TrendingUp className="h-4 w-4 mr-1" /> : 
                                 <Minus className="h-4 w-4 mr-1" />}
                                {prediction.trend === 'increasing' ? 'Trending Up' : prediction.trend === 'decreasing' ? 'Trending Down' : 'Stable'}
                            </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">
                            Based on regression analysis of uploaded CSV data ({Math.round(prediction.confidence * 100)}% confidence).
                        </p>
                    </div>
                    <div className="hidden md:block h-16 w-px bg-white/10"></div>
                    <div className="flex-1 hidden md:block">
                        <p className="text-slate-400 text-sm mb-2">Automated Analysis</p>
                        <p className="text-slate-200 text-sm leading-relaxed">
                            The machine learning model has analyzed historical patterns and identified {suggestions.length} optimization opportunities. 
                            {suggestions.length > 0 && <span className="text-emerald-400 ml-1">Action recommended.</span>}
                        </p>
                    </div>
                </div>
             </GlassCard>

             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <GlassCard title="Historical Trends">
                    <div className="h-64 mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={foodChartData}>
                                <defs>
                                    <linearGradient id="colorVal" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="day" stroke="#64748b" />
                                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b' }} />
                                <Area type="monotone" dataKey={activeTab === 'food' ? 'waste' : 'actual'} stroke="#10b981" fillOpacity={1} fill="url(#colorVal)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>
                <GlassCard title="Algorithmic Suggestions">
                    <ul className="mt-4 space-y-3">
                        {suggestions.length > 0 ? suggestions.map((suggestion, index) => (
                            <li key={index} className="flex items-start justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-emerald-500/50 transition-colors cursor-pointer group">
                                <div className="flex gap-3">
                                    {suggestion.type === 'critical' ? <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5" /> : 
                                     suggestion.type === 'warning' ? <AlertTriangle className="h-5 w-5 text-amber-400 mt-0.5" /> : 
                                     <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5" />}
                                    <div>
                                        <span className="text-sm text-slate-200 block font-medium">{suggestion.action}</span>
                                        <span className="text-xs text-slate-500">{suggestion.reason}</span>
                                    </div>
                                </div>
                                <span className="text-xs font-bold text-emerald-400 whitespace-nowrap bg-emerald-500/10 px-2 py-1 rounded">{suggestion.impact}</span>
                            </li>
                        )) : (
                            <li className="text-center py-8 text-slate-500 text-sm">
                                No critical optimizations detected based on current thresholds.
                            </li>
                        )}
                    </ul>
                </GlassCard>
             </div>
          </div>
        );
      case 'settings':
        return (
            <GlassCard title="Platform Settings">
                <div className="space-y-6 mt-4 max-w-2xl">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Simulate Next Day</label>
                        <p className="text-xs text-slate-500 mb-3">For demo purposes: Advance the simulation clock by 24 hours.</p>
                        <button className="px-4 py-2 bg-slate-800 border border-slate-700 rounded text-slate-200 text-sm hover:bg-slate-700">Simulate +24h</button>
                    </div>
                    <div>
                         <label className="block text-sm font-medium text-slate-300 mb-2">User Role</label>
                         <select className="w-full bg-slate-900 border border-slate-700 text-slate-300 rounded p-2 text-sm focus:border-emerald-500 focus:outline-none">
                             <option>{UserRole.ADMIN}</option>
                             <option>{UserRole.SUSTAINABILITY}</option>
                             <option>{UserRole.IT}</option>
                             <option>{UserRole.CAFETERIA}</option>
                             <option>{UserRole.STUDENT}</option>
                         </select>
                    </div>
                    <div className="pt-4 border-t border-white/5">
                        <div className="flex items-center justify-between">
                            <span className="text-sm text-slate-300">Auto-Pilot Mode</span>
                            <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-emerald-500">
                                <span className="translate-x-6 inline-block h-4 w-4 transform rounded-full bg-white transition"/>
                            </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Allow AI to automatically execute high-confidence optimizations.</p>
                    </div>
                </div>
            </GlassCard>
        );
      default:
        return <div>Not found</div>;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-emerald-500/30">
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isSidebarOpen={isSidebarOpen} 
        setIsSidebarOpen={setIsSidebarOpen}
        role={UserRole.ADMIN}
      />
      
      <div className={`transition-all duration-300 ${isSidebarOpen ? 'lg:pl-64' : 'lg:pl-64'}`}>
        <Topbar 
            isSidebarOpen={isSidebarOpen} 
            setIsSidebarOpen={setIsSidebarOpen}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            role={UserRole.ADMIN}
        />
        
        <main className="p-4 lg:p-8 max-w-[1600px] mx-auto min-h-[calc(100vh-64px)]">
          {renderContent()}
        </main>
      </div>
    </div>
  );
};

export default App;
