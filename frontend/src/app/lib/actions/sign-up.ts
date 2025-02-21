'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { sendSignUpRequest } from '../api/auth';
import { signUpUserType } from '../types/auth.types';
import { HttpRequestError } from '../utils/http-request';
import { authenticate } from '../session';
import { FormState } from '../types/form-state.type';

export type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type State = FormState<FormFields>;

const formSchema = z.object({
  firstName: z.string({
    required_error: 'Hey there! Don\'t forget to choose a name 😊',
  }).min(2, {
    message: 'Your first name should be at least 2 characters long'
  }),
  lastName: z.string({
    required_error: 'Hey there! Don\'t forget to choose a last name 😊',
  }).min(2, {
    message: 'Your last name should be at least 2 characters long'
  }),
  email: z.string({
    required_error: 'We\'ll need your email to keep in touch!',
  }).email({
    message: 'Oops! That email doesn\'t look quite right. Mind double-checking?'
  }),
  password: z.string({
    required_error: 'Let\'s create a password to protect your account',
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/, {
    message: 'Make it strong! Your password should contain at least one uppercase letter, one lowercase letter, one number, and one special character'
  }).min(8, {
    message: 'Make it strong! Your password should be at least 8 characters long'
  }).max(32, {
    message: 'Oh no! Your password should be at most 32 characters long'
  }),
  confirmPassword: z.string({
    required_error: 'Please confirm your password to ensure it matches',
  }).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,32}$/).min(8, {
    message: 'Your confirmation password needs to be at least 8 characters too'
  })
}).refine((data) => {
  return data.password === data.confirmPassword;
}, {
  message: 'Oops! Looks like these passwords are playing hide and seek! 🙈 Make sure they match perfectly!'
});

export async function signUp(_: State, formData: FormData): Promise<State> {
  const validatedFields = formSchema.safeParse({
    firstName: formData.get('firstName'),
    lastName: formData.get('lastName'),
    email: formData.get('email'),
    password: formData.get('password'),
    confirmPassword: formData.get('confirmPassword'),
  });

  if (!validatedFields.success) {
    return { fieldErrors: validatedFields.error.flatten().fieldErrors, generalErrorMessage: null };
  }

  try {
    const response = await sendSignUpRequest(validatedFields.data as signUpUserType);

    await authenticate(response.token);
  } catch (error: unknown) {
    if (error instanceof HttpRequestError) {
      if (error.status === 500) {
        return { generalErrorMessage: 'Oops! Our servers are taking a coffee break. ☕ Please try again in a moment!' };
      } else {
        return { generalErrorMessage: (error as Error).message };
      }
    }

    return { generalErrorMessage: (error as Error).message };
  }

  redirect('/home');
}


