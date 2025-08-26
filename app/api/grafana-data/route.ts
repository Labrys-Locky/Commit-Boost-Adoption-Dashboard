import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const now = Date.now();
    const threeMonthsAgo = now - (3 * 30 * 24 * 60 * 60 * 1000); // 3 months in milliseconds

    const response = await fetch(
      'https://sandy-grafana.ultrasound.money/api/public/dashboards/c84caba3d63e4058bfb139daac412b93/panels/1/query',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Origin': 'https://sandy-grafana.ultrasound.money',
          'Referer': 'https://sandy-grafana.ultrasound.money/public-dashboards/c84caba3d63e4058bfb139daac412b93?var-step=1d&from=now-6M&to=now&timezone=browser',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36'
        },
        body: JSON.stringify({
          intervalMs: 10800000,
          maxDataPoints: 1095,
          timeRange: {
            from: threeMonthsAgo.toString(),
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
    
    // Extract the time series data for all agents
    const frames = data.results?.A?.frames?.[0];
    if (frames?.data?.values) {
      const [timestamps, commitBoost, mevBoost, vouch] = frames.data.values;
      
      // Convert to chart-friendly format
      const chartData = timestamps.map((timestamp: number, index: number) => ({
        timestamp,
        date: new Date(timestamp).toLocaleDateString(),
        month: new Date(timestamp).toLocaleDateString('en-US', { month: 'short' }),
        'commit-boost': Math.round(commitBoost[index] * 1000) / 10, // Convert to percentage with 1 decimal
        'mev-boost': Math.round(mevBoost[index] * 1000) / 10,
        'vouch': Math.round(vouch[index] * 1000) / 10
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