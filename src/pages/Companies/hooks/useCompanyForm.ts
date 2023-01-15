import { useEffect, useState } from 'react';
import { message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { addCompany, editCompany } from '@/services/sicex-api/companies/api';
import { userTemplateList } from '@/services/sicex-api/users/api';

const handleAdd = async (fields: SicexAPI.CurrentCompany) => {
  const hide = message.loading('Loading');
  try {
    await addCompany({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const handleEdit = async (fields: Partial<SicexAPI.CurrentCompany>) => {
  const hide = message.loading('Loading');
  try {
    await editCompany({ ...fields });
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

const getUserTemplateOptions = async (): Promise<DefaultOptionType[]> => {
  const users = await userTemplateList({});
  return users.reduce((accum: DefaultOptionType[], user) => {
    const option: DefaultOptionType = {
      value: user?.id,
      label: `${user?.id} - ${user?.name} ${user?.lastName}`,
    };
    return [...accum, option];
  }, []);
};

type Props = {
  onFinish: () => void;
};

const useCompanyForm = ({ onFinish }: Props) => {
  const [userTemplatesList, setUserTemplatesList] = useState<DefaultOptionType[]>([]);

  const _handleSubmitForm = async (value: SicexAPI.CurrentCompany) => {
    const { id } = value;
    const isEditing = id ?? false;

    let success;
    if (!isEditing) {
      success = await handleAdd(value);
    } else {
      success = await handleEdit(value);
    }
    if (success) {
      onFinish();
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const users = await getUserTemplateOptions();
      setUserTemplatesList(users);
    };
    fetchData();
  }, []);

  return { userTemplatesList, _handleSubmitForm };
};

export default useCompanyForm;
