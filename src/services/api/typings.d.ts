declare namespace API {
  type ResponseError = { response: { data: { message: string } } };

  type Address = {
    street: string;
    city: string;
    state: string;
    zip: string;
    phone: string;
    phone2?: string;
    phone3?: string;
  };

  type CurrentBorrower = {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    address: Address;
  };

  type CurrentUser = {
    id: number;
    name: string;
    email: string;
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

  type Product = {
    id: number;
    name: string;
    hasDuration: boolean;
    hasDeactivateDate: boolean;
    hasTrades: boolean;
    hasCountries: boolean;
    hasPorts: boolean;
    isActive: boolean;
  };

  type CurrentSubscription = {
    id: number;
    hasImpo: boolean;
    hasExpo: boolean;
    canEditReports: boolean;
    initialDate: string;
    finalDate: string;
    months: number;
    countries: string;
    ports: string;
    user: CurrentUser;
    product: Product;
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

  type PageParams = {
    current?: number;
    pageSize?: number;
  };
}
