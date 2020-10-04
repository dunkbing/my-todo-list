export interface SignUpAccount {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  error?: Error,
}

export interface SignInAccount {
  username: string;
  email: string;
  password: string;
  error: Error;
}

export interface Error {
  message: string | null;
}