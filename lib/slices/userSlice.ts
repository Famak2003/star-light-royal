import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { userApiSlice, systemInfoType } from "../api/userApiSlice";
import toast from "react-hot-toast";
import { userApiSlice } from "../api/userApiSlice";

export interface user {
    id: number | null,
    name: string,
    email: string,
    // lastseen: string
}

export interface usersType {
    users: user[]
}

const initialState: usersType = {
    users: [
        {
            id: null,
            email: "",
            name: "",
        }
    ]   
}

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                userApiSlice.endpoints.getUsers.matchFulfilled,
                (state, action) => {                    
                    state.users = action.payload
                }
            )
            .addMatcher(
                userApiSlice.endpoints.getUsers.matchRejected,
                () => {
                    toast.error("Something went wrong")
                }
            )
            .addMatcher(
                userApiSlice.endpoints.addUser.matchFulfilled,
                (state, action) =>{
                    console.log("Updated Successfully")
                    toast.success("Updated Successfully")
                    state.users = action.payload.users
                }
            )
            .addMatcher(
                userApiSlice.endpoints.addUser.matchRejected,
                () => {
                    toast.error("Something went wrong")
                    console.log("Failed Successfully")
                }
            )
    }
})

export default userSlice.reducer;