import {
  ModalForm,
  ProFormDatePicker,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Col, Input, List, Row } from 'antd';
import React from 'react';
import useTransactionForm from '../../hooks/useTransactionForm';

type CurrentEntity = API.CurrentTransaction;

export type FormValueType = Partial<CurrentEntity>;

export type PageFormProps = {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onFinish: () => void;
  formModalOpen: boolean;
  values: Partial<CurrentEntity> | undefined;
  loan: API.CurrentLoan | undefined;
};

const TransactionForm: React.FC<PageFormProps> = ({
  formModalOpen,
  values,
  loan,
  onCancel,
  onFinish,
}) => {
  const intl = useIntl();
  const { _handleSubmitForm, getConceptsOptions } = useTransactionForm({ onFinish });
  return (
    <ModalForm
      title={
        <List>
          <List.Item>
            <List.Item.Meta
              title={`${loan?.borrower1.firstName} ${loan?.borrower1.lastName}`}
              description={loan?.borrower1.address.phone}
            />
          </List.Item>
        </List>
      }
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
      <ProFormText hidden name={['loan', 'id']} />
      <ProFormSelect
        name={['concept', 'id']}
        showSearch
        label={intl.formatMessage({
          id: 'pages.transactionsGrid.createForm.concept',
        })}
        rules={[
          {
            required: true,
            message: <FormattedMessage id="pages.transactionsGrid.createForm.concept.required" />,
          },
        ]}
        // @ts-ignore
        request={getConceptsOptions}
      />

      <Input.Group size="large">
        <Row gutter={8}>
          <Col span={8}>
            <ProFormMoney
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.transactionsGrid.createForm.amount.required" />
                  ),
                },
              ]}
              name="amount"
              label={intl.formatMessage({
                id: 'pages.transactionsGrid.createForm.amount',
              })}
              locale="en-US"
              min={0}
            />
          </Col>

          <Col span={8}>
            <ProFormDatePicker
              rules={[
                {
                  required: true,
                  message: (
                    <FormattedMessage id="pages.transactionsGrid.createForm.date.required" />
                  ),
                },
              ]}
              fieldProps={{
                format: 'MM/DD/YYYY',
              }}
              name="date"
              label={intl.formatMessage({
                id: 'pages.transactionsGrid.createForm.date',
              })}
            />
          </Col>
        </Row>
      </Input.Group>
      <ProFormTextArea
        name="description"
        label={intl.formatMessage({
          id: 'pages.transactionsGrid.createForm.description',
        })}
      />
    </ModalForm>
  );
};

export default TransactionForm;
