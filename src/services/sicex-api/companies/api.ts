// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/**  GET /api/companyList */
export async function companyList(
  params: {
    // query
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<SicexAPI.CompanyList>('/api/companies', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** POST /api/companies */
export async function addCompany(body: SicexAPI.CurrentCompany, options?: { [key: string]: any }) {
  return request<SicexAPI.CurrentCompany>('/api/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}
