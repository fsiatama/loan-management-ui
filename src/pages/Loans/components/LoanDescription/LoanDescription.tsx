import { ActionType, ProDescriptions } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button } from 'antd';
import * as React from 'react';
import useLoanDetails from '../../hooks/useLoanDetails';
import TransactionForm from '../TransactionForm';

type CurrentEntity = API.CurrentLoan;

export type Props = {
  loan: CurrentEntity | undefined;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const LoanDescription: React.FC<Props> = ({ loan, actionRef }) => {
  const { modalOpen, currentTransaction, setModalOpen, _handleCancelModal } = useLoanDetails({
    loan,
  });

  return (
    <>
      <ProDescriptions
        title="Loan History"
        size="small"
        bordered
        dataSource={loan}
        columns={[
          {
            title: (
              <FormattedMessage id="pages.borrowersGrid.createForm.borrowers" defaultMessage="" />
            ),
            key: 'text',
            render: (dom, entity) => {
              const borrower1 = entity?.borrower1
                ? `${entity?.borrower1.lastName}  ${entity?.borrower1.firstName}`
                : '';
              const borrower2 = entity?.borrower2
                ? `${entity?.borrower2.lastName}  ${entity?.borrower2.firstName}`
                : '';

              return (
                <>
                  {borrower1}
                  <br /> {borrower2}
                </>
              );
            },
          },
          {
            title: (
              <FormattedMessage
                id="pages.loansGrid.createForm.annualInterestRate"
                defaultMessage=""
              />
            ),
            key: 'annualInterestRate',
            dataIndex: ['terms', '0', 'annualInterestRate'],
            valueType: 'percent',
          },
          {
            title: <FormattedMessage id="pages.loansGrid.createForm.months" defaultMessage="" />,
            key: 'months',
            dataIndex: ['terms', '0', 'months'],
          },
          {
            title: <FormattedMessage id="pages.loansGrid.createForm.startDate" defaultMessage="" />,
            key: 'startDate',
            dataIndex: 'startDate',
            valueType: 'date',
          },
          {
            title: <FormattedMessage id="pages.loansGrid.createForm.amount" defaultMessage="" />,
            key: 'amount',
            dataIndex: 'amount',
            valueType: (item) => ({
              type: 'money',
              locale: 'en-US',
            }),
          },
        ]}
      >
        <ProDescriptions.Item label="Loan payment" valueType="percent">
          80
        </ProDescriptions.Item>
        <ProDescriptions.Item valueType="option">
          <Button
            key="primary"
            type="primary"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Make a transaction
          </Button>
        </ProDescriptions.Item>
      </ProDescriptions>
      <TransactionForm
        onCancel={_handleCancelModal}
        formModalOpen={modalOpen}
        values={currentTransaction}
        loan={loan}
        onFinish={() => {
          setModalOpen(false);
          actionRef.current?.reloadAndRest?.();
          console.log(actionRef.current);

          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
      />
    </>
  );
};

export default LoanDescription;
