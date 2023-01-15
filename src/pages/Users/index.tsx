import React from 'react';
import { Button, List, Modal } from 'antd';
import { FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { userList } from '@/services/sicex-api/users/api';
import useUsers from './hooks/useUsers';
import UserForm from './components/UserForm';

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
  } = useUsers();

  const columns: ProColumns<SicexAPI.CurrentUser>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      width: 66,
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
      title: <FormattedMessage id="pages.userGrid.updateForm.user.name" defaultMessage="" />,
      dataIndex: 'name',
      ellipsis: true,
      render: (dom, entity) => {
        return <>{`${entity.name}  ${entity.lastName}`}</>;
      },
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.user.username" defaultMessage="" />,
      dataIndex: 'username',
      copyable: true,
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.user.email" defaultMessage="" />,
      dataIndex: 'email',
      copyable: true,
      hideInSearch: true,
      responsive: ['md'],
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.company" defaultMessage="" />,
      dataIndex: ['company', 'name'],
      hideInSearch: true,
      ellipsis: true,
      responsive: ['md'],
    },
  ];

  const showDeleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        id: 'pages.userTable.confirmation.delete',
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
                  <List.Item.Meta avatar={user.id} description={`${user.name} ${user.lastName}`} />
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
      <ProTable<SicexAPI.CurrentUser, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.userTable.title',
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
        request={userList}
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
      <UserForm
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
