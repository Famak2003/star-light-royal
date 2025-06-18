import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { authApiSlice } from "../api/authApiSlice";
import { UserRole } from "@/constants/auth.constant";
import clearCookie from "@/utility/clearToken";


type UserType = {
  id: number;
  firstname: string | null;
  lastname: string | null;
  email: string | null;
  role: UserRole;
};

interface LoginErrorResponse {
  message: string;
  error?: string;
  statusCode?: number;
}

interface InitialStateType {
  token: string | null;
  user: Partial<UserType> | null;
}

const initialState: InitialStateType = {
  token: null,
  user: {},
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthorizationToken: (state, action) => {
        console.log(action);
      state.token = action.payload;
    },

    logoutUser: (state, action) => {
      state.token = null;
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder
        .addMatcher(
            authApiSlice.endpoints.login.matchFulfilled,
            (state, action : PayloadAction<{token: string, user: {}, message: string }>) => {
                console.log(action.payload)
                state.token = action.payload.token;
                state.user = action.payload.user; 
                window.location.reload();
            }
        )
        .addMatcher(
            authApiSlice.endpoints.login.matchRejected,
            (state, action ) => {
                const errData = action.payload?.data as LoginErrorResponse;
                // toast.error(errData?.message);
            }
        )
        .addMatcher(
            authApiSlice.endpoints.logout.matchFulfilled,
            (state, action) => {
                state.user = {};
                state.token = "";
                clearCookie("token")
                window.location.reload();
            }
        )
        .addMatcher(
            authApiSlice.endpoints.logout.matchRejected,
            (state, action) => {
                const errData = action.payload?.data as LoginErrorResponse;
                // toast.error(errData?.message);
            }
        )
        .addMatcher(
            authApiSlice.endpoints.sendOtp.matchFulfilled,
            (state, action) => {
                // toast.success("OTP sent")
                //  toast.success(<I18N children={"OTP_SENT"} />)
            }
        )
        .addMatcher(
            authApiSlice.endpoints.sendOtp.matchRejected,
            (state, action) => {
                const errData = action.payload?.data as LoginErrorResponse;
                console.log(" OTP Error ===> ",errData)
                toast.error(errData?.message);
            }
        )
        .addMatcher(
            authApiSlice.endpoints.changePassword.matchFulfilled,
            (state, action) => {
                // toast.success("Password changed")
                // toast.success(<I18N children={"OTP_SENT"} />)
            }
        )
        .addMatcher(
            authApiSlice.endpoints.changePassword.matchRejected,
            (state, action) => {
                const errData = action.payload?.data as LoginErrorResponse;
                // console.log(" Change password Error ===> ",errData)
            }
        );
    },
});

export const { setAuthorizationToken, logoutUser } = authSlice.actions;

export default authSlice.reducer;