import {
  ModalForm,
  ProFormSegmented,
  ProFormSelect,
  ProFormSwitch,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Col, Input, Row } from 'antd';
import React from 'react';
import useUserForm from '../hooks/useUserForm';

export type FormValueType = Partial<API.CurrentUser>;

export type UserFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onFinish: () => void;
  formModalOpen: boolean;
  values: API.CurrentUser | undefined;
};

const UserForm: React.FC<UserFormProps> = ({ formModalOpen, values, onCancel, onFinish }) => {
  const intl = useIntl();
  const { _handleSubmitForm, companiesNamesList } = useUserForm({ onFinish });
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.userGrid.createForm.newUser',
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
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={12}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.userGrid.updateForm.user.name.required" />,
                },
              ]}
              name="name"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.name',
              })}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.userGrid.updateForm.user.lastName.required" />
                  ),
                },
              ]}
              name="lastName"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.lastName',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
      <ProFormText
        rules={[
          {
            required: true,
            message: <FormattedMessage id="pages.userGrid.updateForm.user.email.required" />,
          },
        ]}
        name="email"
        label={intl.formatMessage({
          id: 'pages.userGrid.updateForm.user.email',
        })}
      />
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={12}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.userGrid.updateForm.user.username.required" />
                  ),
                },
              ]}
              name="username"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.username',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.username',
              })}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.userGrid.updateForm.user.password.required" />
                  ),
                },
              ]}
              name="password"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.password',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
      <ProFormSegmented
        name="langId"
        bordered
        label={intl.formatMessage({
          id: 'pages.userGrid.updateForm.user.lang',
        })}
        request={async () => [
          {
            label: intl.formatMessage({
              id: 'pages.userGrid.updateForm.user.lang.ES',
            }),
            value: 1,
          },
          {
            label: intl.formatMessage({
              id: 'pages.userGrid.updateForm.user.lang.EN',
            }),
            value: 4,
          },
        ]}
      />
      <ProFormSelect
        name={['company', 'id']}
        showSearch
        label={intl.formatMessage({
          id: 'pages.userGrid.updateForm.company',
        })}
        options={companiesNamesList}
        rules={[
          {
            required: true,
            message: <FormattedMessage id="pages.userGrid.updateForm.company.required" />,
          },
        ]}
      />
      <Input.Group size="large">
        <Row justify="space-evenly" style={{ padding: '0 1rem' }}>
          <Col span={8}>
            <ProFormSwitch
              name="isRoot"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.isRoot',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormSwitch
              name="isActive"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.isActive',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormSwitch
              name="isTemplate"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.isTemplate',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
      <Input.Group size="large">
        <Row justify="space-evenly" style={{ padding: '0 1rem' }}>
          <Col span={8}>
            <ProFormSwitch
              name="canDownload"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.canDownload',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormSwitch
              name="canRenovate"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.canRenovate',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormSwitch
              name="useMfa"
              label={intl.formatMessage({
                id: 'pages.userGrid.updateForm.user.useMfa',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
    </ModalForm>
  );
};

export default UserForm;
