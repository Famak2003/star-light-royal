import { combineReducers } from "@reduxjs/toolkit";
import dashboardSliceReducer from '@/lib/slices/dashboardSlice'

const AppReducers = combineReducers(
    {
        dashboard: dashboardSliceReducer
    }
)

export default AppReducers