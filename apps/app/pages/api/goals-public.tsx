import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export const goalsPublic = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const goals = await sql`SELECT * FROM goal WHERE is_public = true`;
    res.status(200).json(goals.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default goalsPublic;