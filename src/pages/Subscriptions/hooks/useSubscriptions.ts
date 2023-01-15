import { useCallback, useRef, useState } from 'react';
import { message } from 'antd';
import { ActionType } from '@ant-design/pro-components';
import { removeUsers } from '@/services/sicex-api/users/api';

const handleRemove = async (users: Partial<SicexAPI.CurrentSubscription>[]) => {
  const hide = message.loading('Loading');
  if (users.length <= 0) return true;
  try {
    await removeUsers({
      key: users.map((row) => row?.id ?? -1),
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

const useSubscriptions = () => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SicexAPI.CurrentSubscription>();
  const [selectedRows, setSelectedRows] = useState<SicexAPI.CurrentSubscription[]>([]);
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
    onChange: (newSelectedRowKeys: React.Key[], selectedRows: SicexAPI.CurrentSubscription[]) => {
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

export default useSubscriptions;
