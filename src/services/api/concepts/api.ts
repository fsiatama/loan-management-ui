// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/**  GET /api/conceptList */
export const conceptList = async (
  params: {
    // query
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
): Promise<API.ApiList<API.CurrentConcept>> => {
  return request<API.ApiList<API.CurrentConcept>>('/api/concepts', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};

/**  GET /api/conceptList */
/*
export const conceptTemplateList = async (
  params: {},
  options?: { [key: string]: any },
): Promise<API.ConceptTemplateList> => {
  return request<API.ConceptTemplateList>('/api/concepts/templates', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
};
*/

/** POST /api/concepts */
export const addConcept = async (
  body: Partial<API.CurrentConcept>,
  options?: { [key: string]: any },
): Promise<API.CurrentConcept> => {
  return request<API.CurrentConcept>('/api/concepts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
};

/** PATCH /api/concepts */
export const editConcept = async (
  body: Partial<API.CurrentConcept>,
  options?: { [key: string]: any },
): Promise<API.CurrentConcept> => {
  const { id, ...rest } = body;
  return request<API.CurrentConcept>(`/api/concepts/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: rest,
    ...(options || {}),
  });
};

/** DELETE /api/concept */
export async function removeConcepts(body: { key: string[] }, options?: { [key: string]: any }) {
  return request<Record<string, any>>('/api/concepts/batch', {
    method: 'DELETE',
    data: body,
    ...(options || {}),
  });
}
