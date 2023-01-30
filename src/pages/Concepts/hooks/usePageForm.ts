import { message } from 'antd';
import { DefaultOptionType } from 'antd/es/select';
import { useState } from 'react';

//import { companiesNameList } from '@/services/api/companies/api';
import { addConcept, editConcept } from '@/services/api/concepts/api';

type CurrentEntity = API.CurrentBorrower;

const handleAdd = async (fields: Partial<CurrentEntity>) => {
  const hide = message.loading('Loading');
  try {
    await addConcept({ ...fields });
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
    await editConcept({ ...fields });
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

/*
const getConceptCompanyOptions = async (): Promise<DefaultOptionType[]> => {
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
};*/

type Props = {
  onFinish: () => void;
};

const usePageForm = ({ onFinish }: Props) => {
  const [companiesNamesList, setCompaniesNamesList] = useState<DefaultOptionType[]>([]);
  const _handleSubmitForm = async (value: CurrentEntity) => {
    const { id } = value;
    const isEditing = id ?? false;
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

  /*
  useEffect(() => {
    const fetchData = async () => {
      const companies = await getConceptCompanyOptions();
      setCompaniesNamesList(companies);
    };
    fetchData();
  }, []);
  */

  return { companiesNamesList, _handleSubmitForm };
};

export default usePageForm;
