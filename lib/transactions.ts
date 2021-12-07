import { collection, getDocs } from "firebase/firestore";
import { Transaction } from "../types/transactions.types";
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
