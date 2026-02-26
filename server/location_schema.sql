-- States
CREATE TABLE IF NOT EXISTS states (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL UNIQUE
);

-- Districts
CREATE TABLE IF NOT EXISTS districts (
  id SERIAL PRIMARY KEY,
  state_id INTEGER REFERENCES states(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL
);

-- Constituencies (Treated as "City" in UI)
CREATE TABLE IF NOT EXISTS constituencies (
  id SERIAL PRIMARY KEY,
  district_id INTEGER REFERENCES districts(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL
);

-- Mandals
CREATE TABLE IF NOT EXISTS mandals (
  id SERIAL PRIMARY KEY,
  constituency_id INTEGER REFERENCES constituencies(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL
);

-- Villages
CREATE TABLE IF NOT EXISTS villages (
  id SERIAL PRIMARY KEY,
  mandal_id INTEGER REFERENCES mandals(id) ON DELETE CASCADE,
  name VARCHAR(100) NOT NULL
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_districts_state ON districts(state_id);
CREATE INDEX IF NOT EXISTS idx_constituencies_district ON constituencies(district_id);
CREATE INDEX IF NOT EXISTS idx_mandals_constituency ON mandals(constituency_id);
CREATE INDEX IF NOT EXISTS idx_villages_mandal ON villages(mandal_id);
