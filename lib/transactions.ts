import { addDoc, collection, doc, getDoc, getDocs, runTransaction, Timestamp, updateDoc } from "firebase/firestore";
import { Balance } from "../types/balance.types";
import { FormInput, Transaction } from "../types/transactions.types";
import { db } from './firebase'

export async function getTransactions(uid: string): Promise<Transaction[]> {
  // collection ref
  const transactionsRef = collection(db, 'users', uid, 'transactions');
  // get docs
  const snapshot = await getDocs(transactionsRef);
  const transactions: Transaction[] = [];
  snapshot.forEach((doc) => {
    const transactionDoc = { id: doc.id, ...doc.data() } as Transaction;
    transactions.push(transactionDoc);
  });
  // return the data
  return transactions;
}

export async function saveTransaction(data: FormInput, uid: string): Promise<void> {
  const balanceRef = doc(db, 'balances', uid);
  try {
    await runTransaction(db, async (transaction) => {
      const currentBalance = (await transaction.get(balanceRef)).data() as Balance;
      if (data.type === 'income') {
        currentBalance.balance = currentBalance.balance + data.amount;
        currentBalance.income = currentBalance.income + data.amount;
      } else {
        currentBalance.balance = currentBalance.balance - data.amount;
        currentBalance.expenses = currentBalance.expenses + data.amount;
      }
      transaction.update(balanceRef, {
        ...currentBalance
      });
      const transactionsRef = doc(collection(db,'users', uid, 'transactions'));
      transaction.set(transactionsRef, {
        ...data,
        date: Timestamp.fromDate(new Date(data.date))
      })
    });
  } catch (error) {
    console.error(error)
  }
}

export async function updateTransaction(data: FormInput, uid: string): Promise<void> {
  const ref = doc(db, 'users', uid, 'transactions', data.id as string);
  try {
    await updateDoc(ref, {
      ...data,
      date: Timestamp.fromDate(new Date(data.date))
    });
  } catch (error) {
    console.error(error)
  }
}

export async function getTransaction(id: string, uid: string): Promise<Transaction> {
  const docRef = doc(db, 'users', uid, 'transactions', id);
  const docSnapshot = await getDoc(docRef);
  let data: any;
  if (docSnapshot.exists()) {
    data = { id: docSnapshot.id, ...docSnapshot.data() } as Transaction;
  } else {
    console.log('Sorry, no data for this ID');
  }
  return data;
}