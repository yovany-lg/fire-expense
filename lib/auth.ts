import {
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from './firebase';

async function createUserProfile(user: User) {
  const profileRef = doc(db, 'users', user.uid);
  await setDoc(profileRef, {
    uid: user.uid,
    email: user.email || '',
    name: user.displayName || '',
    photoUrl: user.photoURL || '',
  });
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  let user;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
    createUserProfile(user);
    const userToken = await user.getIdToken();
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        Authorization: userToken,
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error(`Failed to to login: ${response.status}`);
    }
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error({ errorCode, errorMessage });
    throw new Error('Failed to login');
  }

  return user;
}

export async function userSignOut() {
  const all = Promise.all([
    signOut(auth),
    fetch('/api/auth/logout', {
      method: 'POST',
    }),
  ]);
  await all;
}
