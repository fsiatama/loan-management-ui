import { ActionType } from '@ant-design/pro-components';
import { useCallback, useRef, useState } from 'react';

interface Props {}

const useCompanies = ({}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SicexAPI.CurrentCompany>();

  const onClick = useCallback((): void => {}, []);

  const _handleCancelModal = () => {
    setModalOpen(false);
    if (!showDetail) {
      setCurrentRow(undefined);
    }
  };

  return {
    actionRef,
    modalOpen,
    setModalOpen,
    currentRow,
    setCurrentRow,
    onClick,
    _handleCancelModal,
  };
};

export default useCompanies;
