
export interface Campus {
  id: string;
  name: string;
  avatar: string;
  carbonScore: number;
}

export interface KPI {
  label: string;
  value: string;
  unit: string;
  trend: number[];
  color: 'cyan' | 'amber' | 'emerald';
}

export interface Meal {
  id: string;
  name: string;
  time: string;
  carbon: number;
  waste: number;
  type: 'breakfast' | 'lunch' | 'dinner';
}

export interface Workload {
  id: string;
  name: string;
  dept: string;
  type: 'training' | 'inference' | 'rendering';
  sci: number;
  status: 'running' | 'queued' | 'deferred';
}

export interface EnergyNode {
  id: string;
  name: string;
  usage: number;
  status: 'active' | 'optimized' | 'standby';
}

export interface AppState {
  currentCampus: Campus;
  totalSaved: number;
  gridIntensity: number;
  nextWindow: number; // seconds
}
