import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const now = Date.now();
    const oneYearAgo = now - (365 * 24 * 60 * 60 * 1000); // 1 year in milliseconds

    // Updated data source (old sandy-grafana endpoint is no longer active)
    const response = await fetch(
      'https://rbx-prod-grafana.ultrasound.money/api/public/dashboards/c84caba3d63e4058bfb139daac412b93/panels/1/query',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://rbx-prod-grafana.ultrasound.money',
          'Referer': 'https://rbx-prod-grafana.ultrasound.money/public-dashboards/c84caba3d63e4058bfb139daac412b93?var-step=1d&from=now-1y&to=now&timezone=browser',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
          intervalMs: 86400000, // 1 day
          maxDataPoints: 366,
          timeRange: {
            from: oneYearAgo.toString(),
            to: now.toString(),
            timezone: 'browser'
          }
        })
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract the time series data (Grafana public dashboards return a frame with schema.fields + data.values)
    const frame = data.results?.A?.frames?.[0];
    if (frame?.data?.values && frame?.schema?.fields) {
      const fieldNames: string[] = frame.schema.fields.map((f: any) => f?.name).filter(Boolean);
      const values: any[][] = frame.data.values;

      const series: Record<string, any[]> = {};
      fieldNames.forEach((name, i) => {
        series[name] = values[i];
      });

      const timestamps: number[] = series['Time'] as number[];
      const commitBoost: (number | null)[] = (series['commit-boost'] || []) as (number | null)[];
      const mevBoost: (number | null)[] = (series['mev-boost'] || []) as (number | null)[];
      const vouch: (number | null)[] = (series['vouch'] || []) as (number | null)[];

      // Convert to chart-friendly format
      const chartData = timestamps.map((timestamp: number, index: number) => ({
        timestamp,
        date: new Date(timestamp).toLocaleDateString(),
        month: new Date(timestamp).toLocaleDateString('en-US', { month: 'short' }),
        'commit-boost': commitBoost[index] == null ? null : Math.round(commitBoost[index]! * 1000) / 10,
        'mev-boost': mevBoost[index] == null ? null : Math.round(mevBoost[index]! * 1000) / 10,
        'vouch': vouch[index] == null ? null : Math.round(vouch[index]! * 1000) / 10
      }));

      const latestIndex = timestamps.length - 1;
      const responseData = {
        chartData,
        latest: {
          timestamp: timestamps[latestIndex],
          agents: {
            'commit-boost': commitBoost[latestIndex],
            'mev-boost': mevBoost[latestIndex],
            'vouch': vouch[latestIndex]
          }
        },
        lastUpdated: new Date().toISOString()
      };

      return NextResponse.json(responseData);
    }
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching Grafana data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}