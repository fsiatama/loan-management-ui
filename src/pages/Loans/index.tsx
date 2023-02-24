import { loanList } from '@/services/api/loans/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, List, Modal, Space } from 'antd';
import React from 'react';
import LoanDetailsDrawer from './components/LoanDetailsDrawer';
import PageForm from './components/PageForm';
import usePage from './hooks/usePage';

const { confirm } = Modal;

type CurrentEntity = API.CurrentLoan;

const UsersList: React.FC = () => {
  const intl = useIntl();
  const {
    selectedRows,
    rowSelection,
    actionRef,
    actionProjectionRef,
    modalOpen,
    setModalOpen,
    currentRow,
    drawerOpen,
    setDrawerOpen,
    setCurrentRow,
    _handleOnLoad,
    _handleCancelModal,
    _handleRemove,
  } = usePage();

  const columns: ProColumns<CurrentEntity>[] = [
    {
      title: <FormattedMessage id="pages.table.options.title" defaultMessage="" />,
      hideInSearch: true,
      key: 'option',
      width: 120,
      dataIndex: 'option',
      valueType: 'option',
      render: (dom, entity) => (
        <Space size="small">
          <a
            key={'edit-row'}
            onClick={() => {
              setCurrentRow(entity);
              setModalOpen(true);
            }}
          >
            <FormattedMessage id="pages.table.options.edit" defaultMessage="" />
          </a>
          <a
            key={'projection-row'}
            onClick={() => {
              setCurrentRow(entity);
              if (actionProjectionRef.current) {
                actionProjectionRef.current.reload();
              }
              setDrawerOpen(true);
            }}
          >
            <FormattedMessage id="pages.table.options.details" defaultMessage="" />
          </a>
        </Space>
      ),
    },
    {
      title: '',
      hideInSearch: true,
      dataIndex: 'status',
      valueType: 'radio',
      initialValue: 'all',
      width: 20,
      renderText: (text, entity) => {
        return entity.balance.amountInArrears > 0 ? 'error' : 'online';
      },
      valueEnum: {
        online: { text: '', status: 'Success' },
        error: { text: '', status: 'Error' },
      },
    },
    {
      title: (
        <FormattedMessage id="pages.loansGrid.createForm.currentInstallment" defaultMessage="" />
      ),
      hideInSearch: true,
      dataIndex: ['balance', 'installment'],
      width: 120,
      align: 'center',
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.borrower1" defaultMessage="" />,
      dataIndex: ['borrower1', 'firstName'],
      ellipsis: true,
      render: (dom, entity) => {
        const name = entity?.borrower1
          ? `${entity?.borrower1.lastName}  ${entity?.borrower1.firstName}`
          : '';
        return <>{name}</>;
      },
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.amount" defaultMessage="" />,
      dataIndex: 'amount',
      hideInSearch: true,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      responsive: ['md'],
      align: 'right',
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.principalAmount" defaultMessage="" />,
      dataIndex: ['balance', 'amountToPrincipal'],
      hideInSearch: true,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      responsive: ['md'],
      align: 'right',
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.interestAmount" defaultMessage="" />,
      dataIndex: ['balance', 'amountToInterest'],
      hideInSearch: true,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      responsive: ['md'],
      align: 'right',
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.progress" defaultMessage="" />,
      dataIndex: ['terms', '0', 'months'],
      key: 'progress',
      hideInSearch: true,
      width: 120,
      align: 'right',
      renderText: (text, entity) => {
        return ((entity.balance.amountToPrincipal / entity.amount) * 100).toFixed(1);
      },
      valueType: (item) => ({
        type: 'percent',
        precision: 2,
      }),
    },
  ];

  const showDeleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        id: 'pages.loansTable.confirmation.delete',
        defaultMessage: '',
      }),
      icon: <ExclamationCircleFilled />,
      content: (() => {
        return (
          <>
            <List
              size="small"
              bordered={true}
              dataSource={selectedRows}
              renderItem={(loan) => (
                <List.Item>
                  <List.Item.Meta
                    avatar={loan.id}
                    description={`${loan.borrower1.firstName} ${loan.borrower1.lastName}`}
                  />
                </List.Item>
              )}
            />
          </>
        );
      })(),
      okType: 'danger',
      onOk() {
        _handleRemove();
      },
    });
  };

  return (
    <PageContainer>
      <ProTable<CurrentEntity, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.loansTable.title',
          defaultMessage: '',
        })}
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 1,
          filterType: 'query',
        }}
        options={{
          density: false,
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setCurrentRow(undefined);
              setModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={loanList}
        onLoad={_handleOnLoad}
        columns={columns}
        size="small"
        tableLayout="fixed"
        rowSelection={rowSelection}
      />
      {selectedRows?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage id="pages.searchTable.selected" defaultMessage="select" />{' '}
              <span style={{ fontWeight: 600 }}>{selectedRows.length}</span>{' '}
              <FormattedMessage id="pages.searchTable.item" defaultMessage="" />
            </div>
          }
        >
          <Button danger onClick={showDeleteConfirm}>
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
        </FooterToolbar>
      )}
      <PageForm
        onCancel={_handleCancelModal}
        formModalOpen={modalOpen}
        values={currentRow}
        onFinish={() => {
          setModalOpen(false);
          setCurrentRow(undefined);
          if (actionRef.current) {
            actionRef.current.reload();
          }
          if (actionProjectionRef.current) {
            actionProjectionRef.current.reload();
          }
        }}
      />
      <LoanDetailsDrawer
        loan={currentRow}
        showProjection={drawerOpen}
        actionRef={actionProjectionRef}
        onClose={() => {
          setCurrentRow(undefined);
          setDrawerOpen(false);
        }}
      />
    </PageContainer>
  );
};

export default UsersList;
