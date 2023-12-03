import { sql } from '@vercel/postgres';
import { v4 as uuidv4 } from 'uuid';
import jwt from 'jsonwebtoken';
// TODO: Move to service

export default async function validateAuthToken(req, res) {
  // if not post, return 405
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method not allowed' });
    return;
  }

  try {
    const { token, email: rawEmail } = JSON.parse(req.body);
    const email = rawEmail.toLowerCase();

    if (!token || !email) {
      res.status(400).json({ error: 'Missing required fields' });
      return;
    }

    const tokenResponse =
      await sql`SELECT * FROM auth_token WHERE token = ${token} AND email = ${email}`;

    if (!tokenResponse.rowCount) {
      res.status(400).json({ error: 'Invalid token' });
      return;
    }

    const tokenData = tokenResponse.rows[0];

    if (new Date(tokenData.expiration) < new Date()) {
      res.status(400).json({ error: 'Token expired' });
      return;
    }

    if (!tokenData.user_id) {
      const userUUID = uuidv4(); // TODO: Move to db for auto generation

      const userResponse =
        await sql`INSERT INTO "user" (user_id, email, created_at, archived) VALUES (${userUUID}, ${email}, ${new Date().toISOString()}, false) RETURNING *`;
      const user = userResponse.rows[0];
      await sql`UPDATE auth_token SET user_id = ${user.user_id} WHERE auth_token_id = ${tokenData.auth_token_id}`;
    }

    const secret = process.env.JWT_SECRET;
    const jwtToken = jwt.sign({ email }, secret, { expiresIn: '1h' });
    res.setHeader('Set-Cookie', `token=${jwtToken}; path=/; httpOnly`);

    res.status(200).json({ message: 'ok', token: jwtToken });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: error.message });
  }
}
