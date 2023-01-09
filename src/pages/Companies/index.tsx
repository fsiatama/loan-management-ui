import React from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { PageContainer, ProColumns, ProTable } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Button } from 'antd';
import { companyList } from '@/services/sicex-api/companies/api';
import useCompanies from './hooks/useCompanies';
import CompanyForm from './components/CompanyForm';

const CompaniesList: React.FC = () => {
  const intl = useIntl();
  const { actionRef, modalOpen, setModalOpen, currentRow, setCurrentRow, _handleCancelModal } =
    useCompanies({});

  const columns: ProColumns<SicexAPI.CurrentCompany>[] = [
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
    },
    {
      title: <FormattedMessage id="pages.companyGrid.updateForm.companyUsers" defaultMessage="" />,
      dataIndex: 'totalUsersCount',
      hideInSearch: true,
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
    },
    {
      title: <FormattedMessage id="pages.companyGrid.updateForm.allowedIps" defaultMessage="" />,
      dataIndex: 'allowedIps',
      hideInSearch: true,
    },
  ];

  return (
    <PageContainer>
      <ProTable<SicexAPI.CurrentCompany, API.PageParams>
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
        toolBarRender={() => [
          <Button
            type="primary"
            key="primary"
            onClick={() => {
              setModalOpen(true);
            }}
          >
            <PlusOutlined /> <FormattedMessage id="pages.searchTable.new" defaultMessage="New" />
          </Button>,
        ]}
        request={companyList}
        columns={columns}
      />
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
