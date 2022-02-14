import { addDoc, collection, doc, getDoc, getDocs, setDoc, Timestamp } from "firebase/firestore";
import { FormInput, Transaction } from "../types/transactions.types";
import { db } from './firebase'

export async function getTransactions(): Promise<Transaction[]> {
  // collection ref
  const transactionsRef = collection(db, "transactions");
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

export async function saveTransaction(data: FormInput): Promise<void> {
  const transactionsRef = collection(db, "transactions");
  try {
    await addDoc(transactionsRef, {
      ...data,
      date: Timestamp.fromDate(new Date(data.date))
    });
  } catch (error) {
    console.error(error)
  }
}

export async function getTransaction(id: string): Promise<Transaction> {
  const docRef = doc(db, 'transactions', id);
  const docSnapshot = await getDoc(docRef);
  let data: any;
  if (docSnapshot.exists()) {
    data = docSnapshot.data() as Transaction;
  } else {
    console.log('Sorry, no data for this ID');
  }
  return data;
}