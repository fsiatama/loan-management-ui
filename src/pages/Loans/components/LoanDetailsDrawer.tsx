import { useDimensions } from '@/hooks/useDimensions';
import { ActionType } from '@ant-design/pro-components';
import { Drawer, Space, Tabs } from 'antd';
import React from 'react';
import LoanDescription from './LoanDescription';
import ProjectionTable from './ProjectionTable';
import TransactionsTable from './TransactionsTable';

type LoanDetailsDrawerProps = {
  loan: API.CurrentLoan | undefined;
  showProjection: boolean;
  onClose: () => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const LoanDetailsDrawer: React.FC<LoanDetailsDrawerProps> = ({
  loan,
  showProjection,
  actionRef,
  onClose,
}) => {
  const { height } = useDimensions();

  return (
    <Drawer
      size={'large'}
      closable={true}
      height={height}
      placement="bottom"
      open={showProjection}
      onClose={onClose}
    >
      <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
        <LoanDescription loan={loan} actionRef={actionRef} />
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="small"
          style={{ marginBottom: 12 }}
          items={[
            {
              label: 'Projection',
              key: 'Projection',
              children: <ProjectionTable loan={loan} actionRef={actionRef} />,
            },
            {
              label: 'Transactions',
              key: 'Transactions',
              children: <TransactionsTable loanId={loan?.id ?? ''} actionRef={actionRef} />,
            },
          ]}
        />
      </Space>
    </Drawer>
  );
};

export default LoanDetailsDrawer;
