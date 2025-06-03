import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Define prop types
interface TeaCollectionChartProps {
  data: Array<{
    name: string;
    amount: number;
  }>;
  isLoading: boolean;
}

// Fallback data for when real data is loading
const fallbackData = [
  { name: 'May 1', amount: 75 },
  { name: 'May 2', amount: 82 },
  { name: 'May 3', amount: 65 },
  { name: 'May 4', amount: 78 },
  { name: 'May 5', amount: 90 },
  { name: 'May 6', amount: 85 },
  { name: 'May 7', amount: 72 },
  { name: 'May 8', amount: 80 },
  { name: 'May 9', amount: 88 },
  { name: 'May 10', amount: 79 },
  { name: 'May 11', amount: 83 },
  { name: 'May 12', amount: 76 },
  { name: 'May 13', amount: 81 },
  { name: 'May 14', amount: 74 },
];

const TeaCollectionChart = ({ data = [], isLoading = false }: TeaCollectionChartProps) => {
  // Use the provided data or fallback to sample data if data is empty
  const chartData = data.length > 0 ? data : fallbackData;
  
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Daily Tea Collection (kg)</h3>
        {isLoading && <p className="text-sm text-gray-500">Loading...</p>}
        <select className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-tea-light">
          <option>Last 14 days</option>
          <option>Last 30 days</option>
          <option>This month</option>
        </select>
      </div>
      
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 25 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
            <XAxis 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              dy={10}
            />
            <YAxis 
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, fill: '#6B7280' }}
              dx={-10}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '0.5rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
              }}
              itemStyle={{ color: '#4B5563', fontSize: 12 }}
              labelStyle={{ fontWeight: 'bold', color: '#111827', fontSize: 14, marginBottom: 4 }}
              formatter={(value) => [`${value} kg`, 'Collection']}
              cursor={{ fill: 'rgba(139, 195, 74, 0.1)' }}
            />
            <Bar 
              dataKey="amount" 
              fill="#4CAF50" 
              radius={[4, 4, 0, 0]} 
              barSize={40}
              animationDuration={1500}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TeaCollectionChart;
