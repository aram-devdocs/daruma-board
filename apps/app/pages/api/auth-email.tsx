import { sql } from '@vercel/postgres';
import { getEmailApi } from '../../utility';

import { Resend } from 'resend';
// TODO: Move to service

export default async function sendAuthCode(req, res) {
  // if not post, return 405
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    console.log('start');
    console.log(req.body);
    const { email: rawEmail } = JSON.parse(req.body);
    const email = rawEmail.toLowerCase();

    if (!email) {
      console.log('no email');
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const user = await sql`SELECT * FROM "user" WHERE "email" = ${email}`;
    console.log('user', user);

    const userId = user.rowCount ? user.rows[0].user_id : null;

    // create row in table auth_token
    const token = Math.floor(100000 + Math.random() * 900000);
    const expiresInFiveMinutes = new Date(Date.now() + 5 * 60 * 1000);

    const tokenResponse =
      await sql`INSERT INTO auth_token (token, email, user_id, expiration) VALUES (${token}, ${email}, ${userId}, ${expiresInFiveMinutes.toISOString()})`;

    // send email

    const resend = new Resend(getEmailApi(email));

    const data = await resend.emails.send({
      from: 'DarumaBoard <onboarding@resend.dev>',
      to: [email],
      subject: 'Login Code',
      react: (
        <div>
          <h1>Here is your login code!</h1>
          <p>{token}</p>
          <p>This code will expire in 5 minutes.</p>
        </div>
      ),
    });

    console.log('data', data);

    if (!data.data) {
      console.log('no data');
      res.status(403).json({ error: 'Something went wrong' });
      return;
    }

    res.status(200).json({ message: 'ok' });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}
