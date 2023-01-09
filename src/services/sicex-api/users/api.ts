// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** GET /api/currentUser */
export async function currentUser(options?: { [key: string]: any }) {
  return request<SicexAPI.CurrentUser>('/api/users/profile', {
    method: 'GET',
    ...(options || {}),
  });
}

/**  GET /api/userList */
export async function userList(
  params: {
    // query
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<SicexAPI.UserList>('/api/users', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/**  GET /api/userList */
export async function userTemplateList(params: {}, options?: { [key: string]: any }) {
  return request<SicexAPI.UserTemplateList>('/api/users/templates', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}
