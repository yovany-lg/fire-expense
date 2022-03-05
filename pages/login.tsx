import { useRouter } from 'next/router'
import { FC } from 'react'

interface LoginPageProps {
  signIn: (cb: () => void) => void
}

const LoginPage: FC<LoginPageProps> = ({ signIn }) => {
  const router = useRouter()
  const onSuccess = () => {
    router.push('/')
  }
  return (
    <button
      className="hover:bg-emerald-600 bg-emerald-500 text-white px-5 py-2.5 text-base leading-5 rounded-md font-medium border"
      onClick={() => signIn(onSuccess)}
    >
      Sign in
    </button>
  )
}

export default LoginPage
