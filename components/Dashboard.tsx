
import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Zap, Leaf, Cpu, Wand2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { CampusStats } from '../types';
import { DataService } from '../services/DataService';
import { MOCK_ORCHESTRATIONS } from '../constants'; // Keeping orchestrations mock for UI demo unless we infer them from jobs

interface DashboardProps {
    stats: CampusStats;
}

export const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
    // Fetch live data from service
    const service = DataService.getInstance();
    const energyData = service.getEnergyPulseData();
    const foodData = service.getFoodChartData();
    const activeJobsCount = stats.activeOrchestrations;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* KPI Bar */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                <GlassCard className="bg-gradient-to-br from-slate-900 to-slate-900/50">
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-400">Carbon Intensity</p>
                            <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{stats.carbonIntensity} <span className="text-base font-normal text-slate-500">gCO₂e/kWh</span></h3>
                        </div>
                        <div className={`rounded-full p-2 ${stats.carbonIntensity < 500 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                            <Zap className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-400">
                        <span className="flex items-center text-emerald-400 mr-2">
                            <ArrowDownRight className="mr-1 h-3 w-3" />
                            12%
                        </span>
                        vs last hour
                    </div>
                    {/* Live indicator */}
                     <div className="mt-3 h-1 w-full rounded-full bg-slate-800">
                        <div className="h-1 rounded-full bg-emerald-500 transition-all duration-1000" style={{ width: '40%' }}></div>
                    </div>
                </GlassCard>

                <GlassCard>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-400">Carbon Saved Today</p>
                            <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{stats.carbonSavedToday} <span className="text-base font-normal text-slate-500">kg</span></h3>
                        </div>
                        <div className="rounded-full bg-teal-500/20 p-2 text-teal-400">
                            <Leaf className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex items-center text-xs text-slate-400">
                         <span className="flex items-center text-emerald-400 mr-2">
                            <ArrowUpRight className="mr-1 h-3 w-3" />
                            37%
                        </span>
                        vs yesterday
                    </div>
                </GlassCard>

                <GlassCard>
                    <div className="flex items-start justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-400">Sustainability Score</p>
                            <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{stats.sustainabilityScore}<span className="text-base text-slate-500">/100</span></h3>
                        </div>
                        <div className="rounded-full bg-indigo-500/20 p-2 text-indigo-400">
                            <Cpu className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4 h-8 w-full">
                         {/* Sparkline simulation */}
                         <div className="flex items-end h-full gap-1">
                            {[40, 60, 45, 70, 85, 92, 88].map((h, i) => (
                                <div key={i} className="bg-emerald-500/50 w-full rounded-t-sm hover:bg-emerald-400 transition-colors" style={{ height: `${h}%` }}></div>
                            ))}
                         </div>
                    </div>
                </GlassCard>

                <GlassCard className="relative overflow-hidden group">
                     <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/20 blur-2xl transition-all group-hover:bg-emerald-500/30"></div>
                    <div className="flex items-start justify-between relative z-10">
                        <div>
                            <p className="text-sm font-medium text-slate-400">Active Orchestrations</p>
                            <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">{stats.activeOrchestrations}</h3>
                        </div>
                        <div className="rounded-full bg-sky-500/20 p-2 text-sky-400 animate-pulse">
                            <Wand2 className="h-5 w-5" />
                        </div>
                    </div>
                    <div className="mt-4 flex flex-col gap-2 relative z-10">
                       <button className="w-full rounded-lg bg-emerald-500 py-1.5 text-xs font-semibold text-white shadow-lg shadow-emerald-500/20 transition-transform hover:scale-105 active:scale-95">
                          Orchestrate Now
                       </button>
                    </div>
                </GlassCard>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                
                {/* A. Carbon Pulse (Large Chart) */}
                <GlassCard className="lg:col-span-2 min-h-[400px]" title="Campus Carbon Pulse (Live Grid Data)">
                    <div className="h-[350px] w-full mt-4">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={energyData}>
                                <defs>
                                    <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                                <XAxis dataKey="time" stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} interval={4} />
                                <YAxis stroke="#64748b" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#1e293b', color: '#f8fafc' }}
                                    itemStyle={{ color: '#10b981' }}
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="intensity" 
                                    name="Actual (gCO2e)"
                                    stroke="#10b981" 
                                    strokeWidth={3}
                                    fillOpacity={1} 
                                    fill="url(#colorIntensity)" 
                                />
                                <Area 
                                    type="monotone" 
                                    dataKey="forecast" 
                                    name="Forecast"
                                    stroke="#6366f1" 
                                    strokeDasharray="5 5"
                                    strokeWidth={2}
                                    fill="transparent"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </GlassCard>

                {/* D. Active Orchestrations Feed */}
                <GlassCard title="Live Orchestration Feed" className="lg:col-span-1">
                    <div className="mt-4 space-y-4">
                        {MOCK_ORCHESTRATIONS.map((event) => (
                            <div key={event.id} className="relative flex gap-4 rounded-lg border border-white/5 bg-white/5 p-3 transition-colors hover:bg-white/10">
                                <div className={`absolute left-0 top-0 bottom-0 w-1 rounded-l-lg ${
                                    event.domain === 'Compute Intelligence' ? 'bg-indigo-500' :
                                    event.domain === 'Food Intelligence' ? 'bg-teal-500' : 'bg-emerald-500'
                                }`}></div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between">
                                        <span className="text-xs font-medium text-slate-400">{event.domain}</span>
                                        <span className="text-[10px] text-slate-500">{event.timestamp}</span>
                                    </div>
                                    <p className="mt-1 text-sm font-medium text-slate-200">{event.action}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-400">
                                            {event.impact}
                                        </span>
                                        <span className="text-[10px] uppercase tracking-wider text-slate-500">{event.status}</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className="w-full text-center text-xs text-slate-500 hover:text-emerald-400 mt-4">View All Activity</button>
                    </div>
                </GlassCard>
            </div>

            {/* Domain Specific Previews */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                <GlassCard title="Food Intelligence">
                    <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-4">
                             <span className="text-slate-400">Demand vs Waste</span>
                             <span className="text-red-400 font-bold">18kg waste today</span>
                        </div>
                        <div className="h-32">
                             <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={foodData}>
                                    <Bar dataKey="demand" fill="#14b8a6" radius={[4, 4, 0, 0]} name="Meals Prepared" />
                                    <Bar dataKey="waste" fill="#f43f5e" radius={[4, 4, 0, 0]} name="Waste (Scaled)" />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                        <p className="mt-4 text-xs text-slate-400 italic">"Switching Thursday's menu to plant-based could save 400kg CO₂e."</p>
                    </div>
                </GlassCard>

                <GlassCard title="Energy Intelligence">
                     <div className="mt-4 space-y-4">
                        <div className="flex justify-between items-center bg-white/5 p-3 rounded-lg">
                            <div className="flex items-center gap-2">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                <span className="text-sm text-slate-200">Green Window</span>
                            </div>
                            <span className="text-xs text-emerald-400 font-mono">NOW - 14:00</span>
                        </div>
                        <div className="space-y-2">
                            <p className="text-xs text-slate-500">Shiftable Load Available:</p>
                            <div className="flex gap-2">
                                <button className="flex-1 py-2 rounded border border-slate-700 hover:border-emerald-500 hover:text-emerald-400 text-xs text-slate-400 transition-all">
                                    EV Chargers
                                </button>
                                <button className="flex-1 py-2 rounded border border-slate-700 hover:border-emerald-500 hover:text-emerald-400 text-xs text-slate-400 transition-all">
                                    HVAC
                                </button>
                            </div>
                        </div>
                     </div>
                </GlassCard>

                <GlassCard title="Compute Intelligence">
                     <div className="mt-4">
                        <div className="flex justify-between items-end mb-2">
                            <span className="text-sm text-slate-400">SCI Score</span>
                            <span className="text-2xl font-bold text-white">94<span className="text-xs text-slate-500 font-normal">/100</span></span>
                        </div>
                        <div className="w-full bg-slate-800 rounded-full h-2 mb-4">
                            <div className="bg-indigo-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                        <div className="bg-slate-900/50 p-3 rounded border border-white/5">
                            <div className="flex justify-between text-xs text-slate-300 mb-1">
                                <span>Pending Jobs</span>
                                <span>{activeJobsCount + 4}</span>
                            </div>
                            <div className="flex justify-between text-xs text-slate-300">
                                <span>Active Cluster</span>
                                <span className="text-emerald-400">{activeJobsCount} Jobs</span>
                            </div>
                        </div>
                        <button className="mt-3 w-full text-xs text-indigo-400 hover:text-indigo-300">View Scheduler &rarr;</button>
                     </div>
                </GlassCard>
            </div>
        </div>
    );
};
