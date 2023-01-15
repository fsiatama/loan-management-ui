// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/**  GET /api/companyList */
export const companyList = async (
  params: {
    // query
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
): Promise<SicexAPI.CompanyList> => {
  return request<SicexAPI.CompanyList>('/api/companies', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/** POST /api/companies */
export const addCompany = async (
  body: SicexAPI.CurrentCompany,
  options?: { [key: string]: any },
): Promise<SicexAPI.CurrentCompany> => {
  return request<SicexAPI.CurrentCompany>('/api/companies', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

/**  GET /api/companies/names */
export const companiesNameList = async (
  params: {},
  options?: { [key: string]: any },
): Promise<SicexAPI.CompaniesNameList> => {
  return request<SicexAPI.CompaniesNameList>('/api/companies/names', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/** PATCH /api/companies */
export const editCompany = async (
  body: Partial<SicexAPI.CurrentCompany>,
  options?: { [key: string]: any },
): Promise<SicexAPI.CurrentCompany> => {
  const { id, ...rest } = body;
  return request<SicexAPI.CurrentCompany>(`/api/companies/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: rest,
    ...(options || {}),
  });
};

/** DELETE /api/companies */
export async function removeCompanies(body: { key: number[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/companies/batch', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
