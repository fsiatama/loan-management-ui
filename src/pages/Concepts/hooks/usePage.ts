import { removeConcepts } from '@/services/api/concepts/api';
import { ActionType } from '@ant-design/pro-components';
import { message } from 'antd';
import { useCallback, useRef, useState } from 'react';

type CurrentEntity = API.CurrentConcept;

const handleRemove = async (concepts: Partial<CurrentEntity>[]) => {
  const hide = message.loading('Loading');
  if (concepts.length <= 0) return true;
  try {
    await removeConcepts({
      key: concepts.map((row) => row?.id ?? '00000'),
    });
    hide();
    message.success('Deleted successfully and will refresh soon');
    return true;
  } catch (error) {
    hide();
    message.error('Delete failed, please try again');
    return false;
  }
};

const usePage = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<CurrentEntity>();
  const [selectedRows, setSelectedRows] = useState<CurrentEntity[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const onClick = useCallback((): void => {}, []);

  const _handleRemove = async () => {
    if (selectedRows.length > 0) {
      await handleRemove(selectedRows);
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
    }
    return true;
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: CurrentEntity[]) => {
      setSelectedRows(selectedRows);
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  const _handleCancelModal = (): void => {
    setModalOpen(false);
  };

  const _handleOnLoad = (): void => {
    setSelectedRows([]);
    setSelectedRowKeys([]);
  };

  return {
    selectedRows,
    rowSelection,
    actionRef,
    modalOpen,
    setModalOpen,
    currentRow,
    setCurrentRow,
    onClick,
    _handleOnLoad,
    _handleCancelModal,
    _handleRemove,
  };
};

export default usePage;
