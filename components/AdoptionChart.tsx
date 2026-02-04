"use client"
import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ChartDataPoint {
  timestamp: number;
  date: string;
  month: string;
  monthLabel?: string;
  tickLabel?: string;
  'commit-boost': number | null;
  'mev-boost': number | null;
  'vouch': number | null;
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
        {payload
          .filter((entry: any) => entry?.value != null)
          .map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.dataKey}: {Number(entry.value).toFixed(1)}%
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

  // Process data to show each month label only once (used for tooltip label)
  const processedData = data.map((item, index) => {
    const currentMonth = item.month;
    const prevMonth = index > 0 ? data[index - 1].month : null;

    return {
      ...item,
      monthLabel: currentMonth !== prevMonth ? currentMonth : ' '
    };
  });

  const sampledData = processedData;

  // Reduce x-axis label density on small screens to prevent overlaps.
  // Instead of using a categorical axis (which can “bunch up” labels), use a time axis
  // with explicit ticks at month boundaries.
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 640px)');
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener?.('change', update);
    return () => mq.removeEventListener?.('change', update);
  }, []);

  const monthStartIndexes = sampledData
    .map((d, i) => ({ d, i }))
    .filter(({ d, i }) => i === 0 || d.month !== sampledData[i - 1].month);

  const desiredTicks = isMobile ? 6 : 12;
  const step = Math.max(1, Math.ceil(monthStartIndexes.length / desiredTicks));
  const tickIndexSet = new Set(monthStartIndexes.filter((_, i) => i % step === 0).map(({ i }) => i));

  const chartData = sampledData.map((d, i) => ({
    ...d,
    // Only show a month label at selected month boundaries; otherwise blank.
    tickLabel: tickIndexSet.has(i) ? d.month : ''
  }));

  return (
    <div className="h-64 sm:h-80 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 12,
            bottom: isMobile ? 36 : 20,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
          <XAxis
            dataKey="tickLabel"
            stroke="rgba(255,255,255,0.7)"
            fontSize={12}
            tick={{ fill: 'rgba(255,255,255,0.7)' }}
            interval={0}
            minTickGap={18}
            tickLine={false}
            angle={isMobile ? -30 : 0}
            textAnchor={isMobile ? 'end' : 'middle'}
            height={isMobile ? 42 : 30}
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