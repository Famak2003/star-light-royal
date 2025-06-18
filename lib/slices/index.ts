import { combineReducers } from "@reduxjs/toolkit";

import dashboardReducer from "./dashboardSlice"
import authReducer from './authSlice'
import { apiSlice } from "../api";


const AllSlices = combineReducers( // Combine all reducers in the application
    {
        [apiSlice.reducerPath]: apiSlice.reducer, // automatically add apiSlice reducers.       
        dashboard: dashboardReducer,
        auth: authReducer,
    }
)

export default AllSlices