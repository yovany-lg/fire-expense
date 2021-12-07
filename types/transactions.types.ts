import { Timestamp } from "@firebase/firestore";

export enum TransactionType {
  income = 'income',
  expense = 'expense'
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  description: string;
  date: Timestamp;
}
