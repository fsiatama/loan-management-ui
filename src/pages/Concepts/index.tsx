import { conceptList } from '@/services/api/concepts/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, List, Modal } from 'antd';
import React from 'react';
import PageForm from './components/PageForm';
import usePage from './hooks/usePage';

const { confirm } = Modal;

type CurrentEntity = API.CurrentConcept;

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
      title: <FormattedMessage id="pages.table.options.title" defaultMessage="" />,
      hideInSearch: true,
      key: 'option',
      width: 80,
      dataIndex: 'option',
      valueType: 'option',
      render: (dom, entity) => (
        <a
          key={'edit-row'}
          onClick={() => {
            setCurrentRow(entity);
            setModalOpen(true);
          }}
        >
          <FormattedMessage id="pages.table.options.edit" defaultMessage="" />
        </a>
      ),
    },
    {
      title: <FormattedMessage id="pages.conceptsGrid.createForm.name" defaultMessage="" />,
      dataIndex: 'name',
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.conceptsGrid.createForm.conceptType" defaultMessage="" />,
      dataIndex: 'conceptType',
      hideInSearch: true,
      responsive: ['md'],
    },
  ];

  const showDeleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        id: 'pages.conceptsTable.confirmation.delete',
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
              renderItem={(row) => (
                <List.Item>
                  <List.Item.Meta avatar={row.id} description={`${row.name}`} />
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
          id: 'pages.conceptsTable.title',
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
        request={conceptList}
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
