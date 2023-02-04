import { useEffect, useState } from 'react';

type Props = {
  loan: API.CurrentLoan | undefined;
};

export const useLoanDetails = ({ loan }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [currentTransaction, setCurrentTransaction] = useState<Partial<API.CurrentTransaction>>();

  useEffect(() => {
    if (loan) {
      const transaction: Partial<API.CurrentTransaction> = {
        loan: loan,
        date: Date.now(),
      };
      setCurrentTransaction(transaction);
    }
  }, [loan]);

  const _handleCancelModal = (): void => {
    setModalOpen(false);
  };

  return {
    modalOpen,
    currentTransaction,
    setModalOpen,
    _handleCancelModal,
  };
};

export default useLoanDetails;
