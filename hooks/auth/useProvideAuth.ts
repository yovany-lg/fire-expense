import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { signInWithGoogle, userSignOut } from "../../lib/auth";
import { auth } from "../../lib/firebase";

interface User {
  uid: string;
  email:string;
  name:string;
  photoUrl:string;
}

export default function useProvideAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          photoUrl: user.photoURL || ''
        });
        setIsLoading(false);
      } else {
        router.push('/login');
        setUser(null);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async (callback: () => void) => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          photoUrl: user.photoURL || ''
        });
        callback && callback();
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error(error)
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);
  const signOut = useCallback(async () => {
    setIsLoading(false);
    try {
      await userSignOut();
      setUser(null);
    } catch (error) {
      console.error(error)
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { user, isLoading, signIn, signOut };
}