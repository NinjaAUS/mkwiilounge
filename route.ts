import { NextRequest, NextResponse } from 'next/server';
import { getPlayers, getTotalPlayersCount } from '@/lib/db';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = parseInt(searchParams.get('page') || '1');
  const limit = parseInt(searchParams.get('limit') || '50');
  const search = searchParams.get('search') || undefined;
  
  const offset = (page - 1) * limit;
  
  const [players, total] = await Promise.all([
    getPlayers(limit, offset, search),
    getTotalPlayersCount()
  ]);
  
  return NextResponse.json({
    players,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit)
    }
  });
}