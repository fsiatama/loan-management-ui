import { message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';

import { conceptNamesList } from '@/services/api/concepts/api';
import { addTransaction } from '@/services/api/transactions/api';

type CurrentEntity = API.CurrentLoan;

const handleAdd = async (fields: Partial<CurrentEntity>) => {
  const hide = message.loading('Loading');
  try {
    await addTransaction({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const getConceptsOptions = async (params: { keyWords: string }): Promise<DefaultOptionType[]> => {
  const { keyWords: name } = params;
  const concepts = await conceptNamesList({ name });
  if (concepts) {
    return concepts.reduce((accum: DefaultOptionType[], concept) => {
      const option: DefaultOptionType = {
        value: concept?.id,
        label: `${concept?.name} - ${concept.conceptType}`,
      };
      return [...accum, option];
    }, []);
  }
  return [];
};

type Props = {
  onFinish: () => void;
};

const useTransactionForm = ({ onFinish }: Props) => {
  const _handleSubmitForm = async (value: CurrentEntity) => {
    const rowValues: CurrentEntity = {
      ...value,
      //isActive: !!value.isActive,
    };
    const success = await handleAdd(rowValues);
    if (success) {
      onFinish();
    }
  };

  return { getConceptsOptions, _handleSubmitForm };
};

export default useTransactionForm;
