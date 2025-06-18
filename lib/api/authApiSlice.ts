import { apiSlice } from ".";

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    // login admin
    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/auth",
        method: "POST",
        body: { email, password },
      }),
    }),

    // create user
    createUser: builder.mutation({
      query: ({ email, role }) => ({
        url: "/users",
        method: "POST",
        body: { email, role },
      }),
    }),

    // logout
    logout: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),

    // otp
    sendOtp: builder.mutation({
      query: ({ email }) => ({
        url: "/auth/refresh-token",
        method: "POST",
        body: { email },
      }),
    }),

    // Reset password
    changePassword: builder.mutation({
      query: ({ token, email, password, password_confirmation }) => ({
        url: `/auth/reset-password/${token}`,
        method: "POST",
        body: { token, email, password, password_confirmation },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useCreateUserMutation,
  useLogoutMutation,
  useSendOtpMutation,
  useChangePasswordMutation, 
} = authApiSlice;