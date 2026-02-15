
import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { DataService } from '../services/DataService';
import { Domain, AppData } from '../types';

export const DataUpload: React.FC = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedDomain, setSelectedDomain] = useState<keyof AppData>('compute');
    const [uploadStatus, setUploadStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [fileName, setFileName] = useState('');

    const handleDrag = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') {
            setDragActive(true);
        } else if (e.type === 'dragleave') {
            setDragActive(false);
        }
    };

    const processFile = (file: File) => {
        if (file && file.type === 'text/csv') {
            setFileName(file.name);
            const reader = new FileReader();
            reader.onload = (e) => {
                const text = e.target?.result as string;
                try {
                    DataService.getInstance().appendData(selectedDomain, text);
                    setUploadStatus('success');
                    setTimeout(() => setUploadStatus('idle'), 3000);
                } catch (err) {
                    console.error(err);
                    setUploadStatus('error');
                }
            };
            reader.readAsText(file);
        } else {
            setUploadStatus('error');
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white">Data Integration</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <GlassCard className="md:col-span-2">
                    <h3 className="text-lg font-medium text-white mb-4">Upload Historical CSV Data</h3>
                    
                    <div className="mb-6">
                        <label className="block text-sm font-medium text-slate-300 mb-2">Select Data Domain</label>
                        <select 
                            value={selectedDomain} 
                            onChange={(e) => setSelectedDomain(e.target.value as keyof AppData)}
                            className="w-full bg-slate-950 border border-slate-700 text-slate-200 rounded-lg p-3 focus:border-emerald-500 focus:outline-none"
                        >
                            <option value="compute">Compute Records (Jobs)</option>
                            <option value="energy">Energy Records (Electricity)</option>
                            <option value="food">Food Records (Waste Logs)</option>
                            <option value="aggregates">Carbon Aggregates</option>
                        </select>
                    </div>

                    <div 
                        className={`relative border-2 border-dashed rounded-xl p-10 text-center transition-all ${
                            dragActive ? 'border-emerald-500 bg-emerald-500/10' : 'border-slate-700 hover:border-slate-500 bg-slate-900/50'
                        }`}
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                    >
                        <input 
                            type="file" 
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                            accept=".csv"
                            onChange={handleChange}
                        />
                        
                        {uploadStatus === 'success' ? (
                            <div className="flex flex-col items-center text-emerald-400 animate-in fade-in zoom-in">
                                <CheckCircle className="h-12 w-12 mb-3" />
                                <p className="font-medium">Data Successfully Ingested</p>
                                <p className="text-sm opacity-75">{fileName}</p>
                            </div>
                        ) : uploadStatus === 'error' ? (
                             <div className="flex flex-col items-center text-red-400 animate-in fade-in zoom-in">
                                <AlertCircle className="h-12 w-12 mb-3" />
                                <p className="font-medium">Upload Failed</p>
                                <p className="text-sm opacity-75">Please ensure file is valid CSV.</p>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center text-slate-400">
                                <Upload className="h-12 w-12 mb-3 text-slate-500" />
                                <p className="font-medium text-slate-200">Drag & drop CSV file here</p>
                                <p className="text-sm mt-1">or click to browse</p>
                                <p className="text-xs mt-4 text-slate-600">Expected Format: Standard CSV headers matching database schema</p>
                            </div>
                        )}
                    </div>
                </GlassCard>

                <div className="space-y-6">
                    <GlassCard title="Schema Reference">
                        <div className="space-y-4 mt-2">
                             <div className="p-3 rounded bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm font-medium text-white">Compute</span>
                                </div>
                                <code className="text-[10px] text-slate-400 block font-mono">id, job_id, start_timestamp, energy_kwh, hardware_type...</code>
                             </div>
                             <div className="p-3 rounded bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm font-medium text-white">Energy</span>
                                </div>
                                <code className="text-[10px] text-slate-400 block font-mono">id, timestamp, location, consumption_kwh, grid_intensity...</code>
                             </div>
                             <div className="p-3 rounded bg-white/5 border border-white/5">
                                <div className="flex items-center gap-2 mb-2">
                                    <FileText className="h-4 w-4 text-emerald-400" />
                                    <span className="text-sm font-medium text-white">Food</span>
                                </div>
                                <code className="text-[10px] text-slate-400 block font-mono">id, date, meal_type, servings_prepared, waste_total_kg...</code>
                             </div>
                        </div>
                    </GlassCard>
                </div>
            </div>
        </div>
    );
};
