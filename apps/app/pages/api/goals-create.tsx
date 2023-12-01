import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';
import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import { getEmailApi } from '../../utility';

import * as React from 'react';

interface EmailTemplateProps {
  email: string;
  goal: string;
  notes?: string;
  dueDate: Date;
  darumaDescription: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  goal,
  notes,
  dueDate,
  darumaDescription,
}) => (
  <div>
    <h5>Welcome, {email}!</h5>
    <p>You have just created a new goal!</p>
    <p>Here are the details:</p>
    <p>Description: {goal}</p>
    <p>Notes: {notes}</p>
    <p>Due Date: {new Date(dueDate).toDateString()}</p>
    <p>Daruma: {darumaDescription}</p>

    <p>Good luck!</p>
  </div>
);

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

    const resend = new Resend(getEmailApi(email));

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
      // await sql`INSERT INTO goal (goal_id, user_id, created_at, archived, due_date, description, notes, is_public) VALUES (${goalUUID}, ${userId}, ${new Date().toISOString()}, false, ${dueDate}, ${goal}, ${notes}, ${isPublic}) RETURNING *`; // ERROR 'db error: ERROR: column "archived" is of type time… You will need to rewrite or cast the expression.
      await sql`INSERT INTO goal (goal_id, user_id, created_at, due_date, description, notes, is_public, daruma) VALUES (${goalUUID}, ${userId}, ${new Date().toISOString()}, ${dueDate}, ${goal}, ${notes}, ${isPublic}, ${darumaColor}) RETURNING *`;

    // send email

    if (!goalResponse.rowCount) {
      res.status(400).json({ error: 'Error creating goal' });
      return;
    }

    const data = await resend.emails.send({
      from: 'DarumaBoard <onboarding@resend.dev>',
      to: [email],
      subject: 'New Goal Created!',
      react: EmailTemplate({ email, goal, notes, dueDate, darumaDescription }),
    });

    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export default SendGoal;
