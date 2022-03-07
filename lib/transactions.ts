import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  runTransaction,
  startAfter,
  Timestamp,
} from 'firebase/firestore';
import { Balance } from '../types/balance.types';
import { FormInput, Transaction } from '../types/transactions.types';
import { db } from './firebase';

interface GetTransactionsResult {
  transactions: Transaction[];
  lastVisible: Transaction;
  isEmpty?: boolean;
}

export async function getTransactions(
  uid: string
): Promise<GetTransactionsResult> {
  // collection ref
  const transactionsRef = collection(db, 'users', uid, 'transactions');
  const first = query(transactionsRef, orderBy('date'), limit(5));
  // get docs
  const snapshot = await getDocs(first);
  const transactions: Transaction[] = [];
  snapshot.forEach((doc) => {
    const transactionDoc = { id: doc.id, ...doc.data() } as Transaction;
    transactions.push(transactionDoc);
  });
  // return the data
  return {
    transactions,
    lastVisible: snapshot.docs[snapshot.docs.length - 1] as any,
  };
}

export async function nextTransactions(
  uid: string,
  lastVisible: Transaction
): Promise<GetTransactionsResult> {
  // collection ref
  const transactionsRef = collection(db, 'users', uid, 'transactions');
  const next = query(
    transactionsRef,
    orderBy('date'),
    startAfter(lastVisible),
    limit(5)
  );
  // get docs
  const snapshot = await getDocs(next);
  const transactions: Transaction[] = [];
  snapshot.forEach((doc) => {
    const transactionDoc = { id: doc.id, ...doc.data() } as Transaction;
    transactions.push(transactionDoc);
  });
  // return the data
  return {
    transactions,
    lastVisible: snapshot.docs[snapshot.docs.length - 1] as any,
    isEmpty: snapshot.empty,
  };
}

export async function saveTransaction(
  data: FormInput,
  uid: string
): Promise<void> {
  const balanceRef = doc(db, 'balances', uid);
  try {
    await runTransaction(db, async (transaction) => {
      const currentBalance = (
        await transaction.get(balanceRef)
      ).data() as Balance;
      if (data.type === 'income') {
        currentBalance.balance = currentBalance.balance + data.amount;
        currentBalance.income = currentBalance.income + data.amount;
      } else {
        currentBalance.balance = currentBalance.balance - data.amount;
        currentBalance.expenses = currentBalance.expenses + data.amount;
      }
      transaction.update(balanceRef, {
        ...currentBalance,
      });
      const transactionsRef = doc(collection(db, 'users', uid, 'transactions'));
      transaction.set(transactionsRef, {
        ...data,
        date: Timestamp.fromDate(new Date(data.date)),
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function updateTransaction(
  prevData: FormInput,
  data: FormInput,
  uid: string
): Promise<void> {
  const transactionRef = doc(
    db,
    'users',
    uid,
    'transactions',
    data.id as string
  );
  const balanceRef = doc(db, 'balances', uid);
  try {
    await runTransaction(db, async (transaction) => {
      const balanceDoc = await transaction.get(balanceRef);
      if (!balanceDoc.exists()) {
        throw new Error('Error while updating the Transaction');
      }
      const balanceData = balanceDoc.data() as Balance;
      // Revert step
      if (prevData.type === 'income') {
        balanceData.balance = balanceData.balance - prevData.amount;
        balanceData.income = balanceData.income - prevData.amount;
      } else {
        balanceData.balance = balanceData.balance + prevData.amount;
        balanceData.expenses = balanceData.expenses - prevData.amount;
      }
      // Update step
      if (data.type === 'income') {
        balanceData.balance = balanceData.balance + data.amount;
        balanceData.income = balanceData.income + data.amount;
      } else {
        balanceData.balance = balanceData.balance - data.amount;
        balanceData.expenses = balanceData.expenses + data.amount;
      }

      transaction.update(balanceRef, {
        ...balanceData,
      });
      transaction.update(transactionRef, {
        ...data,
        date: Timestamp.fromDate(new Date(data.date)),
      });
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getTransaction(
  id: string,
  uid: string
): Promise<Transaction> {
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
