'use client';

import { PlayerHistory } from '@/lib/db';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

interface PlayerChartsProps {
  history: PlayerHistory[];
  playerName: string;
}

export default function PlayerCharts({ history, playerName }: PlayerChartsProps) {
  const reversedHistory = [...history].reverse();
  const chartData = reversedHistory.map((h, i) => ({
    name: i + 1,
    rating: h.rating,
    rank: h.rank
  }));

  const latest = history[0];
  const winLossData = [
    { name: 'Wins', value: latest.wins, color: '#2ecc71' },
    { name: 'Losses', value: latest.losses, color: '#e74c3c' }
  ];

  return (
    <div className="charts-container">
      <div className="chart-box">
        <h3>Rating History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" />
            <Tooltip 
              contentStyle={{ background: '#16213e', border: '1px solid #0f3460' }}
            />
            <Line 
              type="monotone" 
              dataKey="rating" 
              stroke="#7289da" 
              strokeWidth={2}
              dot={{ fill: '#7289da' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Rank History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#0f3460" />
            <XAxis dataKey="name" stroke="#888" />
            <YAxis stroke="#888" reversed />
            <Tooltip 
              contentStyle={{ background: '#16213e', border: '1px solid #0f3460' }}
            />
            <Line 
              type="monotone" 
              dataKey="rank" 
              stroke="#e74c3c" 
              strokeWidth={2}
              dot={{ fill: '#e74c3c' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="chart-box">
        <h3>Win/Loss Ratio</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={winLossData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {winLossData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ background: '#16213e', border: '1px solid #0f3460' }}
            />
          </PieChart>
        </ResponsiveContainer>
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <span style={{ marginRight: '2rem' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              background: '#2ecc71',
              borderRadius: '2px',
              marginRight: '0.5rem'
            }}></span>
            Wins: {latest.wins}
          </span>
          <span>
            <span style={{ 
              display: 'inline-block', 
              width: '12px', 
              height: '12px', 
              background: '#e74c3c',
              borderRadius: '2px',
              marginRight: '0.5rem'
            }}></span>
            Losses: {latest.losses}
          </span>
        </div>
      </div>
    </div>
  );
}