import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../../lib/firebase';
import { Balance } from '../../types/balance.types';

export default function useGetBalance(uid: string) {
  const [balance, updateBalance] = useState<Balance>();
  useEffect(() => {
    if (!uid) {
      return;
    }
    const balanceRef = doc(db, 'balances', uid);
    const unsub = onSnapshot(balanceRef, async (docSnapshot) => {
      let data: Balance;
      if (docSnapshot.exists()) {
        data = { id: uid, ...docSnapshot.data() } as Balance;
      } else {
        data = {
          balance: 0,
          income: 0,
          expenses: 0,
        } as Balance;
        await setDoc(balanceRef, {
          ...data,
        });
        data.id = uid;
      }
      updateBalance(data);
    });
    return unsub;
  }, [uid]);

  return { balance };
}
