import { ArrowNarrowUpIcon, ArrowNarrowDownIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { FC } from "react";
import { Transaction, TransactionType } from "../types/transactions.types";

interface SingleTransactionProps {
  transaction: Transaction;
}

const SingleTransaction: FC<SingleTransactionProps> = ({ transaction }) => {
  // extract the Transaction props
  const { type, description, amount, date, id } = transaction;
  const isIncome = type === TransactionType.income;
  return (
    <div className="flex justify-between p-4 my-4 drop-shadow-md bg-white rounded-md">
      {isIncome
        ? <ArrowNarrowUpIcon className="h-8 w-8 py-1 px-2 rounded-full bg-emerald-100 text-green-800" />
        : <ArrowNarrowDownIcon className="h-8 w-8 py-1 px-2 rounded-full bg-red-100 text-red-800" />}
      <div className="flex flex-grow flex-col px-8">
        <Link href={`transaction/${id}`} passHref>
          <a className="font-medium">{description}</a>
        </Link>
        <span className="mt-1 text-gray-500 text-sm">{date.toDate().toDateString()}</span>
      </div>
      <div className={isIncome ? 'text-emerald-600' : 'text-red-500'}>${amount.toFixed(2)}</div>
    </div>
  );
};

export default SingleTransaction;