import { NextApiRequest, NextApiResponse } from 'next';
import { destroyCookie } from 'nookies';

export default function logout(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    destroyCookie({ res }, 'session', { path: '/' });
    res.status(200).json({ success: true });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
