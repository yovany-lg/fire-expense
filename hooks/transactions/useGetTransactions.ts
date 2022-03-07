import { useCallback, useEffect, useState } from 'react';
import { getTransactions, nextTransactions } from '../../lib/transactions';
import { Transaction } from '../../types/transactions.types';

export default function useGetTransactions(uid: string) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [lastVisible, setLastVisible] = useState<Transaction>();
  const [hasNext, setHasNext] = useState(true);

  useEffect(() => {
    if (!uid) {
      return;
    }
    // async function
    const getData = async () => {
      const { transactions: data, lastVisible: last } = await getTransactions(
        uid
      );
      setLastVisible(last);
      // update the state
      setTransactions(data);
      setHasNext(data.length === 5);
    };
    // call async function
    getData();
  }, [uid]);

  const loadMore = useCallback(async () => {
    if (!uid || !hasNext) {
      return;
    }
    const {
      transactions: next,
      lastVisible: last,
      isEmpty,
    } = await nextTransactions(uid, lastVisible as Transaction);
    setTransactions((prev) => prev.concat(next));
    setLastVisible(last);
    setHasNext(!isEmpty);
  }, [hasNext, lastVisible, uid]);

  return { transactions, loadMore, hasNext };
}
