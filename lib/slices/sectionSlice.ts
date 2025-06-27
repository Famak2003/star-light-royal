import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import { systemApiSlice } from "../api/systemApiSlice";
import toast from "react-hot-toast";
import { sectionApiSlice } from "../api/sectionApiSlice";
import { sectionData } from "@/app/dashboard/components/AddSection";

interface sectionsType {
    sections: sectionData[]
}

const initialState: sectionsType = {
    sections: [],   
}

const sectionSlice = createSlice({
    name: "section",
    initialState,
    reducers: {

    },
    extraReducers: (builder) => {
        builder
            .addMatcher(
                sectionApiSlice.endpoints.createSection.matchFulfilled,
                (state, action: PayloadAction<sectionData>) => {
                    toast.success("Updated Successfully")
                    state.sections.push({...action.payload})
                }
            )
            .addMatcher(
                sectionApiSlice.endpoints.createSection.matchRejected,
                () => {
                    toast.error("Something went wrong")
                }
            )
    }
})

export default sectionSlice.reducer;
