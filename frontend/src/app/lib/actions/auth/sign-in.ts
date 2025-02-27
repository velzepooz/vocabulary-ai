'use server';

import { z } from 'zod';
import { redirect } from 'next/navigation';
import { HttpRequestError } from '../../utils/http-request';
import { authenticate } from '../../session';
import { sendSignInRequest } from '../../api/auth';
import { signInUserType } from '../../types/auth.types';
import { FormState } from '../../types/form-state.type';

export type FormFields = {
  email: string;
  password: string;
};

export type State = FormState<FormFields>;

const formSchema = z.object({
  email: z.string({
    required_error: 'Hey there! Please enter your email to sign in',
  }).email({
    message: 'Hmm... that email format doesn\'t look right. Want to try again?'
  }).trim().toLowerCase(),
  password: z.string({
    required_error: 'Don\'t forget your password - we need it to let you in!',
  }).trim(),
});

export async function signIn(_: State, formData: FormData): Promise<State> {
  const validatedFields = formSchema.safeParse(Object.fromEntries(formData));

  if (!validatedFields.success) {
    return {
      fieldErrors: validatedFields.error.flatten().fieldErrors,
      generalErrorMessage: null
    };
  }

  try {
    const response = await sendSignInRequest(validatedFields.data as signInUserType);

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