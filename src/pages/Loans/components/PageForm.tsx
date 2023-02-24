import {
  ModalForm,
  ProFormDatePicker,
  ProFormDigit,
  ProFormList,
  ProFormMoney,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import { FormattedMessage, useIntl } from '@umijs/max';
import { Col, Divider, Input, List, Row } from 'antd';
import dayjs from 'dayjs';
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
  const { _handleSubmitForm, getBorrowersOptions, isEditing } = usePageForm({ onFinish, values });
  return (
    <ModalForm
      title={
        !!!isEditing ? (
          intl.formatMessage({
            id: 'pages.loansGrid.createForm.new',
            defaultMessage: '',
          })
        ) : (
          <List>
            <List.Item>
              <List.Item.Meta
                title={`${values?.borrower1.firstName} ${values?.borrower1.lastName}`}
                description={values?.borrower1.address.phone}
              />
            </List.Item>
          </List>
        )
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
      <ProFormSelect
        name={['borrower1', 'id']}
        showSearch
        hidden={isEditing}
        label={intl.formatMessage({
          id: 'pages.loansGrid.createForm.borrower1',
        })}
        rules={[
          {
            required: true,
            message: <FormattedMessage id="pages.loansGrid.createForm.borrower1.required" />,
          },
        ]}
        // @ts-ignore
        request={getBorrowersOptions}
      />
      <ProFormSelect
        name={['borrower2', 'id']}
        showSearch
        label={intl.formatMessage({
          id: 'pages.loansGrid.createForm.borrower2',
        })}
        // @ts-ignore
        request={getBorrowersOptions}
      />

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
            <ProFormDatePicker
              rules={[
                {
                  required: true,
                  message: <FormattedMessage id="pages.loansGrid.createForm.startDate.required" />,
                },
              ]}
              name="startDate"
              fieldProps={{
                defaultValue: dayjs(),
                format: 'MM/DD/YYYY',
              }}
              label={intl.formatMessage({
                id: 'pages.loansGrid.createForm.startDate',
              })}
            />
          </Col>
        </Row>
      </Input.Group>

      <Divider>Conditions</Divider>

      <ProFormList
        name="terms"
        initialValue={[
          {
            months: 0,
          },
        ]}
        creatorButtonProps={{
          position: 'bottom',
          creatorButtonText: 'Building a line',
        }}
        creatorRecord={{
          months: 0,
        }}
        min={1}
        max={1}
      >
        <Input.Group size="large">
          <Row gutter={8}>
            <Col span={8}>
              <ProFormDigit
                rules={[
                  {
                    required: true,
                    message: <FormattedMessage id="pages.loansGrid.createForm.months.required" />,
                  },
                ]}
                name="months"
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
              <ProFormDigit
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="pages.loansGrid.createForm.annualInterestRate.required" />
                    ),
                  },
                ]}
                name="annualInterestRate"
                label={intl.formatMessage({
                  id: 'pages.loansGrid.createForm.annualInterestRate',
                })}
                fieldProps={{ precision: 3, addonAfter: '%' }}
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
                name="latePaymentFee"
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
                    message: (
                      <FormattedMessage id="pages.loansGrid.createForm.paymentDay.required" />
                    ),
                  },
                ]}
                name="paymentDay"
                label={intl.formatMessage({
                  id: 'pages.loansGrid.createForm.paymentDay',
                })}
                placeholder={intl.formatMessage({
                  id: 'pages.loansGrid.createForm.paymentDay',
                })}
                fieldProps={{ precision: 0 }}
                min={1}
                max={31}
              />
            </Col>
            <Col span={8}>
              <ProFormDigit
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage id="pages.loansGrid.createForm.cutOffDay.required" />
                    ),
                  },
                ]}
                name="cutOffDay"
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
      </ProFormList>
    </ModalForm>
  );
};

export default PageForm;
