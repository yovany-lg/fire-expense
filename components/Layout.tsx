import Link from 'next/link';
import { FC } from 'react';

const Layout: FC = ({ children, signOut }) => {
  return (
    <div className="w-full px-4 lg:max-w-2xl lg:mx-auto lg:px-0">
      <header className="py-8 mx-auto w-full sm:w-3/4 lg:w-full flex justify-between">
        <Link href="/" passHref>
          <a className="sm:text-3xl text-2xl font-medium mb-4 text-gray-900">Expense Tracker</a>
        </Link>
        <button
          className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
          onClick={() => signOut()}
        >
          Sign Out
        </button>
      </header>
      <main className="flex flex-col mx-auto w-full sm:w-3/4 lg:w-full justify-center items-center">
        {children}
      </main>
    </div>
  )
}

export default Layout;
