import { FC } from "react";
import Modal from "./Modal";
import TransactionForm from "./TransactionForm";

interface NewTransaction {
  isOpen: boolean;
  onClose: () => void;
}

const NewTransaction: FC<NewTransaction> = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="px-4">
        <TransactionForm onSuccess={onClose} />
      </div>
    </Modal>
  );
}

export default NewTransaction;
