import { ActionType } from '@ant-design/pro-components';
import { useCallback, useRef, useState } from 'react';

interface Props {}

const useUsers = ({}: Props) => {
  const [createModalOpen, handleModalOpen] = useState<boolean>(false);
  const [updateModalOpen, handleUpdateModalOpen] = useState<boolean>(false);
  const [showDetail, setShowDetail] = useState<boolean>(false);

  const actionRef = useRef<ActionType>();
  const [currentRow, setCurrentRow] = useState<SicexAPI.CurrentUser>();

  const onClick = useCallback((): void => {}, []);

  return { actionRef };
};

export default useUsers;
