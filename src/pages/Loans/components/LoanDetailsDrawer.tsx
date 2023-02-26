import { useDimensions } from '@/hooks/useDimensions';
import { ActionType } from '@ant-design/pro-components';
import { Drawer, Space, Tabs } from 'antd';
import React from 'react';
import useLoanDetails from '../hooks/useLoanDetails';
import LoanDescription from './LoanDescription';
import ProjectionTable from './ProjectionTable';
import TransactionForm from './TransactionForm';
import TransactionsTable from './TransactionsTable';

type LoanDetailsDrawerProps = {
  loan: API.CurrentLoan | undefined;
  showProjection: boolean;
  onClose: () => void;
  actionRef: React.MutableRefObject<ActionType | undefined>;
  actionLoanRef: React.MutableRefObject<ActionType | undefined>;
};

const LoanDetailsDrawer: React.FC<LoanDetailsDrawerProps> = ({
  loan,
  showProjection,
  actionRef,
  actionLoanRef,
  onClose,
}) => {
  const { height } = useDimensions();

  const { modalOpen, currentTransaction, setModalOpen, _handleCancelModal } = useLoanDetails({
    loan,
  });

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
        <LoanDescription
          loan={loan}
          onNewTransaction={() => {
            setModalOpen(true);
          }}
        />
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="small"
          style={{ marginBottom: 12 }}
          items={[
            {
              label: 'Projection',
              key: 'Projection',
              children: (
                <ProjectionTable
                  loan={loan}
                  actionRef={actionRef}
                  onNewPayment={() => {
                    console.log(111);
                  }}
                />
              ),
            },
            {
              label: 'Transactions',
              key: 'Transactions',
              children: <TransactionsTable loanId={loan?.id ?? ''} actionRef={actionRef} />,
            },
          ]}
        />
      </Space>
      <TransactionForm
        onCancel={_handleCancelModal}
        formModalOpen={modalOpen}
        values={currentTransaction}
        loan={loan}
        onFinish={() => {
          setModalOpen(false);
          actionRef.current?.reloadAndRest?.();
          actionLoanRef.current?.reloadAndRest?.();
          //console.log(actionRef.current);

          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
      />
    </Drawer>
  );
};

export default LoanDetailsDrawer;
