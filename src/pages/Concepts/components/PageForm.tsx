import {
  ModalForm,
  ProFormSegmented,
  ProFormSwitch,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Col, Input, Row } from 'antd';
import React from 'react';
import usePageForm from '../hooks/usePageForm';

type CurrentEntity = API.CurrentConcept;

export type FormValueType = Partial<CurrentEntity>;

export type PageFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onFinish: () => void;
  formModalOpen: boolean;
  values: CurrentEntity | undefined;
};

const PageForm: React.FC<PageFormProps> = ({ formModalOpen, values, onCancel, onFinish }) => {
  const intl = useIntl();
  const { _handleSubmitForm } = usePageForm({ onFinish });
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.conceptsGrid.createForm.new',
        defaultMessage: '',
      })}
      width="700px"
      open={formModalOpen}
      onFinish={_handleSubmitForm}
      initialValues={values}
      omitNil={false}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => onCancel(),
      }}
    >
      <ProFormText hidden name="id" />
      <ProFormTextArea
        rules={[
          {
            required: true,
            message: <FormattedMessage id="pages.conceptsGrid.createForm.name.required" />,
          },
        ]}
        name="name"
        label={intl.formatMessage({
          id: 'pages.conceptsGrid.createForm.name',
        })}
      />
      <Input.Group size="large">
        <Row justify="space-around" style={{ padding: '0 1rem' }}>
          <Col span={12}>
            <ProFormSegmented
              name="conceptType"
              bordered
              label={intl.formatMessage({
                id: 'pages.conceptsGrid.createForm.conceptType',
              })}
              request={async () => [
                {
                  label: intl.formatMessage({
                    id: 'pages.conceptsGrid.createForm.conceptType.debit',
                  }),
                  value: 'DEBIT',
                },
                {
                  label: intl.formatMessage({
                    id: 'pages.conceptsGrid.createForm.conceptType.credit',
                  }),
                  value: 'CREDIT',
                },
              ]}
            />
          </Col>
          <Col span={12}>
            <ProFormSwitch
              name="isToThirdParty"
              label={intl.formatMessage({
                id: 'pages.conceptsGrid.createForm.conceptType.isToThirdParty',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
    </ModalForm>
  );
};

export default PageForm;
