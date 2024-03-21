export interface User {
    accountNonLocked: boolean;
    email: string;
    profilePath: string;
    id: number;
    fullName: string;
    userType : string;
    isExternal: boolean;
    remainingAmount: number;
  }