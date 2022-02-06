import { addDoc, collection, doc, getDocs, setDoc, Timestamp } from "firebase/firestore";
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