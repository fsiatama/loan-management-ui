import { message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useEffect, useState } from 'react';

import { borrowerNamesList } from '@/services/api/borrowers/api';
import { addLoan, editLoan } from '@/services/api/loans/api';

type CurrentEntity = API.CurrentLoan;

const handleAdd = async (fields: Partial<CurrentEntity>) => {
  const hide = message.loading('Loading');
  try {
    await addLoan({ ...fields });
    hide();
    message.success('Added successfully');
    return true;
  } catch (error) {
    hide();
    message.error('Adding failed, please try again!');
    return false;
  }
};

const handleEdit = async (fields: Partial<CurrentEntity>) => {
  const hide = message.loading('Loading');
  try {
    await editLoan({ ...fields });
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

const getBorrowersOptions = async (params: { keyWords: string }): Promise<DefaultOptionType[]> => {
  const { keyWords: name } = params;
  const borrowers = await borrowerNamesList({ name });
  if (borrowers) {
    return borrowers.reduce((accum: DefaultOptionType[], borrower) => {
      const option: DefaultOptionType = {
        value: borrower?.id,
        label: `${borrower?.firstName} ${borrower?.lastName} - ${borrower.address?.phone}`,
      };
      return [...accum, option];
    }, []);
  }
  return [];
};

type Props = {
  onFinish: () => void;
  values: CurrentEntity | undefined;
};

const usePageForm = ({ onFinish, values }: Props) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const _handleSubmitForm = async (value: CurrentEntity) => {
    const rowValues: CurrentEntity = {
      ...value,
      //isActive: !!value.isActive,
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
    if (values?.id) {
      setIsEditing(true);
    } else {
      setIsEditing(false);
    }
  }, [values]);

  return { isEditing, getBorrowersOptions, _handleSubmitForm };
};

export default usePageForm;
