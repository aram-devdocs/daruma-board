import type { NextApiRequest, NextApiResponse } from 'next';
import { Resend } from 'resend';

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
    <h1>Welcome, {email}!</h1>
    <p>You have just created a new goal!</p>
    <p>Here are the details:</p>
    <p>{goal}</p>
    <p>{notes}</p>
    <p>{new Date(dueDate).toDateString()}</p>
    <p>{darumaDescription}</p>

    <p>
      *Note, currently this project is just in alpha so your goals will only be
      saved locally, and not persist.
    </p>
  </div>
);

const resend = new Resend(process.env.RESEND_API_KEY);

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

    // if any of the required fields are missing, return 400
    if (!email || !goal || !dueDate || !darumaDescription) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    // send email

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
