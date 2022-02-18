import { useRouter } from "next/router";
import { FC } from "react";

interface LoginPageProps {
  signIn: (cb: () => void) => void;
}

const LoginPage: FC<LoginPageProps> = ({ signIn }) => {
  const router = useRouter();
  const onSuccess = () => {
    router.push('/');
  }
  return (
    <button
      className="bg-sky-500 hover:bg-sky-700 px-5 py-2.5 text-sm leading-5 rounded-md font-semibold text-white"
      onClick={() => signIn(onSuccess)}
    >
      Sign In
    </button>
  )
}

export default LoginPage;
