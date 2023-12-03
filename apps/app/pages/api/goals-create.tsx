import type { NextApiRequest, NextApiResponse } from 'next';
import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import { sendIndividualEmail, NewGoalTemplate } from '../../service';

export const SendGoal = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // if not post, return 405
    if (req.method !== 'POST') {
      res.status(405).json({ message: 'Method not allowed' });
      return;
    }

    const body = JSON.parse(req.body);
    const email = body.email;
    const goal = body.goal;
    const dueDate = body.dueDate;
    const notes = body.notes;
    const darumaDescription = body.daruma;
    const darumaColor = body.color;
    const isPublic = body?.isPublic || true;

    // if any of the required fields are missing, return 400
    if (!email || !goal || !dueDate || !darumaDescription) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // add to sql
    const goalUUID = uuidv4(); // TODO: Move to db for auto generation
    const userIdRows =
      await sql`SELECT user_id FROM "user" WHERE "email" = ${email}`;

    if (!userIdRows.rowCount) {
      res.status(400).json({ error: 'Invalid user' });
      return;
    }

    const userId = userIdRows.rows[0].user_id;

    const goalResponse =
      await sql`INSERT INTO goal (goal_id, user_id, created_at, due_date, description, notes, is_public, daruma) VALUES (${goalUUID}, ${userId}, ${new Date().toISOString()}, ${dueDate}, ${goal}, ${notes}, ${isPublic}, ${darumaColor}) RETURNING *`;

    if (!goalResponse.rowCount) {
      res.status(400).json({ error: 'Error creating goal' });
      return;
    }

    // send email
    const data = await sendIndividualEmail({
      email,
      substitutions: {
        email,
        goal,
        notes,
        dueDate,
        darumaDescription,
      },
      template: NewGoalTemplate,
      subject: 'New Goal Created',
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default SendGoal;
