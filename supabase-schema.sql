-- Players table
CREATE TABLE IF NOT EXISTS players (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  rank INTEGER,
  rating REAL,
  wins INTEGER DEFAULT 0,
  losses INTEGER DEFAULT 0,
  last_updated TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Player history table (tracks rating/rank over time)
CREATE TABLE IF NOT EXISTS player_history (
  id SERIAL PRIMARY KEY,
  player_id INTEGER REFERENCES players(id) ON DELETE CASCADE,
  rank INTEGER,
  rating REAL,
  wins INTEGER,
  losses INTEGER,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Matches table
CREATE TABLE IF NOT EXISTS matches (
  id SERIAL PRIMARY KEY,
  player1_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
  player2_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
  player1_score INTEGER NOT NULL,
  player2_score INTEGER NOT NULL,
  winner_id INTEGER REFERENCES players(id) ON DELETE SET NULL,
  played_at TIMESTAMP WITH TIME ZONE,
  recorded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_players_rank ON players(rank);
CREATE INDEX IF NOT EXISTS idx_players_name ON players(name);
CREATE INDEX IF NOT EXISTS idx_player_history_player ON player_history(player_id);
CREATE INDEX IF NOT EXISTS idx_player_history_date ON player_history(recorded_at);
CREATE INDEX IF NOT EXISTS idx_matches_players ON matches(player1_id, player2_id);
CREATE INDEX IF NOT EXISTS idx_matches_date ON matches(played_at);

-- Row Level Security (optional, enable if needed)
-- ALTER TABLE players ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE player_history ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE matches ENABLE ROW LEVEL SECURITY;