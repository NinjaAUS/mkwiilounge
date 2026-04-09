import Link from 'next/link';
import { Player } from '@/lib/db';

interface PlayerTableProps {
  players: Player[];
}

export default function PlayerTable({ players }: PlayerTableProps) {
  if (players.length === 0) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>No players found. Run the scraper first.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Rank</th>
          <th>Player</th>
          <th>Rating</th>
          <th>Wins</th>
          <th>Losses</th>
          <th>Win Rate</th>
        </tr>
      </thead>
      <tbody>
        {players.map((player) => (
          <tr key={player.id}>
            <td>
              {player.rank !== null ? (
                <span style={{
                  background: getRankColor(player.rank),
                  padding: '0.25rem 0.5rem',
                  borderRadius: '4px',
                  fontWeight: '600'
                }}>
                  #{player.rank}
                </span>
              ) : 'Unranked'}
            </td>
            <td>
              <Link href={`/player/${player.id}`}>
                {player.name}
              </Link>
            </td>
            <td>{player.rating?.toFixed(2) || 'N/A'}</td>
            <td style={{ color: '#2ecc71' }}>{player.wins}</td>
            <td style={{ color: '#e74c3c' }}>{player.losses}</td>
            <td>
              {player.wins + player.losses > 0 
                ? ((player.wins / (player.wins + player.losses)) * 100).toFixed(1) + '%'
                : 'N/A'
              }
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function getRankColor(rank: number): string {
  if (rank === 1) return '#FFD700';
  if (rank === 2) return '#C0C0C0';
  if (rank === 3) return '#CD7F32';
  if (rank <= 10) return '#7289da';
  return 'transparent';
}