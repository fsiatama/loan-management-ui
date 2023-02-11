import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import Field from '@ant-design/pro-field';
import { useEmotionCss } from '@ant-design/use-emotion-css';
import { FormattedMessage } from '@umijs/max';
import { Table, Typography } from 'antd';
import moment from 'moment';
import * as React from 'react';
import useProjection from '../../hooks/useProjection';

type CurrentEntity = API.CurrentProjection;
const { Text } = Typography;

export type Props = {
  loan: API.CurrentLoan | undefined;
  actionRef: React.MutableRefObject<ActionType | undefined>;
};

const ProjectionTable: React.FC<Props> = ({ loan, actionRef }) => {
  const { projectionList, _handleDownload } = useProjection({ loan });

  const columns: ProColumns<CurrentEntity>[] = [
    {
      title: <FormattedMessage id="pages.loansGrid.projection.installment" defaultMessage="" />,
      dataIndex: 'installment',
      align: 'center',
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              _handleDownload(entity);
            }}
          >
            {`${entity.installment}`}
          </a>
        );
      },
    },
    {
      dataIndex: 'date',
      title: <FormattedMessage id="pages.loansGrid.projection.date" defaultMessage="" />,
      valueType: 'date',
      sorter: {
        compare: (a, b) => moment(a.date).diff(moment(b.date)),
        multiple: 1,
      },
    },
    {
      dataIndex: 'initBalance',
      title: <FormattedMessage id="pages.loansGrid.projection.beginning" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'ideaPayment',
      title: <FormattedMessage id="pages.loansGrid.projection.monthlyAmount" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'realPayment',
      title: <FormattedMessage id="pages.loansGrid.projection.realPayment" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'appliedToInterest',
      title: <FormattedMessage id="pages.loansGrid.projection.toInterest" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'appliedToPrincipal',
      title: <FormattedMessage id="pages.loansGrid.projection.toPrincipal" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'endingBalance',
      title: <FormattedMessage id="pages.loansGrid.projection.ending" defaultMessage="" />,
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
      dataSource={projectionList}
      rowKey="date"
      actionRef={actionRef}
      rowClassName={(record, index) =>
        moment().isAfter(record.date, 'month') ? pastRowClassName : 'table-row-dark'
      }
      size="small"
      tableLayout="fixed"
      pagination={{
        pageSize: 5000,
        // @ts-ignore
        position: ['none', 'none'],
      }}
      scroll={{ y: 530 }}
      toolBarRender={false}
      search={false}
      summary={(pageData) => {
        let totalIdeaPayment = 0;
        let totalRealPayment = 0;
        let totalToInterest = 0;
        let totalToPrincipal = 0;

        pageData.forEach(({ ideaPayment, realPayment, appliedToInterest, appliedToPrincipal }) => {
          totalIdeaPayment += ideaPayment;
          totalToInterest += appliedToInterest;
          totalToPrincipal += appliedToPrincipal;
          totalRealPayment += realPayment;
        });

        return (
          <Table.Summary fixed>
            <Table.Summary.Row style={{ backgroundColor: '#fafafa' }}>
              <Table.Summary.Cell align="right" index={0}>
                <Text strong>Total</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={1}></Table.Summary.Cell>
              <Table.Summary.Cell index={2}></Table.Summary.Cell>
              <Table.Summary.Cell index={3}></Table.Summary.Cell>
              <Table.Summary.Cell align="right" index={3}>
                <Field
                  text={totalRealPayment}
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
              <Table.Summary.Cell index={7}></Table.Summary.Cell>
            </Table.Summary.Row>
          </Table.Summary>
        );
      }}
    />
  );
};

export default ProjectionTable;
