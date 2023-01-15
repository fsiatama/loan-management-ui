declare namespace SicexAPI {
  type ResponseError = { response: { data: { message: string } } };
  type CurrentUser = {
    access: string;
    id: number;
    langId: number;
    city: string;
    phone: string;
    name: string;
    lastName: string;
    username: string;
    email: string;
    isRoot: boolean;
    isActive: boolean;
    canRenovate: boolean;
    canDownload: boolean;
    useMfa: boolean;
    isTemplate: boolean;
    company: CurrentCompany;
  };

  type CurrentCompany = {
    id: number;
    name: string;
    nit: string;
    digcheq: string;
    allowedIps: string;
    userTemplateId: number;
    userTemplate: CurrentUser;
    totalUsersCount: number;
  };

  type LoginResult = {
    status?: string;
    type?: string;
    access_token?: string;
    user: CurrentUser;
  };

  type LoginParams = {
    username?: string;
    password?: string;
  };

  type UserList = {
    data?: CurrentUser[];
    total?: number;
    success?: boolean;
  };
  type UserTemplateList = Partial<CurrentUser>[];

  type CompanyList = {
    data?: CurrentCompany[];
    total?: number;
    success?: boolean;
  };
  type CompaniesNameList = Partial<CurrentCompany>[];
}
