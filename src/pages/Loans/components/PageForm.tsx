import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormMoney,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Col, Input, Row } from 'antd';
import React from 'react';
import usePageForm from '../hooks/usePageForm';

type CurrentEntity = API.CurrentLoan;

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
        id: 'pages.loansGrid.createForm.new',
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
          <Col span={8}>
            <ProFormMoney
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.loansGrid.createForm.amount.required" />,
                },
              ]}
              name="amount"
              label={intl.formatMessage({
                id: 'pages.loansGrid.createForm.amount',
              })}
              locale="en-US"
              min={0}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.loansGrid.createForm.months.required" />,
                },
              ]}
              name={['terms', '0', 'months']}
              fieldProps={{ precision: 0, addonAfter: 'Months' }}
              label={intl.formatMessage({
                id: 'pages.loansGrid.createForm.months',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.loansGrid.createForm.months',
              })}
            />
          </Col>
          <Col span={8}>
            <ProFormDatePicker
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.loansGrid.createForm.startDate.required" />,
                },
              ]}
              name="startDate"
              label={intl.formatMessage({
                id: 'pages.loansGrid.createForm.startDate',
              })}
            />
          </Col>
        </Row>
      </Input.Group>

      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={8}>
            <ProFormDigit
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.loansGrid.createForm.annualInterestRate.required" />
                  ),
                },
              ]}
              name={['terms', '0', 'annualInterestRate']}
              label={intl.formatMessage({
                id: 'pages.loansGrid.createForm.annualInterestRate',
              })}
              fieldProps={{ precision: 2, addonAfter: '%' }}
              min={1}
              max={100}
            />
          </Col>
          <Col span={8}>
            <ProFormMoney
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.loansGrid.createForm.latePaymentFee.required" />
                  ),
                },
              ]}
              name={['terms', '0', 'latePaymentFee']}
              label={intl.formatMessage({
                id: 'pages.loansGrid.createForm.latePaymentFee',
              })}
              locale="en-US"
              min={0}
            />
          </Col>
          <Col span={8}>
            <ProFormDigit
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.loansGrid.createForm.cutOffDay.required" />,
                },
              ]}
              name={['terms', '0', 'cutOffDay']}
              label={intl.formatMessage({
                id: 'pages.loansGrid.createForm.cutOffDay',
              })}
              placeholder={intl.formatMessage({
                id: 'pages.loansGrid.createForm.cutOffDay',
              })}
              fieldProps={{ precision: 0 }}
              min={1}
              max={31}
            />
          </Col>
        </Row>
      </Input.Group>
    </ModalForm>
  );
};

export default PageForm;
