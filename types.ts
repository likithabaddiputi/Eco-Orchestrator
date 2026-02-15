
export enum UserRole {
  ADMIN = 'Campus Admin',
  SUSTAINABILITY = 'Sustainability Officer',
  IT = 'IT Director',
  CAFETERIA = 'Cafeteria Manager',
  STUDENT = 'Student'
}

export enum Domain {
  FOOD = 'Food Intelligence',
  ENERGY = 'Energy Intelligence',
  COMPUTE = 'Compute Intelligence'
}

export interface Metric {
  label: string;
  value: string | number;
  unit?: string;
  change: number; // percentage
  trend: 'up' | 'down' | 'neutral';
}

export interface OrchestrationEvent {
  id: string;
  domain: Domain;
  action: string;
  impact: string;
  status: 'active' | 'completed' | 'pending';
  timestamp: string;
}

export interface CampusStats {
  carbonIntensity: number; // gCO2e/kWh
  carbonSavedToday: number; // kg
  sustainabilityScore: number; // 0-100
  activeOrchestrations: number;
}

// ML Types
export interface PredictionResult {
  label: string;
  value: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  confidence: number;
  nextValue: number;
}

export interface Suggestion {
  action: string;
  impact: string;
  type: 'critical' | 'warning' | 'optimization';
  reason: string;
}

// CSV Data Types

export interface ComputeRecord {
  id: string;
  job_id: string;
  start_timestamp: string;
  end_timestamp: string;
  duration_seconds: number;
  energy_kwh: number;
  hardware_type: string;
  location_region: string;
  grid_intensity: number;
  functional_unit: string;
  embodied_emissions_kg: number;
  notes: string;
}

export interface CarbonAggregate {
  id: string;
  date: string;
  domain: string;
  total_co2e_kg: number;
  savings_kg: number;
}

export interface ElectricityRecord {
  id: string;
  timestamp: string;
  location: string;
  consumption_kwh: number;
  end_use_category: string;
  grid_intensity: number;
  occupancy: number;
  weather_temp_c: number;
}

export interface EmissionFactor {
  id: string;
  category: string;
  emission_factor: number;
  type: string;
  source: string;
}

export interface FoodRecord {
  id: string;
  date: string;
  meal_type: string;
  campus_location: string;
  servings_prepared: number;
  servings_consumed: number;
  waste_total_kg: number;
  waste_by_category_json: string;
  prep_start_time: string;
  prep_duration_minutes: number;
  diverted_waste_kg: number;
}

export interface AppData {
  compute: ComputeRecord[];
  aggregates: CarbonAggregate[];
  energy: ElectricityRecord[];
  emissionFactors: EmissionFactor[];
  food: FoodRecord[];
}
