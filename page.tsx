import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <div className="container">
        <h1>Welcome to MKW Lounge Clone</h1>
        <p style={{ marginBottom: '2rem', color: '#888' }}>
          Track Mario Kart Wii competitive rankings and statistics
        </p>
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/leaderboard" className="search-form button" style={{ 
            display: 'inline-block', 
            padding: '1rem 2rem', 
            background: '#7289da', 
            borderRadius: '8px',
            textAlign: 'center',
            textDecoration: 'none',
            color: 'white',
            fontWeight: '600'
          }}>
            View Leaderboard
          </Link>
        </div>
      </div>
    </main>
  );
}