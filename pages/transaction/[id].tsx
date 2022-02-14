import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import TransactionForm from "../../components/TransactionForm";
import { getTransaction } from "../../lib/transactions";
import { Transaction } from "../../types/transactions.types";

const TransactionPage = ({ }) => {
  const [data, setData] = useState<Transaction>();
  const { query, push } = useRouter();
  useEffect(() => {
    const datFetch = async () => {
      if (query.id) {
        const result = await getTransaction(query.id as string);
        console.log(result);
        setData(result);
      }
    }
    datFetch();
  }, []);

  console.log({query, data});
  const onSuccess = () => {
    push('/');
  }

  return (
    <div className="w-full">
      {data && <TransactionForm onSuccess={onSuccess} initialData={data as any} />}
    </div>
  );
};

export default TransactionPage;