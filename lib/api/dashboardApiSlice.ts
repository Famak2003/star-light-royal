import { apiSlice } from "."

interface InfoDataType {
    userCount: number,
    projectCount: number,
    newsCount: number,
    announcementCount: number,
    eventCount: number
}

export const dashboardApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // get dashboard info
        getInfo: builder.query<InfoDataType, void>({
            query: () => "admin/app-info",
        })
    })
})

export const {
    useGetInfoQuery,
} = dashboardApiSlice