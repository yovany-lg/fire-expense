import { onAuthStateChanged } from 'firebase/auth';
import { useRouter } from 'next/router';
import { useCallback, useEffect, useState } from 'react';
import { signInWithGoogle, userSignOut } from '../../lib/auth';
import { auth } from '../../lib/firebase';
import { AppUser } from '../../types/user.types';

export default function useProvideAuth() {
  const [user, setUser] = useState<AppUser | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          photoUrl: user.photoURL || '',
        });
        setIsLoading(false);
      } else {
        router.push('/login');
        setUser(undefined);
        setIsLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  const signIn = useCallback(async () => {
    setIsLoading(true);
    try {
      const user = await signInWithGoogle();
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || '',
          name: user.displayName || '',
          photoUrl: user.photoURL || '',
        });
        router.push('/');
      } else {
        setUser(undefined);
      }
    } catch (error) {
      console.error(error);
      setUser(undefined);
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const signOut = useCallback(async () => {
    setIsLoading(false);
    try {
      await userSignOut();
      setUser(undefined);
    } catch (error) {
      console.error(error);
      setUser(undefined);
    } finally {
      setIsLoading(false);
      router.push('/login');
    }
  }, [router]);

  return { user, isLoading, signIn, signOut };
}
