import { GetServerSidePropsContext } from 'next';
import { parseCookies } from 'nookies';
import admin from '../firebase-admin';

export default async function verifySession(ctx: GetServerSidePropsContext) {
  const cookies = parseCookies(ctx);
  if (!cookies?.session) {
    return null;
  }

  const decodedToken = await admin
    .auth()
    .verifySessionCookie(cookies?.session, true);
  return decodedToken;
}
