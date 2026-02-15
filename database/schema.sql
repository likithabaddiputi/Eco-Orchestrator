-- =========================================================================================
-- CarbonSync (Eco-Orchestrator) Database Schema
-- Tech Stack: PostgreSQL
-- Purpose: Unify Food, Energy, and Compute data for AI Carbon Orchestration
-- =========================================================================================

-- Enable UUID extension if needed for future use (optional, keeping IDs as Integers per spec)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Helper Function for Auto-updating Timestamps
-- =========================================================================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- 2. Reference Data: Emission Factors
-- =========================================================================================
CREATE TABLE IF NOT EXISTS emission_factors (
    id SERIAL PRIMARY KEY,
    category VARCHAR(50) NOT NULL,
    emission_factor DECIMAL(10,4) NOT NULL, -- Storing as kg CO2e per unit
    type VARCHAR(20) NOT NULL, -- e.g., 'embedded', 'combustion', 'lifecycle'
    source VARCHAR(100),
    unit VARCHAR(20) DEFAULT 'kg' -- e.g., 'kg', 'kWh', 'hour'
);

-- Seed Emission Factors
INSERT INTO emission_factors (category, emission_factor, type, source, unit) VALUES
('beef', 60.0, 'embedded', 'IPCC 2021', 'kg'),
('vegetables', 0.4, 'embedded', 'IPCC 2021', 'kg'),
('electricity_grid_avg', 0.475, 'combustion', 'ElectricityMap', 'kWh'),
('nvidia_a100_active', 0.250, 'lifecycle', 'Manufacturer Spec', 'hour');


-- 3. Domain Table: Food Records
-- =========================================================================================
CREATE TABLE IF NOT EXISTS food_records (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    meal_type VARCHAR(50) NOT NULL, -- 'Breakfast', 'Lunch', 'Dinner'
    campus_location VARCHAR(100),
    servings_prepared INTEGER NOT NULL,
    servings_consumed INTEGER NOT NULL,
    waste_total_kg DECIMAL(10,2) NOT NULL,
    waste_by_category_json JSONB, -- e.g. {"beef": 10.5, "vegetables": 5.0}
    prep_start_time TIMESTAMP,
    prep_duration_minutes INTEGER,
    diverted_waste_kg DECIMAL(10,2) DEFAULT 0,
    notes TEXT,
    photo_url VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_food_date_meal ON food_records(date, meal_type);

CREATE TRIGGER update_food_records_modtime
BEFORE UPDATE ON food_records
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed Food Data
INSERT INTO food_records (date, meal_type, campus_location, servings_prepared, servings_consumed, waste_total_kg, waste_by_category_json, notes) VALUES
('2023-10-25', 'Lunch', 'Central Hall', 1500, 1420, 45.5, '{"beef": 12.5, "vegetables": 20.0, "grains": 13.0}', 'High attendance due to event.'),
('2023-10-25', 'Dinner', 'North Cafeteria', 800, 710, 32.0, '{"chicken": 10.0, "vegetables": 15.0, "dairy": 7.0}', 'Rainy weather impacted turnout.'),
('2023-10-26', 'Breakfast', 'Central Hall', 1200, 1180, 15.2, '{"fruit": 5.0, "bakery": 10.2}', 'Efficient service today.');


-- 4. Domain Table: Electricity Records
-- =========================================================================================
CREATE TABLE IF NOT EXISTS electricity_records (
    id SERIAL PRIMARY KEY,
    timestamp TIMESTAMP NOT NULL,
    location VARCHAR(100) NOT NULL,
    consumption_kwh DECIMAL(10,2) NOT NULL,
    end_use_category VARCHAR(50), -- 'HVAC', 'Lighting', 'Plug Load'
    grid_intensity DECIMAL(6,4), -- kg CO2e/kWh. Using (6,4) for precision (e.g., 0.4505)
    occupancy INTEGER,
    weather_temp_c DECIMAL(5,2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_elec_timestamp_loc ON electricity_records(timestamp, location);

CREATE TRIGGER update_electricity_records_modtime
BEFORE UPDATE ON electricity_records
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed Electricity Data
INSERT INTO electricity_records (timestamp, location, consumption_kwh, end_use_category, grid_intensity, weather_temp_c) VALUES
('2023-10-25 08:00:00', 'Science Block A', 450.25, 'HVAC', 0.150, 18.5),
('2023-10-25 09:00:00', 'Science Block A', 520.00, 'HVAC', 0.145, 19.2),
('2023-10-25 10:00:00', 'Library', 120.50, 'Lighting', 0.140, 20.0);


-- 5. Domain Table: Compute Records
-- =========================================================================================
CREATE TABLE IF NOT EXISTS compute_records (
    id SERIAL PRIMARY KEY,
    job_id VARCHAR(50) NOT NULL,
    start_timestamp TIMESTAMP NOT NULL,
    end_timestamp TIMESTAMP,
    duration_seconds INTEGER,
    energy_kwh DECIMAL(10,2) NOT NULL,
    hardware_type VARCHAR(50), -- 'NVIDIA A100', 'CPU Node'
    location_region VARCHAR(100) NOT NULL, -- 'us-east-1', 'on-prem-server-room-1'
    grid_intensity DECIMAL(6,4), -- kg CO2e/kWh
    functional_unit VARCHAR(50), -- 'epoch', 'inference_batch'
    embodied_emissions_kg DECIMAL(10,2), -- Pre-calculated share of hardware manufacturing
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_compute_start_job ON compute_records(start_timestamp, job_id);

CREATE TRIGGER update_compute_records_modtime
BEFORE UPDATE ON compute_records
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Seed Compute Data
INSERT INTO compute_records (job_id, start_timestamp, duration_seconds, energy_kwh, hardware_type, location_region, grid_intensity, embodied_emissions_kg) VALUES
('job_ai_train_001', '2023-10-25 02:00:00', 3600, 2.5, 'NVIDIA A100', 'on-prem-cluster', 0.050, 0.12),
('job_sim_bio_992', '2023-10-25 04:30:00', 7200, 5.0, 'CPU Node Cluster', 'on-prem-cluster', 0.048, 0.08),
('job_backup_daily', '2023-10-25 03:00:00', 1800, 0.8, 'Storage Server', 'cloud-region-1', 0.200, 0.01);


-- 6. Supporting Table: Forecasts (AI Predictions)
-- =========================================================================================
CREATE TABLE IF NOT EXISTS forecasts (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    domain VARCHAR(50) NOT NULL, -- 'food_demand', 'energy_peak', 'carbon_intensity'
    predicted_value JSONB NOT NULL, -- Flexible structure: { "08:00": 100, "09:00": 120 } or { "lunch_count": 1400 }
    confidence_score DECIMAL(5,2), -- 0.00 to 1.00 or percentage
    model_version VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Forecast Data
INSERT INTO forecasts (date, domain, predicted_value, confidence_score) VALUES
('2023-10-27', 'food_demand_lunch', '{"servings": 1350, "menu_item_risk": "beef_stew"}', 0.92),
('2023-10-27', 'energy_peak_intensity', '{"peak_time": "18:00", "max_intensity": 0.450}', 0.88);


-- 7. Supporting Table: Carbon Aggregates (Analytics)
-- =========================================================================================
CREATE TABLE IF NOT EXISTS carbon_aggregates (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    domain VARCHAR(20) NOT NULL, -- 'food', 'energy', 'compute'
    total_co2e_kg DECIMAL(10,2) NOT NULL,
    savings_kg DECIMAL(10,2) DEFAULT 0,
    generated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed Aggregate Data
INSERT INTO carbon_aggregates (date, domain, total_co2e_kg, savings_kg) VALUES
('2023-10-25', 'food', 1200.50, 45.0),
('2023-10-25', 'energy', 850.25, 120.0),
('2023-10-25', 'compute', 15.50, 5.0);


-- 8. Analytics View: Daily Campus Footprint
-- =========================================================================================
-- This view calculates the raw daily emissions by summing up records from all three domains.
-- Note: Simplified calculation logic for demonstration.

CREATE OR REPLACE VIEW view_daily_campus_emissions AS
SELECT
    dates.d AS date,
    COALESCE(food.daily_emissions, 0) AS food_kg_co2e,
    COALESCE(energy.daily_emissions, 0) AS energy_kg_co2e,
    COALESCE(compute.daily_emissions, 0) AS compute_kg_co2e,
    (COALESCE(food.daily_emissions, 0) + 
     COALESCE(energy.daily_emissions, 0) + 
     COALESCE(compute.daily_emissions, 0)) AS total_kg_co2e
FROM
    (SELECT DISTINCT date FROM food_records
     UNION SELECT DATE(timestamp) FROM electricity_records
     UNION SELECT DATE(start_timestamp) FROM compute_records) AS dates(d)
LEFT JOIN
    -- 1. Food Emissions: Sum of (Waste KG * Emission Factor of Category)
    -- Simplified approximation: Waste Total * Average Waste Factor (e.g. 2.5) for this demo view
    (SELECT date, SUM(waste_total_kg * 2.5) as daily_emissions 
     FROM food_records GROUP BY date) AS food ON dates.d = food.date
LEFT JOIN
    -- 2. Energy Emissions: Sum of (kWh * Grid Intensity)
    (SELECT DATE(timestamp) as date, SUM(consumption_kwh * grid_intensity) as daily_emissions 
     FROM electricity_records GROUP BY DATE(timestamp)) AS energy ON dates.d = energy.date
LEFT JOIN
    -- 3. Compute Emissions: Sum of (kWh * Grid Intensity) + Embodied (simplified)
    (SELECT DATE(start_timestamp) as date, 
            SUM((energy_kwh * COALESCE(grid_intensity, 0.475)) + COALESCE(embodied_emissions_kg, 0)) as daily_emissions 
     FROM compute_records GROUP BY DATE(start_timestamp)) AS compute ON dates.d = compute.date;

-- Example Query on View
-- SELECT * FROM view_daily_campus_emissions WHERE date = '2023-10-25';
