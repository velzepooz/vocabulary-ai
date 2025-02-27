import { User } from '../../user/type/user-repository.type';

export type signUpDataType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type AccessTokenPayload = {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
};

export type AuthenticatedUser = Omit<User, 'password'>;

export type signInDataType = {
  email: string;
  password: string;
};
