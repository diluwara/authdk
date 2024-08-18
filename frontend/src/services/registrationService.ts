import { rtkQueryInstance } from "services/common/rtkQueryConfig";

export interface RegisterData {
  email: string;
  password: string;
  name: string;
  type: string;
}

export const registrationApi = rtkQueryInstance.injectEndpoints({
  endpoints: (build) => ({
    postRegistration: build.mutation({
      query: (body: RegisterData) => (console.log(body),{
        url: "/auth/signup",
        method: "POST",
        body,
        headers: {
          "x-api-key": "yourcode",
        },
      }),
    }),
  }),
});

export const { usePostRegistrationMutation } = registrationApi;
