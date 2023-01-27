import { ModalForm, ProFormSelect, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Col, Input, Row } from 'antd';
import React from 'react';
import useCompanyForm from '../hooks/useCompanyForm';

export type FormValueType = Partial<API.CurrentCompany>;

export type CompanyFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onFinish: () => void;
  formModalOpen: boolean;
  values: API.CurrentCompany | undefined;
};

const CompanyForm: React.FC<CompanyFormProps> = ({ formModalOpen, values, onCancel, onFinish }) => {
  const intl = useIntl();
  const { _handleSubmitForm, userTemplatesList } = useCompanyForm({ onFinish });
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.companyGrid.createForm.newCompany',
        defaultMessage: '',
      })}
      width="600px"
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
      <ProFormText
        rules={[
          {
            required: true,
            message: <FormattedMessage id="pages.userGrid.updateForm.company.required" />,
          },
        ]}
        name="name"
        label={intl.formatMessage({
          id: 'pages.userGrid.updateForm.company',
        })}
      />
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={16}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.userGrid.updateForm.companyId.required" />,
                },
              ]}
              name="nit"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.companyId',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.userGrid.updateForm.digcheq.required" />,
                },
              ]}
              name="digcheq"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.digcheq',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
      <ProFormText
        rules={[]}
        name="allowedIps"
        label={intl.formatMessage({
          id: 'pages.companyGrid.updateForm.allowedIps',
        })}
      />
      <ProFormSelect
        name={['userTemplate', 'id']}
        showSearch
        label={intl.formatMessage({
          id: 'pages.companyGrid.updateForm.userTemplate',
        })}
        options={userTemplatesList}
      />
    </ModalForm>
  );
};

export default CompanyForm;
