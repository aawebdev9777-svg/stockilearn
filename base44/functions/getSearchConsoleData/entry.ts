import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });
    if (user.role !== 'admin') return Response.json({ error: 'Forbidden' }, { status: 403 });

    const { accessToken } = await base44.asServiceRole.connectors.getConnection("google_search_console");

    // List verified sites
    const sitesRes = await fetch(
      'https://www.googleapis.com/webmasters/v3/sites',
      { headers: { 'Authorization': `Bearer ${accessToken}` } }
    );
    const sitesData = await sitesRes.json();

    if (!sitesData.siteEntry || sitesData.siteEntry.length === 0) {
      return Response.json({ sites: [], hasData: false });
    }

    // Prefer a verified site (siteOwner), matching stockilearn if available
    const verifiedSites = sitesData.siteEntry.filter(s => s.permissionLevel === 'siteOwner');
    const stockilearnSite = verifiedSites.find(s => s.siteUrl.includes('stockilearn'));
    const siteUrl = (stockilearnSite || verifiedSites[0] || sitesData.siteEntry[0]).siteUrl;
    const today = new Date();
    const start = new Date(today);
    start.setDate(start.getDate() - 28);

    // Search analytics: top queries
    const queriesRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: start.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0],
          dimensions: ['query'],
          rowLimit: 20,
        }),
      }
    );
    const queriesData = await queriesRes.json();

    // Search analytics: daily clicks/impressions
    const dailyRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: start.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0],
          dimensions: ['date'],
          rowLimit: 28,
        }),
      }
    );
    const dailyData = await dailyRes.json();

    // Search analytics: top pages
    const pagesRes = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(siteUrl)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: start.toISOString().split('T')[0],
          endDate: today.toISOString().split('T')[0],
          dimensions: ['page'],
          rowLimit: 10,
        }),
      }
    );
    const pagesData = await pagesRes.json();

    return Response.json({
      hasData: true,
      siteUrl,
      sites: sitesData.siteEntry,
      topQueries: queriesData.rows || [],
      daily: dailyData.rows || [],
      topPages: pagesData.rows || [],
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});