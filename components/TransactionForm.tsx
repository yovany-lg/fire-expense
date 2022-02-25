import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FormInput, Transaction } from "../types/transactions.types";
import { saveTransaction, updateTransaction } from "../lib/transactions";

interface TransactionFormProps {
  initialData?: Transaction;
  onSuccess: () => void;
  uid: string;
}

const buttonDisabled = 'text-gray-700 bg-gray-100 border-0 focus:outline-none hover:bg-gray-200';

const errorCSS = 'focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500';
const normalFocus = 'focus:ring-indigo-500 focus:border-indigo-500';

const TransactionForm: FC<TransactionFormProps> = ({ onSuccess, initialData, uid }) => {
  const dateTime = initialData?.date.toDate();
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormInput>({
    defaultValues: {
      ...initialData,
      date: dateTime?.toISOString().substring(0, 16)
    }    
  });
  const onSubmit: SubmitHandler<FormInput> = async (data) => {
    if (initialData?.id) {
      await updateTransaction(initialData as any, data, uid);
    } else {
      await saveTransaction(data, uid);
    }
    onSuccess();
    reset();
  }
  return (
    <div className="divide-y-2">
      <div className="flex flex-col py-5 bg-white">
        <div className="mb-5 flex flex-col items-center">
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            {initialData ? 'Update Transaction' : 'New Transaction'}
          </h3>
          <p className="mt-1 text-base text-gray-600">
            {initialData ? 'Update your transaction data' : 'Add a new transaction to your history'}
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <input
            type="text"
            id="description"
            autoComplete="description"
            className={`mt-1 py-2 px-3 bg-white block w-full shadow-sm text-sm border border-gray-300 rounded-md ${errors.description ? errorCSS : normalFocus}`}
            {...register("description", { required: true })}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="number"
            id="amount"
            autoComplete="family-name"
            {...register("amount", { required: true, valueAsNumber: true })}
            className={`mt-1 py-2 px-3 bg-white block w-full shadow-sm text-sm border border-gray-300 rounded-md ${errors.amount ? errorCSS : normalFocus}`}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date of transaction
          </label>
          <input
            type="datetime-local"
            id="date"
            autoComplete="date"
            {...register("date", { required: true })}
            className={`mt-1 py-2 px-3 bg-white block w-full shadow-sm text-sm border border-gray-300 rounded-md ${errors.date ? errorCSS : normalFocus}`}
          />
        </div>
        <div>
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type of transaction
          </label>
          <div className="mt-2 flex">
            <div className="flex items-center">
              <input
                id="income"
                type="radio"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                value="income"
                {...register("type", { required: true })}
              />
              <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                Income
              </label>
            </div>
            <div className="flex items-center ml-6">
              <input
                id="expense"
                type="radio"
                value="expense"
                className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                {...register("type", { required: true })}
              />
              <label htmlFor="push-everything" className="ml-3 block text-sm font-medium text-gray-700">
                Expense
              </label>
            </div>
          </div>
        </div>

      </div>
      <div className="py-5 flex justify-end">
        <button
          type="button"
          className={`px-4 py-2 w-full rounded border border-transparent shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-700 sm:w-auto sm:text-sm ${isSubmitting ? buttonDisabled : ''}`}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Save
        </button>
      </div>
    </div>
  );
}

export default TransactionForm;
