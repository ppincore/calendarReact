import type { TLoginData, TUser } from "../types";
import users from "../mockdata/users.json";

export const loginUserApi = (data: TLoginData) => {
  const mockUsers = [...users];

  const res = mockUsers.find(
    (user) => user.username === data.username && user.password === data.password
  );
  if (!res) throw new Error("User not found");
  return res;
};


export const getUsers = ():TUser[] => {
  const mockUsers = users.map((user)=>({
    username: user.username,
    email: user.email
  }))
  if(!mockUsers) throw new Error("Users not found");
  return  mockUsers
}