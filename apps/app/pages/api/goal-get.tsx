import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';

export const GetGoalById = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    // if not get, return 405
    if (req.method !== 'GET') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

    const goal_id =
      typeof req.query.goal_id === 'string'
        ? req.query.goal_id
        : req.query.goal_id[0];

    // if any of the required fields are missing, return 400
    if (!goal_id) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const goal = await sql`
        SELECT * FROM goal
        WHERE goal_id = ${goal_id}
        `;

    res.status(200).json({ goal: goal.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
};

export default GetGoalById;
