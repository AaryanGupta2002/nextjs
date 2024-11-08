//Nextjs/corrtn/src/pages/api/calculateCorrelation.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { calculateCorrelation } from '../../utils/calculateCorrelation';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { company1, company2 } = req.body;  

  if (!company1 || !company2 || typeof company1 !== 'string' || typeof company2 !== 'string') {
    return res.status(400).json({ error: 'Invalid company names' });
  }

  try {
    const correlation = await calculateCorrelation(company1, company2);
    res.status(200).json({ correlation });
  } catch (error) {
    console.error("Error calculating correlation:", error);
    res.status(500).json({ error: 'Failed to calculate correlation' });
  }
}