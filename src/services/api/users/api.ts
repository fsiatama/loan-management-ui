// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /api/currentUser */
export const currentUser = async (options?: { [key: string]: any }): Promise<API.CurrentUser> => {
  return request<API.CurrentUser>('/api/users/profile', {
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
): Promise<API.UserList> => {
  return request<API.UserList>('/api/users', {
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
): Promise<API.UserTemplateList> => {
  return request<API.UserTemplateList>('/api/users/templates', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/** POST /api/users */
export const addUser = async (
  body: Partial<API.CurrentUser>,
  options?: { [key: string]: any },
): Promise<API.CurrentUser> => {
  return request<API.CurrentUser>('/api/users', {
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
  body: Partial<API.CurrentUser>,
  options?: { [key: string]: any },
): Promise<API.CurrentUser> => {
  const { id, ...rest } = body;
  return request<API.CurrentUser>(`/api/users/${id}`, {
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
