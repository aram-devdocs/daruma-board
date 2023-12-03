import { sql } from '@vercel/postgres';
import { sendIndividualEmail, AuthTokenTemplate } from '../../service';

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

    await sql`INSERT INTO auth_token (token, email, user_id, expiration) VALUES (${token}, ${email}, ${userId}, ${expiresInFiveMinutes.toISOString()})`;

    const data = await sendIndividualEmail({
      email,
      substitutions: { token },
      template: AuthTokenTemplate,
      subject: 'Your Login Code',
    });

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
