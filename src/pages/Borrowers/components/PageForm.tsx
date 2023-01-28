import { ModalForm, ProFormText } from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Col, Input, Row } from 'antd';
import React from 'react';
import usePageForm from '../hooks/usePageForm';

type CurrentEntity = API.CurrentBorrower;

export type FormValueType = Partial<CurrentEntity>;

export type PageFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onFinish: () => void;
  formModalOpen: boolean;
  values: CurrentEntity | undefined;
};

const PageForm: React.FC<PageFormProps> = ({ formModalOpen, values, onCancel, onFinish }) => {
  const intl = useIntl();
  const { _handleSubmitForm, companiesNamesList } = usePageForm({ onFinish });
  return (
    <ModalForm
      title={intl.formatMessage({
        id: 'pages.borrowersGrid.createForm.new',
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
                  message: (
                    <FormattedMessage id="pages.borrowersGrid.updateForm.user.firstName.required" />
                  ),
                },
              ]}
              name="firstName"
              label={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.firstName',
              })}
            />
          </Col>
          <Col span={12}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.borrowersGrid.updateForm.user.lastName.required" />
                  ),
                },
              ]}
              name="lastName"
              label={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.lastName',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
      <ProFormText
        rules={[
          {
            required: true,
            message: <FormattedMessage id="pages.borrowersGrid.updateForm.user.email.required" />,
          },
        ]}
        name="email"
        label={intl.formatMessage({
          id: 'pages.borrowersGrid.updateForm.user.email',
        })}
      />
      <ProFormText
        rules={[
          {
            required: true,
            message: (
              <FormattedMessage id="pages.borrowersGrid.updateForm.user.address.street.required" />
            ),
          },
        ]}
        name={['address', 'street']}
        label={intl.formatMessage({
          id: 'pages.borrowersGrid.updateForm.user.address.street',
        })}
      />
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={8}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.borrowersGrid.updateForm.user.address.city.required" />
                  ),
                },
              ]}
              name={['address', 'city']}
              label={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.city',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.city',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.borrowersGrid.updateForm.user.address.state.required" />
                  ),
                },
              ]}
              name={['address', 'state']}
              label={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.state',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.borrowersGrid.updateForm.user.address.zip.required" />
                  ),
                },
              ]}
              name={['address', 'zip']}
              label={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.zip',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={8}>
            <ProFormText
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.borrowersGrid.updateForm.user.address.phone.required" />
                  ),
                },
              ]}
              name={['address', 'phone']}
              label={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.phone',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.phone',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name={['address', 'phone2']}
              label={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.phone2',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.phone2',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormText
              name={['address', 'phone3']}
              label={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.phone3',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.borrowersGrid.updateForm.user.address.phone3',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
    </ModalForm>
  );
};

export default PageForm;
