import { rtkQueryInstance } from "services/common/rtkQueryConfig";

export interface LoginData {
  email: string;
  password: string;
}

export const loginApi = rtkQueryInstance.injectEndpoints({
  endpoints: (build) => ({
    postLogin: build.mutation({
      query: (body: LoginData) => ({
        url: "/auth/signin",
        method: "POST",
        body,
        headers:{
          'x-api-key': 'yourcode',
        }
      }),
    }),
  }),
});

export const { usePostLoginMutation } = loginApi;
