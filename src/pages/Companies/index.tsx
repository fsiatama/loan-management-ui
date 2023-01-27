import { companyList } from '@/services/api/companies/api';
import { ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { FooterToolbar, PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, List, Modal } from 'antd';
import React from 'react';
import CompanyForm from './components/CompanyForm';
import useCompanies from './hooks/useCompanies';

const { confirm } = Modal;

const CompaniesList: React.FC = () => {
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
  } = useCompanies();

  const columns: ProColumns<API.CurrentCompany>[] = [
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.companyId" defaultMessage="" />,
      dataIndex: 'nit',
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              console.log(entity);

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
      title: <FormattedMessage id="pages.userGrid.updateForm.company" defaultMessage="" />,
      dataIndex: 'name',
      ellipsis: true,
      width: 260,
    },
    {
      title: <FormattedMessage id="pages.companyGrid.updateForm.companyUsers" defaultMessage="" />,
      dataIndex: 'totalUsersCount',
      hideInSearch: true,
      align: 'center',
    },
    {
      title: <FormattedMessage id="pages.companyGrid.updateForm.userTemplate" defaultMessage="" />,
      dataIndex: ['userTemplate', 'name'],
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <>{`${entity.userTemplate?.id ?? ''} - ${entity.userTemplate?.name ?? ''}  ${
            entity.userTemplate?.lastName ?? ''
          }`}</>
        );
      },
      ellipsis: true,
    },
    {
      title: <FormattedMessage id="pages.companyGrid.updateForm.allowedIps" defaultMessage="" />,
      dataIndex: 'allowedIps',
      hideInSearch: true,
      ellipsis: true,
    },
  ];

  const showDeleteConfirm = () => {
    confirm({
      title: intl.formatMessage({
        id: 'pages.companyTable.confirmation.delete',
        defaultMessage: '',
      }),
      icon: <ExclamationCircleFilled />,
      content: (() => {
        return (
          <>
            <List
              size="small"
              dataSource={selectedRows}
              renderItem={(company) => (
                <List.Item>
                  <List.Item.Meta avatar={company.nit} description={company.name} />
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
      <ProTable<API.CurrentCompany, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.companyTable.title',
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
        request={companyList}
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
      <CompanyForm
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

export default CompaniesList;
