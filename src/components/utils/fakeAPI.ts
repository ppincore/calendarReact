import type { TLoginData } from "../../types";
import users from "../../../public/users.json";

export const loginUserApi = (data: TLoginData) => {
  const mockUsers = [...users];
  const res = mockUsers.find((user) => {
  return user.username === data.username && user.password === data.password
      ? true
      : false;
  });
    if (res) {
    console.log('User found:', res);
  } else {
    console.log('User not found');
  }
  return res
};
