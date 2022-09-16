export interface IUser {
  user: {
    email: string;
    id: string;
  };
}

export interface IContext {
  req?: Request & IUser;
  res?: Response;
}

export interface IOAuthUser {
  user: {
    userName: string;
    userPhone: string;
    userEmail: string;
    userAddress: string;
    userGender: string;
    hashedPassword: string;
    userResidentNumber: string;
  };
}
