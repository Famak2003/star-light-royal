import { sectionData } from "@/app/dashboard/components/AddSection"
import { apiSlice } from "."

export const sectionApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        createSection:  builder.mutation<sectionData, {id: number, obj: {}}>({
            query: (data)=> ({
                url: `sections/${data?.id}`,
                method: "POST",
                body: data?.obj
            }) 
        }),
        editSection: builder.mutation({
            query: (data)=> ({
                url: `sections/${data?.id}`,
                method: "POST",
                body: data?.obj
            })
        }),
        deleteSection: builder.mutation({
            query: (data)=> ({
                url: `sections/${data?.id}`,
                method: "DELETE",
                body: data?.obj
            })
        })
    })
})

export const {
    useCreateSectionMutation,
    useEditSectionMutation,
    useDeleteSectionMutation
} = sectionApiSlice