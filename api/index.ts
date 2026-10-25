import type { Request, Response } from 'express';

export default async function handler(req: Request | any, res: Response | any) {
  const routes = {
    name: 'High School Volunteer Singapore API',
    endpoints: [
      {
        path: '/api/health',
        method: 'GET',
        description: 'Serverless health check endpoint',
      },
      {
        path: '/api/onemap',
        method: 'GET',
        description: 'Pulls live geospatial and address data from OneMap SG (no key required)',
        defaultQuery: 'https://www.onemap.gov.sg/api/common/elastic/search?searchVal=178903&returnGeom=Y&getAddrDetails=Y&pageNum=1',
        params: {
          searchVal: 'Postal code or address string (default: 178903)',
          returnGeom: 'Y / N (default: Y)',
          getAddrDetails: 'Y / N (default: Y)',
          pageNum: 'Page number (default: 1)',
        },
      },
    ],
    documentation: 'https://www.onemap.gov.sg/apidocs/',
  };

  if (res && typeof res.status === 'function') {
    res.setHeader('Content-Type', 'application/json');
    return res.status(200).json(routes);
  }

  return new Response(JSON.stringify(routes), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}
