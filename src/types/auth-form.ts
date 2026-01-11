export type SigninForm = {
  email: string;
  password: string;
};

export type SignupForm = SigninForm & {
  confirmPassword: string;
  username: string;
};
