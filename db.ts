import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl || 'https://placeholder.supabase.co', supabaseKey || 'placeholder-key');

export interface Player {
  id: number;
  name: string;
  rank: number | null;
  rating: number | null;
  wins: number;
  losses: number;
  last_updated: string;
}

export interface PlayerHistory {
  id: number;
  player_id: number;
  rank: number | null;
  rating: number | null;
  wins: number;
  losses: number;
  recorded_at: string;
}

export interface Match {
  id: number;
  player1_id: number;
  player2_id: number;
  player1_score: number;
  player2_score: number;
  winner_id: number | null;
  played_at: string;
  recorded_at: string;
}

export async function getPlayers(limit: number = 100, offset: number = 0, search?: string): Promise<Player[]> {
  let query = supabase
    .from('players')
    .select('*')
    .not('rank', 'is', null)
    .order('rank', { ascending: true })
    .range(offset, offset + limit - 1);

  if (search) {
    query = query.ilike('name', `%${search}%`);
  }

  const { data, error } = await query;
  
  if (error) throw error;
  return data || [];
}

export async function getPlayerById(id: number): Promise<Player | null> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('id', id)
    .single();
  
  if (error) return null;
  return data;
}

export async function getPlayerByName(name: string): Promise<Player | null> {
  const { data, error } = await supabase
    .from('players')
    .select('*')
    .eq('name', name)
    .single();
  
  if (error) return null;
  return data;
}

export async function getPlayerHistory(playerId: number, limit: number = 30): Promise<PlayerHistory[]> {
  const { data, error } = await supabase
    .from('player_history')
    .select('*')
    .eq('player_id', playerId)
    .order('recorded_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}

export async function getTotalPlayersCount(): Promise<number> {
  const { count, error } = await supabase
    .from('players')
    .select('*', { count: 'exact', head: true })
    .not('rank', 'is', null);
  
  if (error) throw error;
  return count || 0;
}

export async function upsertPlayer(player: Omit<Player, 'id' | 'last_updated'>): Promise<Player> {
  const { data, error } = await supabase
    .from('players')
    .upsert({
      name: player.name,
      rank: player.rank,
      rating: player.rating,
      wins: player.wins,
      losses: player.losses
    }, { onConflict: 'name' })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function insertPlayerHistory(playerId: number, history: Omit<PlayerHistory, 'id' | 'player_id' | 'recorded_at'>): Promise<void> {
  const { error } = await supabase
    .from('player_history')
    .insert({
      player_id: playerId,
      rank: history.rank,
      rating: history.rating,
      wins: history.wins,
      losses: history.losses
    });
  
  if (error) throw error;
}

export async function insertMatch(match: Omit<Match, 'id' | 'recorded_at'>): Promise<Match> {
  const { data, error } = await supabase
    .from('matches')
    .insert({
      player1_id: match.player1_id,
      player2_id: match.player2_id,
      player1_score: match.player1_score,
      player2_score: match.player2_score,
      winner_id: match.winner_id,
      played_at: match.played_at
    })
    .select()
    .single();
  
  if (error) throw error;
  return data;
}

export async function getMatches(limit: number = 50, offset: number = 0): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .order('played_at', { ascending: false })
    .range(offset, offset + limit - 1);
  
  if (error) throw error;
  return data || [];
}

export async function getPlayerMatches(playerId: number, limit: number = 20): Promise<Match[]> {
  const { data, error } = await supabase
    .from('matches')
    .select('*')
    .or(`player1_id.eq.${playerId},player2_id.eq.${playerId}`)
    .order('played_at', { ascending: false })
    .limit(limit);
  
  if (error) throw error;
  return data || [];
}