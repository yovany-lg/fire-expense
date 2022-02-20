import { signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "./firebase";

async function createUserProfile(user) {
  const profileRef = doc(db, 'users', user.uid);
  await setDoc(profileRef, {
    uid: user.uid,
    email: user.email || '',
    name: user.displayName || '',
    photoUrl: user.photoURL || ''
  });
}

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  let user;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
    createUserProfile(user);
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error({ errorCode, errorMessage })
    throw new Error('Failed to login');
  }

  return user;
}

export async function userSignOut() {
  await firebaseSignOut(auth);
}