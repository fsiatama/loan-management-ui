import { ProDescriptions } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import { Button } from 'antd';
import * as React from 'react';

type CurrentEntity = API.CurrentLoan;

export type Props = {
  loan: CurrentEntity | undefined;
  onNewTransaction: () => void;
};

const LoanDescription: React.FC<Props> = ({ loan, onNewTransaction }) => {
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
            valueType: (item) => ({
              type: 'percent',
              precision: 3,
              locale: 'en-US',
            }),
          },
          {
            title: (
              <FormattedMessage
                id="pages.loansGrid.createForm.currentInstallment"
                defaultMessage=""
              />
            ),
            key: 'installment',
            dataIndex: ['balance', 'installment'],
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
          {
            title: <FormattedMessage id="pages.loansGrid.createForm.progress" defaultMessage="" />,
            key: 'annualInterestRate',
            dataIndex: ['terms', '0', 'months'],
            renderText: (text, entity) => {
              const principal = entity?.balance?.amountToPrincipal ?? 0;
              const total = entity?.amount ?? 1;
              return ((principal / total) * 100).toFixed(1);
            },
            valueType: (item) => ({
              type: 'percent',
              precision: 2,
            }),
          },
        ]}
      >
        <ProDescriptions.Item valueType="option">
          <Button key="primary" type="primary" onClick={onNewTransaction}>
            Make a transaction
          </Button>
        </ProDescriptions.Item>
      </ProDescriptions>
    </>
  );
};

export default LoanDescription;
