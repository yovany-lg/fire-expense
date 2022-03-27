import admin from '@/lib/firebase-admin';
import { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from 'nookies';

const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days in milliseconds;

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  if (!req.headers?.authorization) {
    throw new Error('Authorization is required');
  }
  if (req.method === 'POST') {
    const idToken = req.headers.authorization;
    const cookie = await admin
      .auth()
      .verifyIdToken(idToken)
      .then((decodedIdToken) => {
        // Only process if the user just signed in in the last 5 minutes.
        if (new Date().getTime() / 1000 - decodedIdToken.auth_time < 5 * 60) {
          // Create session cookie and set it.
          return admin.auth().createSessionCookie(idToken, { expiresIn });
        }
        // A user that was not recently signed in is trying to set a session cookie.
        // To guard against ID token theft, require re-authentication.
        res.status(401).send('Recent sign in required!');
        return null;
      });

    if (cookie) {
      // Set cookie policy for session cookie.
      const options = {
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
        path: '/',
      };
      setCookie({ res }, 'session', cookie, options);
      res.end(JSON.stringify({ status: 'success' }));
    } else {
      res.status(401).send('Invalid authentication');
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }
}
