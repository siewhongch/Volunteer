import type { Request, Response } from 'express';

export interface HealthResponse {
  status: 'healthy' | 'unhealthy';
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
}

/**
 * Serverless / Express handler for /api/health
 */
export default async function handler(req: Request | any, res: Response | any) {
  const healthData: HealthResponse = {
    status: 'healthy',
    service: 'high-school-volunteer-api',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    environment: process.env.NODE_ENV || 'development',
  };

  if (res && typeof res.status === 'function') {
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Cache-Control', 'no-store');
    return res.status(200).json(healthData);
  }

  // Web Standard Response fallback (e.g. edge / fetch runtime)
  return new Response(JSON.stringify(healthData), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store',
    },
  });
}
