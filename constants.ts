
import { Campus, KPI } from './types';

export const COLORS = {
  forest: '#0A3D2F',
  cyan: '#00F5FF',
  amber: '#FFB300',
  emerald: '#10B981',
  slate: '#64748B',
};

export const CAMPUSES: Campus[] = [
  { id: '1', name: 'Greenville University', avatar: 'https://picsum.photos/seed/gv/100/100', carbonScore: 92 },
  { id: '2', name: 'Emerald Tech', avatar: 'https://picsum.photos/seed/et/100/100', carbonScore: 84 },
  { id: '3', name: 'Lotus Institute', avatar: 'https://picsum.photos/seed/li/100/100', carbonScore: 88 },
];

export const INITIAL_KPIS: KPI[] = [
  { label: 'Real-time Intensity', value: '242', unit: 'gCO₂e/kWh', trend: [250, 248, 245, 242, 244, 242], color: 'cyan' },
  { label: 'Current Load', value: '1.2', unit: 'MW', trend: [1.1, 1.3, 1.2, 1.25, 1.2, 1.2], color: 'amber' },
  { label: 'Carbon Savings', value: '184', unit: 'Tons', trend: [170, 175, 178, 180, 182, 184], color: 'emerald' },
  { label: 'Active Sensors', value: '47', unit: 'Live', trend: [47, 47, 47, 47, 47, 47], color: 'cyan' },
];

export const MOCK_MEALS = [
  { id: 'm1', name: 'Standard Breakfast', time: '07:00', carbon: 4.2, waste: 12, type: 'breakfast' },
  { id: 'm2', name: 'Executive Lunch', time: '12:30', carbon: 8.5, waste: 24, type: 'lunch' },
  { id: 'm3', name: 'Campus Dinner', time: '19:00', carbon: 6.8, waste: 18, type: 'dinner' },
];

export const MOCK_WORKLOADS = [
  { id: 'w1', name: 'LLM Fine-tuning', dept: 'CS', type: 'training', sci: 0.85, status: 'running' },
  { id: 'w2', name: 'Campus Analytics', dept: 'Admin', type: 'inference', sci: 0.12, status: 'queued' },
  { id: 'w3', name: '3D Render Farm', dept: 'Arts', type: 'rendering', sci: 1.42, status: 'deferred' },
];
