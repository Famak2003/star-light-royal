import { createSlice } from "@reduxjs/toolkit";
import { systemApiSlice, systemInfoType } from "../api/systemApiSlice";
import toast from "react-hot-toast";

const initialState: {systemInfo: systemInfoType} = {
    systemInfo: {
        email: "",
        id: null,
        slogan: "",
        image: "",
        phone: null
    },    
}

const systemSlice = createSlice({
    name: "systemInfo",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                systemApiSlice.endpoints.setSystemInfo.matchFulfilled,
                (state, action) => {
                    toast.success("Updated Successfully")
                    state.systemInfo = action.payload
                }
            )
            .addMatcher(
                systemApiSlice.endpoints.setSystemInfo.matchRejected,
                () => {
                    toast.error("Something went wrong")
                }
            )
            .addMatcher(
                systemApiSlice.endpoints.getSystemInfo.matchFulfilled,
                (state, action) =>{
                    state.systemInfo = action.payload
                }
            )
            .addMatcher(
                systemApiSlice.endpoints.getSystemInfo.matchRejected,
                () => {
                    toast.error("Something went wrong")
                }
            )
    }
})

export default systemSlice.reducer;