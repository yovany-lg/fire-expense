import { FC } from 'react';

interface LoginPageProps {
  signIn: () => void;
}

const LoginPage: FC<LoginPageProps> = ({ signIn }) => {
  return (
    <button
      className="hover:bg-emerald-600 bg-emerald-500 text-white px-5 py-2.5 text-base leading-5 rounded-md font-medium border"
      onClick={() => signIn()}
    >
      Sign in
    </button>
  );
};

export default LoginPage;
