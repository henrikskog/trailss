import { User, UserSchema } from "../../types";

type LoginParams = {
  email: string;
  password: string;
};

type RegisterParams = {
  username: string;
  email: string;
  password: string;
};

const authApi = () => {
  const API_ROOT = "localhost:3000/api/users";
  const LOGIN_PART = "/login";
  const REGISTER_PART = "/register";

  return {
    login: async ({
      email, password,
    }: LoginParams): Promise<User | null> => {
      const response = await fetch(API_ROOT + LOGIN_PART, {
        body: JSON.stringify({
          email,
          password,
        }),
      });
      const data = await response.json();
      const parsedData = UserSchema.safeParse(data.data);

      if (parsedData.success) {
        return parsedData.data;
      } else {
        return null;
      }
    },

    register: async ({email, username, password}: RegisterParams): Promise<User | null> => {
      const response = await fetch(API_ROOT + REGISTER_PART, {
        body: JSON.stringify({
          email,
          username,
          password,
        }),
      });
      const data = await response.json();
      const parsedData = UserSchema.safeParse(data.data);

      if (parsedData.success) {
        return parsedData.data;
      } else {
        return null;
      }
    },
  };
};
export default authApi;
