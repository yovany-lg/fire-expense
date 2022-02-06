import { FC } from "react";
import Modal from "./Modal";
import { SubmitHandler, useForm } from "react-hook-form";

interface NewTransaction {
  isOpen: boolean;
  onClose: () => void;
}

type Inputs = {
  description: string,
  amount: number,
  date: string,
};

const buttonDisabled = 'text-gray-700 bg-gray-100 border-0 focus:outline-none hover:bg-gray-200';

const errorCSS = 'focus:ring-red-500 focus:border-red-500 ring-red-500 border-red-500';
const normalFocus = 'focus:ring-indigo-500 focus:border-indigo-500';

const NewTransaction: FC<NewTransaction> = ({ isOpen, onClose }) => {
  const { register, reset, handleSubmit, formState: { errors, isSubmitting } } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('Save to firestore', data);
    onClose();
    reset({
      amount: 0,
      date: '',
      description: '',
    });
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col px-4 py-5 bg-white sm:p-6">
        <div className="mb-5">
          <h3 className="text-lg font-medium leading-6 text-gray-900">New Transaction</h3>
          <p className="mt-1 text-sm text-gray-600">Add a new transaction to your history</p>
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
            {...register("amount", { required: true })}
            className={`mt-1 py-2 px-3 bg-white block w-full shadow-sm text-sm border border-gray-300 rounded-md ${errors.amount ? errorCSS : normalFocus}`}
          />
        </div>

        <div className="col-span-6 sm:col-span-4">
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
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
        <button
          type="button"
          className={`px-4 py-2 w-full rounded border border-transparent shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-700 sm:w-auto sm:text-sm ${isSubmitting ? buttonDisabled : ''}`}
          onClick={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          Save
        </button>
      </div>
    </Modal>
  );
}

export default NewTransaction;
