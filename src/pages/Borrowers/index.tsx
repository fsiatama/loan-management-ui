import { userList } from '@/services/api/borrowers/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, List, Modal } from 'antd';
import React from 'react';
import PageForm from './components/PageForm';
import usePage from './hooks/usePage';

const { confirm } = Modal;

type CurrentEntity = API.CurrentBorrower;

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
  } = usePage();

  const columns: ProColumns<CurrentEntity>[] = [
    {
      title: <FormattedMessage id="pages.borrowersGrid.createForm.borrower" defaultMessage="" />,
      dataIndex: 'name',
      ellipsis: true,
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              setCurrentRow(entity);
              setModalOpen(true);
            }}
          >
            {`${entity.lastName}  ${entity.firstName}`}
          </a>
        );
      },
    },
    {
      title: <FormattedMessage id="pages.borrowersGrid.updateForm.user.email" defaultMessage="" />,
      dataIndex: 'email',
      copyable: true,
      hideInSearch: true,
      responsive: ['md'],
    },
    {
      title: (
        <FormattedMessage
          id="pages.borrowersGrid.updateForm.user.address.phone"
          defaultMessage=""
        />
      ),
      dataIndex: ['address', 'phone'],
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
                  <List.Item.Meta
                    avatar={user.id}
                    description={`${user.firstName} ${user.lastName}`}
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
          id: 'pages.borrowersTable.title',
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
    </PageContainer>
  );
};

export default UsersList;
