// @ts-ignore
/* eslint-disable */
import { RequestData } from '@ant-design/pro-components';
import { request } from '@umijs/max';

/**  GET /api/transactionList */
export const transactionListByLoan = async (
  params: {
    // query
    loanId: string;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
): Promise<Partial<RequestData<API.CurrentProjection>>> => {
  const { loanId } = params;

  if (!!!loanId) {
    return [];
  }

  return request<Partial<RequestData<API.CurrentProjection>>>('/api/transactions', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/**  GET /api/transactionList */
/*
export const transactionTemplateList = async (
  params: {},
  options?: { [key: string]: any },
): Promise<API.ConceptTemplateList> => {
  return request<API.ConceptTemplateList>('/api/transactions/templates', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};
*/

/** POST /api/transactions */
export const addTransaction = async (
  body: Partial<API.CurrentTransaction>,
  options?: { [key: string]: any },
): Promise<API.CurrentTransaction> => {
  return request<API.CurrentTransaction>('/api/transactions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

/**  GET /api/transactions/statistics */
export const getStatistics = async (options?: { [key: string]: any }): Promise<API.Balance[]> => {
  return request<API.Balance[]>('/api/transactions/statistics', {
    method: 'GET',
    ...(options || {}),
  });
};
