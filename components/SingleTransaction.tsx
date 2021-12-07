import { ArrowNarrowUpIcon, ArrowNarrowDownIcon } from "@heroicons/react/solid";
import { FC } from "react";
import { Transaction, TransactionType } from "../types/transactions.types";

interface SingleTransactionProps {
  transaction: Transaction;
}

const SingleTransaction: FC<SingleTransactionProps> = ({ transaction }) => {
  // extract the Transaction props
  const { type, description, amount, date } = transaction;
  const isIncome = type === TransactionType.income;
  return (
    <div className="flex justify-between py-4">
      {isIncome
        ? <ArrowNarrowUpIcon className="h-8 w-8 py-1 px-2 rounded-full bg-green-100 text-green-800" />
        : <ArrowNarrowDownIcon className="h-8 w-8 py-1 px-2 rounded-full bg-red-200 text-red-800" />}
      <div className="flex flex-grow flex-col px-8">
        <span className="font-medium">{description}</span>
        <span className="mt-1 text-gray-500 text-sm">{date.toDate().toDateString()}</span>
      </div>
      <div className={isIncome ? 'text-green-500' : 'text-red-600'}>${amount.toFixed(2)}</div>
    </div>
  );
};

export default SingleTransaction;