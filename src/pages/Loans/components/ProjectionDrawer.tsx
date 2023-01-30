import useProjection from '@/pages/Concepts/hooks/useProjection';
import { ProColumns, ProTable } from '@ant-design/pro-components';
import Field from '@ant-design/pro-field';
import { FormattedMessage } from '@umijs/max';
import { Drawer, Table, Typography } from 'antd';
import React from 'react';

type CurrentEntity = API.CurrentProjection;

const { Text } = Typography;

export type ProjectionDrawerProps = {
  loanId: string;
  showProjection: boolean;
  onClose: () => void;
};

const ProjectionDrawer: React.FC<ProjectionDrawerProps> = ({ loanId, showProjection, onClose }) => {
  const { projectionList } = useProjection({ loanId });
  const columns: ProColumns<CurrentEntity>[] = [
    {
      title: <FormattedMessage id="pages.loansGrid.projection.installment" defaultMessage="" />,
      dataIndex: 'index',
      valueType: 'index',
      align: 'center',
    },
    {
      dataIndex: 'date',
      title: <FormattedMessage id="pages.loansGrid.projection.date" defaultMessage="" />,
      valueType: 'date',
      align: 'center',
    },
    {
      dataIndex: 'beginning',
      title: <FormattedMessage id="pages.loansGrid.projection.beginning" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'monthlyAmount',
      title: <FormattedMessage id="pages.loansGrid.projection.monthlyAmount" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'toInterest',
      title: <FormattedMessage id="pages.loansGrid.projection.toInterest" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'toPrincipal',
      title: <FormattedMessage id="pages.loansGrid.projection.toPrincipal" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
    {
      dataIndex: 'ending',
      title: <FormattedMessage id="pages.loansGrid.projection.ending" defaultMessage="" />,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      align: 'right',
    },
  ];
  return (
    <Drawer
      size={'large'}
      closable={false}
      placement="bottom"
      open={showProjection}
      onClose={onClose}
    >
      <ProTable<CurrentEntity>
        columns={columns}
        dataSource={projectionList}
        rowKey="date"
        pagination={{
          showQuickJumper: true,
        }}
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
    </Drawer>
  );
};

export default ProjectionDrawer;
