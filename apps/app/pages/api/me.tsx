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

  // If token is valid for more than an hour, return it

  const now = Math.floor(Date.now() / 1000);
  if (decoded.exp - now > 3600) {
    res.status(200).json({ success: true, token });
    return;
  }

  // If token is valid for less than an hour, return a new one
  const newToken = jwt.sign({ email: decoded.email }, secret, {
    expiresIn: '6h',
  });
  res.setHeader('Set-Cookie', `token=${newToken}; path=/; httpOnly`);

  res.status(200).json({ success: true, token: newToken });
  return;
};

export default me;
