import type { Request, Response } from 'express';

export interface OneMapSearchResultItem {
  SEARCHVAL: string;
  BLK_NO: string;
  ROAD_NAME: string;
  BUILDING: string;
  ADDRESS: string;
  POSTAL: string;
  X: string;
  Y: string;
  LATITUDE: string;
  LONGITUDE: string;
}

export interface OneMapSearchResponse {
  found: number;
  totalNumPages: number;
  pageNum: number;
  results: OneMapSearchResultItem[];
  source?: string;
  query?: {
    searchVal: string;
    returnGeom: string;
    getAddrDetails: string;
    pageNum: number;
  };
}

/**
 * Serverless API handler that pulls live Singapore geospatial and postal data
 * from OneMap SG (onemap.gov.sg). No API key required for this service.
 *
 * Endpoint called:
 * GET https://www.onemap.gov.sg/api/common/elastic/search?searchVal=178903&returnGeom=Y&getAddrDetails=Y&pageNum=1
 */
export default async function handler(req: Request | any, res: Response | any) {
  // Enable CORS
  if (res && typeof res.setHeader === 'function') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  }

  // Handle preflight
  if (req?.method === 'OPTIONS') {
    if (res && typeof res.status === 'function') {
      return res.status(204).end();
    }
    return new Response(null, { status: 204 });
  }

  try {
    // Extract query parameters with fallbacks
    const urlObj = req?.url ? new URL(req.url, 'http://localhost') : null;
    const searchVal = 
      (req?.query?.searchVal as string) || 
      urlObj?.searchParams.get('searchVal') || 
      '178903';

    const returnGeom = 
      (req?.query?.returnGeom as string) || 
      urlObj?.searchParams.get('returnGeom') || 
      'Y';

    const getAddrDetails = 
      (req?.query?.getAddrDetails as string) || 
      urlObj?.searchParams.get('getAddrDetails') || 
      'Y';

    const pageNum = 
      (req?.query?.pageNum as string) || 
      urlObj?.searchParams.get('pageNum') || 
      '1';

    // Construct target OneMap SG URL
    const targetUrl = new URL('https://www.onemap.gov.sg/api/common/elastic/search');
    targetUrl.searchParams.set('searchVal', searchVal);
    targetUrl.searchParams.set('returnGeom', returnGeom);
    targetUrl.searchParams.set('getAddrDetails', getAddrDetails);
    targetUrl.searchParams.set('pageNum', pageNum);

    // Fetch live data from OneMap SG
    const response = await fetch(targetUrl.toString(), {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'HighSchoolVolunteer-Singapore/1.0',
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      const errorPayload = {
        error: 'Failed to fetch from OneMap SG',
        status: response.status,
        details: errorText,
      };

      if (res && typeof res.status === 'function') {
        return res.status(response.status).json(errorPayload);
      }
      return new Response(JSON.stringify(errorPayload), {
        status: response.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const rawData = await response.json();

    // OneMap public search may include an informational token string in "error"
    // while returning HTTP 200 and complete results. Separate it so it's not confused with a failure.
    const results = rawData.results || [];
    const found = typeof rawData.found === 'number' ? rawData.found : results.length;
    const tokenNotice = rawData.error;

    const payload = {
      found,
      totalNumPages: rawData.totalNumPages || 1,
      pageNum: rawData.pageNum || parseInt(pageNum, 10),
      results,
      ...(tokenNotice ? { notice: tokenNotice } : {}),
      source: 'https://www.onemap.gov.sg',
      query: {
        searchVal,
        returnGeom,
        getAddrDetails,
        pageNum: parseInt(pageNum, 10),
      },
      retrievedAt: new Date().toISOString(),
    };

    if (res && typeof res.status === 'function') {
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'public, max-age=300, stale-while-revalidate=600');
      return res.status(200).json(payload);
    }

    return new Response(JSON.stringify(payload), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300, stale-while-revalidate=600',
      },
    });
  } catch (error: any) {
    console.error('Error querying OneMap SG API:', error);
    const errorPayload = {
      error: 'Internal Server Error while communicating with OneMap SG',
      message: error?.message || String(error),
    };

    if (res && typeof res.status === 'function') {
      return res.status(500).json(errorPayload);
    }
    return new Response(JSON.stringify(errorPayload), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
