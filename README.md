# MKW Lounge Clone

A web application for tracking Mario Kart Wii competitive rankings and statistics, with Discord bot integration.

## Features

- **Leaderboard** - Browse all players with rankings, ratings, win/loss stats
- **Player Profiles** - View detailed player stats with interactive charts
- **Discord Bot Integration** - Receive player updates and match results via webhook
- **Search** - Find players by name
- **Responsive Design** - Works on desktop and mobile

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Database**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Styling**: CSS Modules

## Deployment

### 1. Set up Supabase

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to SQL Editor and run the contents of `supabase-schema.sql`
4. Go to Settings > API and copy:
   - Project URL (NEXT_PUBLIC_SUPABASE_URL)
   - Service Role Key (SUPABASE_SERVICE_ROLE_KEY)

### 2. Deploy to Vercel

1. Push this code to GitHub
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Add environment variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   API_KEY=your-secret-key (optional, for webhook auth)
   ```
4. Deploy!

### 3. Discord Bot Integration

Your Discord bot can send player updates and match results to:

```
POST https://your-app.vercel.app/api/webhooks/discord
Authorization: Bearer YOUR_API_KEY
Content-Type: application/json
```

#### Player Update:
```json
{
  "type": "player_update",
  "data": {
    "name": "PlayerName",
    "rank": 42,
    "rating": 1850.5,
    "wins": 150,
    "losses": 50
  }
}
```

#### Match Result:
```json
{
  "type": "match_result",
  "data": {
    "player1_name": "Player1",
    "player2_name": "Player2",
    "player1_score": 3,
    "player2_score": 1,
    "winner_name": "Player1"
  }
}
```

## Local Development

```bash
# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Edit .env with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL | Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key | Yes |
| `API_KEY` | Secret key for webhook authentication | No |

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint