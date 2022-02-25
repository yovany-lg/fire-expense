import '../styles/global.css';
import type { AppProps } from 'next/app'
import Layout from '../components/Layout';
import useProvideAuth from '../hooks/auth/useProvideAuth';

function MyApp({ Component, pageProps }: AppProps) {
  const authState = useProvideAuth();
  return (
    <Layout signOut={authState.signOut} user={authState.user}>
      <Component {...pageProps} {...authState} />
    </Layout>
  );
}

export default MyApp
