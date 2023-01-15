// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /api/currentUser */
export const currentUser = async (options?: {
  [key: string]: any;
}): Promise<SicexAPI.CurrentUser> => {
  return request<SicexAPI.CurrentUser>('/api/users/profile', {
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
): Promise<SicexAPI.UserList> => {
  return request<SicexAPI.UserList>('/api/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/**  GET /api/userList */
export const userTemplateList = async (
  params: {},
  options?: { [key: string]: any },
): Promise<SicexAPI.UserTemplateList> => {
  return request<SicexAPI.UserTemplateList>('/api/users/templates', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/** POST /api/users */
export const addUser = async (
  body: Partial<SicexAPI.CurrentUser>,
  options?: { [key: string]: any },
): Promise<SicexAPI.CurrentUser> => {
  return request<SicexAPI.CurrentUser>('/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

/** PATCH /api/users */
export const editUser = async (
  body: Partial<SicexAPI.CurrentUser>,
  options?: { [key: string]: any },
): Promise<SicexAPI.CurrentUser> => {
  const { id, ...rest } = body;
  return request<SicexAPI.CurrentUser>(`/api/users/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: rest,
    ...(options || {}),
  });
};

/** DELETE /api/user */
export async function removeUsers(body: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/users/batch', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
