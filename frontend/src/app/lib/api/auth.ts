import { signUpUserType, AuthResponse, signInUserType } from '../types/auth.types';
import { HttpRequestUtil } from '../utils/http-request';

export const sendSignUpRequest = async (userData: signUpUserType): Promise<AuthResponse> => {
  const response = await HttpRequestUtil.makePostRequest<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-up`, userData);

  return response;
};

export const sendSignInRequest = async (userData: signInUserType): Promise<AuthResponse> => {
  const response = await HttpRequestUtil.makePostRequest<AuthResponse>(`${process.env.NEXT_PUBLIC_API_URL}/auth/sign-in`, userData);

  return response;
};
