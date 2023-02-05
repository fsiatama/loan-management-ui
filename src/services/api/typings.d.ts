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

  enum ConceptEnumType {
    DEBIT = 'DEBIT',
    CREDIT = 'CREDIT',
  }

  type CurrentBorrower = {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    address: Address;
  };

  type LoanTerm = {
    id: string;
    months: number;
    annualInterestRate: number;
    latePaymentFee: number;
    beginToApplyDate?: number;
    cutOffDay: number;
  };

  type CurrentLoan = {
    id: string;
    borrower1: CurrentBorrower;
    borrower2?: CurrentBorrower;
    amount: number;
    startDate: number;
    terms: LoanTerm[];
  };

  type CurrentTransaction = {
    id: string;
    description: string;
    amount: number;
    date: number;
    concept: CurrentConcept;
    loan: CurrentLoan;
  };

  type CurrentConcept = {
    id: string;
    name: string;
    conceptType: ConceptEnumType;
  };

  type CurrentUser = {
    id: string;
    name: string;
    email: string;
  };

  type CurrentProjection = {
    date: number;
    initBalance: number;
    ideaPayment: number;
    realPayment: number;
    appliedToInterest: number;
    appliedToPrincipal: number;
    endingBalance: number;
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

  type ApiList<T> = {
    data?: T[];
    total?: number;
    success?: boolean;
  };
  type UserTemplateList = Partial<CurrentUser>[];
  type BorrowerNamesList = Partial<CurrentBorrower>[];

  type PageParams = {
    current?: number;
    pageSize?: number;
  };

  type ComparativeStatistic = {
    id: number;
    value: number;
    prevValue: number;
    unit: string;
  };
}
