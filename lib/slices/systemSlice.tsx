import { createSlice } from "@reduxjs/toolkit";
import { systemApiSlice } from "../api/systemApiSlice";
import toast from "react-hot-toast";

const initialState = {
    systemInfo: {},    
}

const systemSlice = createSlice({
    name: "systemInfo",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                systemApiSlice.endpoints.systemInfo.matchFulfilled,
                (state, action) => {
                    toast.success("Updated Successfully")
                    state.systemInfo = action.payload
                }
            )
            .addMatcher(
                systemApiSlice.endpoints.systemInfo.matchRejected,
                () => {
                    toast.error("Something went wrong")
                }
            )
    }
})