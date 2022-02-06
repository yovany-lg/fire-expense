import type { NextPage } from 'next'
import Head from 'next/head'
import { FC, Fragment, useEffect, useRef, useState } from 'react';
import { getTransactions } from '../lib/transactions';
import { Transaction } from '../types/transactions.types';
import SingleTransaction from '../components/SingleTransaction';

import { Dialog, Transition } from '@headlessui/react'
import { ExclamationIcon } from '@heroicons/react/outline'

const buttonDisabled = 'text-gray-700 bg-gray-100 border-0 focus:outline-none hover:bg-gray-200';

const TransactionForm = ({ onSubmit }) => {
  const disabled = false;

  return (
    <>
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
            name="description"
            id="description"
            autoComplete="description"
            className="mt-1 py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500  block w-full shadow-sm text-sm border border-gray-300 rounded-md"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            type="text"
            name="amount"
            id="amount"
            autoComplete="family-name"
            className="mt-1 py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500  block w-full shadow-sm text-sm border border-gray-300 rounded-md"
          />
        </div>

        <div className="col-span-6 sm:col-span-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">
            Date of transaction
          </label>
          <input
            type="datetime-local"
            name="date"
            id="date"
            autoComplete="email"
            className="mt-1 py-2 px-3 bg-white focus:ring-indigo-500 focus:border-indigo-500  block w-full shadow-sm text-sm border border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:px-6 flex justify-end">
        <button
          type="button"
          className={`px-4 py-2 w-full rounded border border-transparent shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:bg-green-700 sm:w-auto sm:text-sm ${disabled ? buttonDisabled : ''}`}
          onClick={onSubmit}
          disabled={disabled}
        >
          Save
        </button>
      </div>
    </>
  );
}

interface TransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TransactionModal: FC<TransactionModalProps> = ({ isOpen, onClose }) => {
  const cancelButtonRef = useRef(null)
  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={onClose}>
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <TransactionForm onSubmit={onClose} />              
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

const Home: NextPage = () => {
  // state variables
  const [transactions, updateTransactions] = useState<Transaction[]>([]);
  // only fetch at the beginning
  useEffect(() => {
    // async function
    const getData = async () => {
      const data = await getTransactions();
      // update the state
      updateTransactions(data);
    }
    // call async function
    getData();
  }, []);

  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false);
  }
  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-4 md:px-8">
      <Head>
        <title>Fire Expense</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col mx-auto sm:w-3/4 md:max-w-lg w-full justify-center items-center">
        <div className="flex-1 pt-8">
          <h1 className="sm:text-3xl text-2xl font-medium mb-4 text-gray-900">Expense Tracker</h1>
        </div>
        <div className="flex w-full justify-between px-4">
          <h2>Transactions</h2>
          <button
            type="button"
            onClick={openModal}
            className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 hover:border-indigo-300"
          >
            Add Transaction
          </button>
        </div>
        <div className="w-full divide-y divide-gray-200">
          {transactions.map((transaction) => (
            <SingleTransaction key={transaction.id} transaction={transaction} />
          ))}
        </div>
        <TransactionModal isOpen={isOpen} onClose={closeModal} />
      </main>
    </div>
  )
}

export default Home
