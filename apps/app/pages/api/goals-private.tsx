import { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import jwt from 'jsonwebtoken';

export const goalsPrivate = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { token } = JSON.parse(req.body);

    if (!token) {
      console.log('no token');
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);

    const userByEmail =
      await sql`SELECT * FROM "user" WHERE email = ${decoded.email}`;

    if (!userByEmail.rowCount) {
      res.status(400).json({ error: 'User not found' });
      return;
    }

    const userId = userByEmail.rows[0].user_id;

    const goals = await sql`SELECT * FROM goal WHERE user_id = ${userId}`;

    res.status(200).json(goals.rows);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default goalsPrivate;
