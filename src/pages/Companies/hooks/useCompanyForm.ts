import { message } from 'antd';
import { RequestOptionsType } from '@ant-design/pro-components';

import { addCompany } from '@/services/sicex-api/companies/api';
import { userTemplateList } from '@/services/sicex-api/users/api';

const _handleAdd = async (fields: SicexAPI.CurrentCompany) => {
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

type Props = {
  onFinish: () => void;
};

const useCompanyForm = ({ onFinish }: Props) => {
  const _handleSubmitForm = async (value: SicexAPI.CurrentCompany) => {
    console.log(value);

    const success = await _handleAdd(value);
    if (success) {
      // onFinish();
    }
  };

  const _getUserTemplateOptions = async (): Promise<RequestOptionsType[]> => {
    const users = await userTemplateList({});
    return users.reduce((accum: RequestOptionsType[], user) => {
      const option: RequestOptionsType = {
        value: user?.id,
        label: `${user?.id} - ${user?.name} ${user?.lastName}`,
      };
      return [...accum, option];
    }, []);
  };

  return { _handleAdd, _handleSubmitForm, _getUserTemplateOptions };
};

export default useCompanyForm;
