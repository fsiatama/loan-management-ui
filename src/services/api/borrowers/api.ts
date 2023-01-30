// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /api/currentBorrower */
export const currentUser = async (options?: {
  [key: string]: any;
}): Promise<API.CurrentBorrower> => {
  return request<API.CurrentBorrower>('/api/users/profile', {
    method: 'GET',
    ...(options || {}),
  });
};

/**  GET /api/userList */
export const userList = async (
  params: {
    // query
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
): Promise<API.ApiList<API.CurrentBorrower>> => {
  return request<API.ApiList<API.CurrentBorrower>>('/api/borrowers', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/**  GET /api/userList */
export const borrowerNamesList = async (
  params: {},
  options?: { [key: string]: any },
): Promise<API.BorrowerNamesList> => {
  return request<API.BorrowerNamesList>('/api/borrowers/names', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/** POST /api/borrowers */
export const addBorrower = async (
  body: Partial<API.CurrentBorrower>,
  options?: { [key: string]: any },
): Promise<API.CurrentBorrower> => {
  return request<API.CurrentBorrower>('/api/borrowers', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

/** PATCH /api/borrowers */
export const editBorrower = async (
  body: Partial<API.CurrentBorrower>,
  options?: { [key: string]: any },
): Promise<API.CurrentBorrower> => {
  const { id, ...rest } = body;
  return request<API.CurrentBorrower>(`/api/borrowers/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: rest,
    ...(options || {}),
  });
};

/** DELETE /api/user */
export async function removeBorrowers(body: { key: string[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/borrowers/batch', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
