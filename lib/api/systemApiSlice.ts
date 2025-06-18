import { apiSlice } from "."

interface InfoDataType {
    userCount: number,
    projectCount: number,
    newsCount: number,
    announcementCount: number,
    eventCount: number
}

export const systemApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        // post image to get back url
        postImage:  builder.mutation({
            query: (image: FormData) => ({
                url: "sections/image",
                method: "POST",
                body: image
            }) 
        }),
        removeImage: builder.mutation({
            query: (imageurl) => {
                return {
                    url: "sections/image" + imageurl,
                    method: "DELETE"
                }
            }
        }),
        systemInfo: builder.mutation({
            query: (data) => {
                return {
                    url: "systeminfo",
                    body: data,
                    method: "POST"
                }
            }
        })
    })
})

export const {
    usePostImageMutation,
    useRemoveImageMutation,
    useSystemInfoMutation
} = systemApiSlice