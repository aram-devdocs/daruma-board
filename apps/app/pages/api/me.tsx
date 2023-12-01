// check to see if there's a logged in user

import jwt from 'jsonwebtoken';
import { NextApiRequest, NextApiResponse } from 'next';

export const me = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    console.log('Only POST requests allowed');
    res.status(400).json({ error: 'Only POST requests allowed' });
    return;
  }

  const { token } = JSON.parse(req.body);
  if (!token) {
    console.log('Token is required');
    res.status(400).json({ error: 'Token is required' });
    return;
  }

  const secret = process.env.JWT_SECRET;
  const decoded = jwt.verify(token, secret);

  if (!decoded) {
    res.status(400).json({ error: 'Invalid token' });
    return;
  }

  console.log(decoded);
  res.status(200).json({ success: true });
  return;
};

export default me;
