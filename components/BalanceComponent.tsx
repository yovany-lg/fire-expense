import { FC } from "react";
import { Balance } from "../types/balance.types";
import { amountFormat } from "../utils";

interface BalanceProps {
  balance: Balance
}

const BalanceComponent: FC<BalanceProps> = ({ balance }) => {
  return (
    <div className="w-full flex flex-col items-center py-4 px-6 mb-4 drop-shadow bg-white rounded-md">
      <h3 className="text-lg font-semibold">Total Balance</h3>
      <h2 className="my-4 text-3xl font-semibold text-blue-600">{amountFormat(balance.balance)}</h2>
      <div className="flex flex-row justify-between w-full">
        <div className="flex flex-col items-center">
          <h3 className="text-base font-normal">Income</h3>
          <h2 className="py-2 text-lg font-medium text-emerald-600">{amountFormat(balance.income)}</h2>
        </div>
        <div className="flex flex-col items-center">
          <h3 className="text-base font-normal">Expenses</h3>
          <h2 className="py-2 text-xl font-medium text-red-500">{amountFormat(balance.expenses)}</h2>
        </div>
      </div>
    </div>
  );
}

export default BalanceComponent;