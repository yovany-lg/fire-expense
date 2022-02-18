import { getAuth, signInWithPopup, GoogleAuthProvider, signOut as firebaseSignOut } from "firebase/auth"
import { auth } from "./firebase";

export async function signInWithGoogle() {
  const provider = new GoogleAuthProvider();
  let user;
  try {
    const result = await signInWithPopup(auth, provider);
    user = result.user;
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