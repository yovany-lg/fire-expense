import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TransactionForm from "../../components/TransactionForm";
import { getTransaction } from "../../lib/transactions";
import { Transaction } from "../../types/transactions.types";

const TransactionPage = ({ user }) => {
  const [data, setData] = useState<Transaction>();
  const { query, push } = useRouter();
  useEffect(() => {
    const datFetch = async () => {
      if (query.id && user?.uid) {
        const result = await getTransaction(query.id as string, user?.uid);
        setData(result);
      }
    }
    datFetch();
  }, [query.id, user?.uid]);

  const onSuccess = () => {
    push('/');
  }

  return (
    <div className="w-full">
      {data && <TransactionForm onSuccess={onSuccess} initialData={data as any} uid={user?.uid} />}
    </div>
  );
};

export default TransactionPage;