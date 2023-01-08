// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** POST /api/auth/login */
export async function login(body: SicexAPI.LoginParams, options?: { [key: string]: any }) {
  return request<SicexAPI.LoginResult>('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
