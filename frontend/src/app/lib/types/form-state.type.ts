import { FormFields } from '../actions/sign-up';

export type FormFieldErrors<T> = {
  [K in keyof T]?: string[];
};

export type FormState<T = FormFields> = {
  fieldErrors?: FormFieldErrors<T>;
  generalErrorMessage: string | null;
};