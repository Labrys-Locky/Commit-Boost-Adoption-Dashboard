"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartDataPoint {
  timestamp: number;
  date: string;
  month: string;
  monthLabel?: string;
  'commit-boost': number;
  'mev-boost': number;
  'vouch': number;
}

interface AdoptionChartProps {
  data: ChartDataPoint[];
  loading?: boolean;
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-3 shadow-lg">
        <p className="text-white text-sm font-medium mb-2">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} style={{ color: entry.color }} className="text-sm">
            {entry.dataKey}: {entry.value.toFixed(1)}%
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function AdoptionChart({ data, loading }: AdoptionChartProps) {
  if (loading) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-white text-lg">Loading chart data...</div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="h-80 flex items-center justify-center">
        <div className="text-white text-lg">No data available</div>
      </div>
    );
  }

  // Process data to show each month label only once
  const processedData = data.map((item, index) => {
    const currentMonth = item.month;
    const prevMonth = index > 0 ? data[index - 1].month : null;
    
    return {
      ...item,
      monthLabel: currentMonth !== prevMonth ? currentMonth : ' ' // Space character for duplicate months
    };
  });
  
  const sampledData = processedData;

  return (
    <div className="h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={sampledData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis 
            dataKey="monthLabel" 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
            interval={0}
            tickLine={false}
          />
          <YAxis 
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
            domain={[0, 100]}
            tickFormatter={(value) => `${value}%`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend 
            wrapperStyle={{ color: 'rgba(255,255,255,0.8)' }}
          />
          <Line
            type="monotone"
            dataKey="commit-boost"
            stroke="#ffffff"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, stroke: '#ffffff', strokeWidth: 2 }}
            name="Commit-Boost"
          />
          <Line
            type="monotone"
            dataKey="mev-boost"
            stroke="#12036c"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, stroke: '#12036c', strokeWidth: 2 }}
            name="MEV-Boost"
          />
          <Line
            type="monotone"
            dataKey="vouch"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6, stroke: '#3b82f6', strokeWidth: 2 }}
            name="Vouch"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}