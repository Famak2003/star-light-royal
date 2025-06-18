import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface dashboardSlice {
    selectedKey: string,
    sidebarPos: string,
    isSidebarCollapsed: boolean
    isSidebarHidden: boolean
}

const initialState: dashboardSlice = {
    selectedKey: "1",
    sidebarPos: 'side',
    isSidebarCollapsed: false,
    isSidebarHidden: true
}

const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        setSelectedKey: (state, action: PayloadAction<string>) => {
            state.selectedKey = action.payload
        },
        setSidebarPos: (state, action: PayloadAction<string>) => {
            state.sidebarPos = action.payload
        },
        setisSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
            state.isSidebarCollapsed = action.payload
        },
        setisSidebarHidden: (state, action: PayloadAction<boolean>) => {
            state.isSidebarHidden = action.payload
        }
    }
})

export const {setSelectedKey, setSidebarPos, setisSidebarCollapsed, setisSidebarHidden} = dashboardSlice.actions;
export default dashboardSlice.reducer;