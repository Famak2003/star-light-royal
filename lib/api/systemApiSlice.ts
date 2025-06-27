import { apiSlice } from "."

export interface systemInfoType {
    email: string,
    id: number | null,
    image: string,
    phone: number | null,
    slogan: string
}

export const systemApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({                
        postImage: builder.mutation({ // post image to get back url
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
        getSystemInfo: builder.query<systemInfoType, void>({   // get system info
            query: () => `sections/systeminfo`,
            keepUnusedDataFor: 0,
        }),
        setSystemInfo: builder.mutation({
            query: (data) => {
                return {
                    url: "sections/systeminfo",
                    body: data,
                    method: "PATCH"
                }
            }
        })
    })
})

export const {
    usePostImageMutation,
    useRemoveImageMutation,
    useGetSystemInfoQuery,
    useSetSystemInfoMutation
} = systemApiSlice