import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_analytics");

    // List available GA4 properties via Admin API
    const propertiesRes = await fetch(
      'https://analyticsadmin.googleapis.com/v1beta/accountSummaries?page_size=50',
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    const propertiesData = await propertiesRes.json();

    if (!propertiesData.accountSummaries || propertiesData.accountSummaries.length === 0) {
      return Response.json({ properties: [], hasData: false });
    }

    // Flatten all properties from all accounts
    const allProperties = propertiesData.accountSummaries.flatMap(a => a.propertySummaries || []);
    if (allProperties.length === 0) {
      return Response.json({ properties: [], hasData: false });
    }

    const property = allProperties[0];
    const propertyId = property.property.split('/')[1];

    // Query last 28 days of traffic data
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 28);

    const reportRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: start.toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] }],
          dimensions: [{ name: 'date' }],
          metrics: [
            { name: 'sessions' },
            { name: 'totalUsers' },
            { name: 'screenPageViews' },
            { name: 'averageSessionDuration' },
          ],
          orderBys: [{ dimension: { dimensionName: 'date' }, desc: false }],
        }),
      }
    );
    const reportData = await reportRes.json();

    // Get top pages
    const pagesRes = await fetch(
      `https://analyticsdata.googleapis.com/v1beta/properties/${propertyId}:runReport`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dateRanges: [{ startDate: start.toISOString().split('T')[0], endDate: today.toISOString().split('T')[0] }],
          dimensions: [{ name: 'pagePath' }],
          metrics: [{ name: 'screenPageViews' }],
          orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
          limit: 10,
        }),
      }
    );
    const pagesData = await pagesRes.json();

    return Response.json({
      hasData: true,
      propertyName: property.displayName,
      propertyId,
      rows: reportData.rows || [],
      totals: reportData.totals || [],
      topPages: pagesData.rows || [],
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});