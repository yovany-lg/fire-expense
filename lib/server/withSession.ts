import { GetServerSideProps } from 'next';
import verifySession from './verifySession';

export default function withSession(
  getServerSideProps: GetServerSideProps
): GetServerSideProps {
  return async (ctx) => {
    try {
      const user = await verifySession(ctx);
      if (!user) {
        return {
          redirect: {
            destination: '/login',
            permanent: false,
          },
        };
      }
      return getServerSideProps({ ...ctx, user } as any);
    } catch (error) {
      return {
        redirect: {
          permanent: false,
          destination: '/login',
        },
      };
    }
  };
}
