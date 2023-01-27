import { subscriptionsList } from '@/services/api/subscriptions/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, List, Modal } from 'antd';
import React from 'react';
import SubscriptionForm from './components/SubscriptionForm';
import useSubscriptions from './hooks/useSubscriptions';

const { confirm } = Modal;

const UsersList: React.FC = () => {
  const intl = useIntl();
  const {
    selectedRows,
    rowSelection,
    actionRef,
    modalOpen,
    setModalOpen,
    currentRow,
    setCurrentRow,
    _handleOnLoad,
    _handleCancelModal,
    _handleRemove,
  } = useSubscriptions();

  const columns: ProColumns<API.CurrentSubscription>[] = [
    {
      title: '',
      dataIndex: 'id',
      hideInTable: true,
    },
    {
      title: (
        <FormattedMessage id="pages.subscriptionGrid.updateForm.productName" defaultMessage="" />
      ),
      hideInSearch: true,
      dataIndex: ['product', 'name'],
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setModalOpen(true);
            }}
          >
            {dom}
          </a>
        );
      },
    },
    {
      title: (
        <FormattedMessage id="pages.subscriptionGrid.updateForm.initialDate" defaultMessage="" />
      ),
      key: 'initDate',
      dataIndex: 'initialDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: (
        <FormattedMessage id="pages.subscriptionGrid.updateForm.finalDate" defaultMessage="" />
      ),
      key: 'endDate',
      dataIndex: 'finalDate',
      valueType: 'date',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.user.username" defaultMessage="" />,
      dataIndex: ['user', 'username'],
      copyable: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.company" defaultMessage="" />,
      dataIndex: ['user', 'company', 'name'],
      copyable: true,
      hideInSearch: true,
    },
    {
      title: '',
      dataIndex: 'created_at',
      valueType: 'dateRange',
      hideInTable: true,
      search: {
        transform: (value) => {
          return {
            initialDate: value[0],
            finalDate: value[1],
          };
        },
      },
    },
  ];

  const showDeleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        id: 'pages.subscriptionTable.confirmation.delete',
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
              renderItem={(user) => (
                <List.Item>
                  <List.Item.Meta avatar={user.id} description={`${user.product.name}`} />
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
      <ProTable<API.CurrentSubscription, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.subscriptionTable.title',
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
        request={subscriptionsList}
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
      <SubscriptionForm
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
    </PageContainer>
  );
};

export default UsersList;
