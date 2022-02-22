import { doc, getDoc, setDoc } from "firebase/firestore";
import { Balance } from "../types/balance.types";
import { db } from "./firebase";

export async function getBalance(uid: string): Promise<Balance> {
  const balanceRef = doc(db, 'balances', uid);
  const balanceSnapshot = await getDoc(balanceRef);
  let data: Balance;
  if (balanceSnapshot.exists()) {
    data = { id: uid, ...balanceSnapshot.data() } as Balance;
  } else {
    data = {
      balance: 0,
      income: 0,
      expenses: 0
    } as Balance;
    await setDoc(balanceRef, {
      ...data
    });
    data.id = uid;
  }
  return data;
}