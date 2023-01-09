import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button, Input } from 'antd';
import { userList } from '@/services/sicex-api/users/api';

const UsersList: React.FC = () => {
  const intl = useIntl();
  const columns: ProColumns<SicexAPI.CurrentUser>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      hideInSearch: true,
      render: (dom, entity) => {
        return (
          <a
            onClick={() => {
              // setCurrentRow(entity);
              // setShowDetail(true);
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
      render: (dom, entity) => {
        return <>{`${entity.name}  ${entity.lastName}`}</>;
      },
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.user.username" defaultMessage="" />,
      dataIndex: 'username',
      sorter: true,
      hideInSearch: true,
      renderText: (val: string) =>
        `${val}${intl.formatMessage({
          id: 'pages.searchTable.tenThousand',
          defaultMessage: ' ',
        })}`,
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.user.email" defaultMessage="" />,
      dataIndex: 'email',
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.companyId" defaultMessage="" />,
      dataIndex: ['company', 'nit'],
      hideInSearch: true,
    },
    {
      title: <FormattedMessage id="pages.userGrid.updateForm.company" defaultMessage="" />,
      dataIndex: ['company', 'name'],
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<SicexAPI.CurrentUser, API.PageParams>
        headerTitle={intl.formatMessage({
          id: 'pages.userTable.title',
          defaultMessage: '',
        })}
        // actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 1,
          filterType: 'query',
        }}
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              //handleModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={userList}
        columns={columns}
      />
    </PageContainer>
  );
};

export default UsersList;
