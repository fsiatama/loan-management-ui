// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/**  GET /api/loanList */
export const loanList = async (
  params: {
    // query
    current?: number;
    pageSize?: number;
    borrower1?: API.CurrentBorrower;
  },
  options?: { [key: string]: any },
): Promise<API.ApiList<API.CurrentLoan>> => {
  const { borrower1, ...rest } = params;

  return request<API.ApiList<API.CurrentLoan>>('/api/loans', {
    method: 'GET',
    params: {
      ...rest,
      name: borrower1?.firstName,
    },
    ...(options || {}),
  });
};

/**  GET /api/loanStatement */
export const loanStatement = async (
  body: {
    date: string;
    id: string;
  },
  options?: { [key: string]: any },
): Promise<Blob> => {
  const { id, date } = body;
  return request<Blob>(`/api/loans/statement/${id}`, {
    method: 'GET',
    params: { date },
    responseType: 'blob',
    ...(options || {}),
  });
};

/**  GET /api/loanList */
export const loanProjection = async (
  body: Partial<API.CurrentLoan>,
  options?: { [key: string]: any },
): Promise<API.CurrentProjection[]> => {
  const { id } = body;
  return request<API.CurrentProjection[]>(`/api/loans/projection/${id}`, {
    method: 'GET',
    ...(options || {}),
  });
};

/**  GET /api/loans/statistics */
export const getStatistics = async (options?: {
  [key: string]: any;
}): Promise<API.ComparativeStatistic[]> => {
  return request<API.ComparativeStatistic[]>('/api/loans/statistics', {
    method: 'GET',
    ...(options || {}),
  });
};

/** POST /api/loans */
export const addLoan = async (
  body: Partial<API.CurrentLoan>,
  options?: { [key: string]: any },
): Promise<API.CurrentLoan> => {
  return request<API.CurrentLoan>('/api/loans', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

/** PATCH /api/loans */
export const editLoan = async (
  body: Partial<API.CurrentLoan>,
  options?: { [key: string]: any },
): Promise<API.CurrentLoan> => {
  const { id, ...rest } = body;
  return request<API.CurrentLoan>(`/api/loans/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: rest,
    ...(options || {}),
  });
};

/** DELETE /api/loan */
export async function removeLoans(body: { key: string[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/loans/batch', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
