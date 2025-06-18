import {
    BaseQueryFn,
    createApi,
    FetchArgs,
    fetchBaseQuery,
    FetchBaseQueryError,
  } from "@reduxjs/toolkit/query/react";
  import { RootState } from "../store";
import toast from "react-hot-toast";
import clearCookie from "@/utility/clearToken";

interface authorizationTokenType {
    payload: string,
    type: string
}
  
  const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
  > = async (args, api, extraOptions) => {
    // create a fetch base query instance with credentials included
    const baseQuery = fetchBaseQuery({
      baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
      credentials: "include", // include cookies when making requests
      prepareHeaders: (headers, { getState }) => {
        const state = getState() as RootState;
        const authorizationToken = state.auth.token
  
        if (authorizationToken) {
          headers.set("Authorization", `Bearer ${authorizationToken}`);
        }
        headers.set("Accept", "application/json")
        return headers;
      },
    });
  
    // Make the initial API request
    let result = await baseQuery(args, api, extraOptions);

    // Dynamically import authSlice functions to avoid circular dependency
    const { setAuthorizationToken, logoutUser } = await import("../slices/authSlice");

    const authorizationToken = result.meta?.response?.headers?.get('Authorization')
    if(authorizationToken){
        api.dispatch(setAuthorizationToken(authorizationToken.split(" ")[1]))
        document.cookie = `token=${authorizationToken}; path=/; samesite=lax`;
    }

  
    // If forbidden (401), attempt to refresh the token
    if (result.error && result.error.status === 401) {
        console.warn("Session expired. Logging out...");
        // Remove token from cookie
        clearCookie("token")
        api.dispatch(logoutUser(undefined));
        toast.error("Unauthorized");
        window.location.reload();
    }
  
    return result;
  };
  
  // Define a base URL for your API
  export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({}),
  });