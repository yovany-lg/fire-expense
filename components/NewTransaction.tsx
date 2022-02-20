import { FC } from "react";
import Modal from "./Modal";
import TransactionForm from "./TransactionForm";

interface NewTransaction {
  isOpen: boolean;
  onClose: () => void;
  uid: string;
}

const NewTransaction: FC<NewTransaction> = ({ isOpen, onClose, uid }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-4">
        <TransactionForm onSuccess={onClose} uid={uid} />
      </div>
    </Modal>
  );
}

export default NewTransaction;
