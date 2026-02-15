import { CampusStats, OrchestrationEvent, Domain } from './types';

export const INITIAL_STATS: CampusStats = {
  carbonIntensity: 142,
  carbonSavedToday: 1284,
  sustainabilityScore: 92,
  activeOrchestrations: 7
};

export const MOCK_ORCHESTRATIONS: OrchestrationEvent[] = [
  {
    id: '1',
    domain: Domain.COMPUTE,
    action: 'Shifted 4 HPC jobs to 02:00 AM window',
    impact: '-120kg CO₂e',
    status: 'active',
    timestamp: '10 mins ago'
  },
  {
    id: '2',
    domain: Domain.ENERGY,
    action: 'Reduced HVAC load in Science Block B',
    impact: '-45kg CO₂e',
    status: 'active',
    timestamp: '25 mins ago'
  },
  {
    id: '3',
    domain: Domain.FOOD,
    action: 'Adjusted cafeteria prep: -50 beef portions',
    impact: '-800kg CO₂e',
    status: 'completed',
    timestamp: '2 hours ago'
  }
];

export const CHART_DATA_ENERGY = [
  { time: '00:00', intensity: 120, forecast: 118 },
  { time: '04:00', intensity: 110, forecast: 105 },
  { time: '08:00', intensity: 165, forecast: 170 },
  { time: '12:00', intensity: 190, forecast: 185 },
  { time: '16:00', intensity: 150, forecast: 140 },
  { time: '20:00', intensity: 130, forecast: 125 },
  { time: '23:59', intensity: 115, forecast: 110 },
];

export const CHART_DATA_FOOD = [
  { day: 'Mon', demand: 1200, actual: 1150, waste: 50 },
  { day: 'Tue', demand: 1400, actual: 1380, waste: 20 },
  { day: 'Wed', demand: 1100, actual: 1200, waste: 100 },
  { day: 'Thu', demand: 1500, actual: 1450, waste: 50 },
  { day: 'Fri', demand: 1300, actual: 1280, waste: 20 },
  { day: 'Sat', demand: 800, actual: 750, waste: 50 },
  { day: 'Sun', demand: 700, actual: 700, waste: 0 },
];
