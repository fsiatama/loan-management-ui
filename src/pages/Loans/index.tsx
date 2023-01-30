import { loanList } from '@/services/api/loans/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, List, Modal } from 'antd';
import React from 'react';
import PageForm from './components/PageForm';
import ProjectionDrawer from './components/ProjectionDrawer';
import usePage from './hooks/usePage';

const { confirm } = Modal;

type CurrentEntity = API.CurrentLoan;

const UsersList: React.FC = () => {
  const intl = useIntl();
  const {
    selectedRows,
    rowSelection,
    actionRef,
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
      render: (dom, entity) => [
        <a
          key={'edit-row'}
          onClick={() => {
            setCurrentRow(entity);
            setModalOpen(true);
          }}
        >
          <FormattedMessage id="pages.table.options.edit" defaultMessage="" />,
        </a>,
        <a
          key={'projection-row'}
          onClick={() => {
            setCurrentRow(entity);
            setDrawerOpen(true);
          }}
        >
          <FormattedMessage id="pages.table.options.projection" defaultMessage="" />,
        </a>,
      ],
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.borrower1" defaultMessage="" />,
      dataIndex: ['borrower1', 'firstName'],
      ellipsis: true,
      render: (dom, entity) => {
        const name = entity?.borrower1
          ? `${entity?.borrower1.firstName}  ${entity?.borrower1.lastName}`
          : '';
        return <>{name}</>;
      },
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.startDate" defaultMessage="" />,
      dataIndex: 'startDate',
      valueType: 'date',
      hideInSearch: true,
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
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.monthlyAmount" defaultMessage="" />,
      dataIndex: ['terms', '0', 'monthlyAmount'],
      hideInSearch: true,
      valueType: (item) => ({
        type: 'money',
        locale: 'en-US',
      }),
      responsive: ['md'],
    },
    {
      title: <FormattedMessage id="pages.loansGrid.createForm.months" defaultMessage="" />,
      dataIndex: ['terms', '0', 'months'],
      hideInSearch: true,
      valueType: 'digit',
      responsive: ['md'],
    },
  ];

  const showDeleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        id: 'pages.loanTable.confirmation.delete',
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
          if (actionRef.current) {
            actionRef.current.reload();
          }
        }}
      />
      <ProjectionDrawer
        loanId={currentRow?.id ?? ''}
        showProjection={drawerOpen}
        onClose={() => {
          setCurrentRow(undefined);
          setDrawerOpen(false);
        }}
      />
    </PageContainer>
  );
};

export default UsersList;
