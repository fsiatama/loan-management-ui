import { transactionListByLoan } from '@/services/api/transactions/api';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import Field from '@ant-design/pro-field';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage } from '@umijs/max';
import { Table, Typography } from 'antd';
import moment from 'moment';
import * as React from 'react';
import { useRef } from 'react';
import useProjection from '../../hooks/useProjection';

type CurrentEntity = API.CurrentProjection;
const { Text } = Typography;

export type Props = {
  loanId: string;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const TransactionsTable: React.FC<Props> = ({ loanId }) => {
  const { projectionList } = useProjection({ loanId });

  const actionRef = useRef<ActionType>();

  const columns: ProColumns<CurrentEntity>[] = [
    {
      title: <FormattedMessage id="pages.transactionsGrid.createForm.date" defaultMessage="" />,
      dataIndex: 'date',
      valueType: 'date',
      align: 'center',
      sorter: {
        compare: (a, b) => moment(a.date).diff(moment(b.date)),
        multiple: 1,
      },
    },
    {
      dataIndex: ['concept', 'name'],
      title: <FormattedMessage id="pages.transactionsGrid.createForm.concept" defaultMessage="" />,
    },
    {
      dataIndex: 'amount',
      title: <FormattedMessage id="pages.transactionsGrid.createForm.amount" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
  ];

  const pastRowClassName = useEmotionCss(({ token }) => {
    return {
      backgroundColor: token['gold-1'],
    };
  });

  return (
    <ProTable<CurrentEntity>
      columns={columns}
      params={{ loanId }}
      request={transactionListByLoan}
      rowKey="date"
      dateFormatter="string"
      actionRef={actionRef}
      rowClassName={(record, index) =>
        moment().isAfter(record.date, 'month') ? pastRowClassName : 'table-row-dark'
      }
      size="small"
      tableLayout="fixed"
      scroll={{ y: 530 }}
      toolBarRender={false}
      search={false}
      summary={(pageData) => {
        let totalMonthlyAmount = 0;
        let totalToInterest = 0;
        let totalToPrincipal = 0;

        pageData.forEach(({ monthlyAmount, toInterest, toPrincipal }) => {
          totalMonthlyAmount += monthlyAmount;
          totalToInterest += toInterest;
          totalToPrincipal += toPrincipal;
        });

        return (
          <Table.Summary fixed>
            <Table.Summary.Row style={{ backgroundColor: '#fafafa' }}>
              <Table.Summary.Cell align="right" index={0}>
                <Text strong>Total</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={3}>
                <Field
                  text={totalMonthlyAmount}
                  valueType={{
                    type: 'money',
                    locale: 'en-US',
                  }}
                  mode={'read'}
                />
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={4}>
                <Field
                  text={totalToInterest}
                  valueType={{
                    type: 'money',
                    locale: 'en-US',
                  }}
                  mode={'read'}
                />
              </Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={5}>
                <Field
                  text={totalToPrincipal}
                  valueType={{
                    type: 'money',
                    locale: 'en-US',
                  }}
                  mode={'read'}
                />
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6}></Table.Summary.Cell>
              <Table.Summary.Cell index={7}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};

export default TransactionsTable;
