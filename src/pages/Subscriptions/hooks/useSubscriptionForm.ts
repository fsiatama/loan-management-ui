import { useEffect, useState } from 'react';
import { message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { addUser, editUser } from '@/services/sicex-api/users/api';
import { companiesNameList } from '@/services/sicex-api/companies/api';

const handleAdd = async (fields: Partial<SicexAPI.CurrentSubscription>) => {
  const hide = message.loading('Loading');
  try {
    await addUser({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const handleEdit = async (fields: Partial<SicexAPI.CurrentSubscription>) => {
  const hide = message.loading('Loading');
  try {
    await editUser({ ...fields });
    hide();
    message.success('Edit successfully');
    return true;
  } catch (error) {
    hide();
    console.log(error);

    message.error('Editing failed, please try again!');
    return false;
  }
};

const getUserCompanyOptions = async (): Promise<DefaultOptionType[]> => {
  const companies = await companiesNameList({});
  if (companies) {
    return companies.reduce((accum: DefaultOptionType[], company) => {
      const option: DefaultOptionType = {
        value: company?.id,
        label: `${company?.nit} - ${company?.name}`,
      };
      return [...accum, option];
    }, []);
  }
  return [];
};

type Props = {
  onFinish: () => void;
};

const useSuscriptionForm = ({ onFinish }: Props) => {
  const [companiesNamesList, setCompaniesNamesList] = useState<DefaultOptionType[]>([]);
  const _handleSubmitForm = async (value: SicexAPI.CurrentSubscription) => {
    const { id } = value;
    const isEditing = id ?? false;
    const rowValues: SicexAPI.CurrentSubscription = {
      ...value,
      /*isActive: !!value.isActive,
      useMfa: !!value.useMfa,
      isRoot: !!value.isRoot,
      isTemplate: !!value.isTemplate,
      canDownload: !!value.canDownload,
      canRenovate: !!value.canRenovate,*/
    };
    let success;
    if (!isEditing) {
      success = await handleAdd(rowValues);
    } else {
      success = await handleEdit(rowValues);
    }
    if (success) {
      onFinish();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const companies = await getUserCompanyOptions();
      setCompaniesNamesList(companies);
    };
    fetchData();
  }, []);

  return { companiesNamesList, _handleSubmitForm };
};

export default useSuscriptionForm;
