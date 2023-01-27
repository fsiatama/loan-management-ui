import { ProColumns } from '@ant-design/pro-components';
import { FormattedMessage } from '@umijs/max';
import useCompanies from '../hooks/useCompanies';

const CompanyGridColumns = (): ProColumns<API.CurrentCompany>[] => {
  const { setCurrentRow, setModalOpen } = useCompanies({});

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

  return columns;
};

export default CompanyGridColumns;
