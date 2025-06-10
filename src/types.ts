export type TUser = {
  username: string;
  password?: string;
  email?: string;
};

export type TLoginData = {
  username: string;
  password: string;
};

export type TEvent = {
  author: string;
  guest: string;
  date: string;
  description: string;
};
