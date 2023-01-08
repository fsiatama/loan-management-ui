declare namespace SicexAPI {
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
}
