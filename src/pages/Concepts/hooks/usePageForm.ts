import { message } from 'antd';

import { addConcept, editConcept } from '@/services/api/concepts/api';

type CurrentEntity = API.CurrentConcept;

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

type Props = {
  onFinish: () => void;
};

const usePageForm = ({ onFinish }: Props) => {
  const _handleSubmitForm = async (value: CurrentEntity) => {
    const { id } = value;
    const isEditing = id ?? false;
    const rowValues: CurrentEntity = {
      ...value,
      conceptType: !!value.conceptType ? value.conceptType : API.ConceptEnumType.CREDIT,
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

  return { _handleSubmitForm };
};

export default usePageForm;
