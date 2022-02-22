import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react';
import { getTransactions } from '../lib/transactions';
import { Transaction } from '../types/transactions.types';
import SingleTransaction from '../components/SingleTransaction';
import NewTransaction from '../components/NewTransaction';
import { AppUser } from '../types/user.types';
import BalanceComponent from '../components/BalanceComponent';
import { Balance } from '../types/balance.types';
import { getBalance } from '../lib/balance';

interface HomePageProps {
  user: AppUser;
}

const Home: NextPage<HomePageProps> = ({ user }) => {
  // state variables
  const [transactions, updateTransactions] = useState<Transaction[]>([]);
  const [balance, updateBalance] = useState<Balance>();
  // only fetch at the beginning
  useEffect(() => {
    if (!user) {
      return;
    }
    // async function
    const getData = async () => {
      const data = await getTransactions(user.uid);
      const balanceData = await getBalance(user.uid);
      // update the state
      updateTransactions(data);
      updateBalance(balanceData);
    }
    // call async function
    getData();
  }, [user?.uid]);

  const [isOpen, setIsOpen] = useState(false)
  const closeModal = () => {
    setIsOpen(false);
  }
  const openModal = () => {
    setIsOpen(true);
  }

  return (
    <>
      <Head>
        <title>Fire Expense</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {balance && <BalanceComponent balance={balance} />}
      <div className="flex w-full justify-between p-4">
        <h2>Transactions</h2>
        <button
          type="button"
          onClick={openModal}
          className="px-4 py-2 text-sm font-medium rounded-md border border-slate-300 hover:border-indigo-300"
        >
          Add Transaction
        </button>
      </div>
      <div className="w-full">
        {transactions.map((transaction) => (
          <SingleTransaction key={transaction.id} transaction={transaction} />
        ))}
      </div>
      <NewTransaction isOpen={isOpen} onClose={closeModal} uid={user?.uid} />
    </>
  )
}

export default Home
