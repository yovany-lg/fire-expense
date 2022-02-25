import Link from 'next/link';
import { FC } from 'react';
import { AppUser } from '../types/user.types';

interface LayoutProps {
  user?: AppUser;
  signOut: () => void;
}

const Layout: FC<LayoutProps> = ({ children, signOut, user}) => {
  return (
    <div className="w-full px-4 md:max-w-md lg:max-w-lg md:mx-auto md:px-0">
      <header className="pt-6 mx-auto w-full flex justify-between items-center">
        <Link href="/" passHref>
          <a className="sm:text-3xl text-2xl font-medium mb-4 text-gray-900">Expense Tracker</a>
        </Link>
        {user && (
          <div>
            <button
              className="hover:text-red-600 text-gray-700 px-4 py-2 text-sm rounded-md font-medium border border-slate-300 hover:border-red-500"
              onClick={signOut}
            >
              Sign Out
            </button>
          </div>
        )}
      </header>
      {user && (
        <div>
          <h2 className="text-lg pt-2 pb-6">Welcome, <span className="font-medium ">{user.name}</span></h2>
        </div>
      )}
      <main className="flex flex-col mx-auto w-full justify-center items-center">
        {children}
      </main>
    </div>
  )
}

export default Layout;
