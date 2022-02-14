import Link from 'next/link';
import { FC } from 'react';

const Layout: FC = ({ children }) => {
  return (
    <div className="w-full px-4 lg:max-w-2xl lg:mx-auto lg:px-0">
      <header className="py-8 mx-auto w-full sm:w-3/4 lg:w-full">
        <Link href="/" passHref>
          <a className="sm:text-3xl text-2xl font-medium mb-4 text-gray-900">Expense Tracker</a>
        </Link>
      </header>
      <main className="flex flex-col mx-auto w-full sm:w-3/4 lg:w-full justify-center items-center">
        {children}
      </main>
    </div>
  )
}

export default Layout;
