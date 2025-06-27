import { user } from "@/types"
import { apiSlice } from "."
import { usersType } from "../slices/userSlice"

export interface addUserType {
    id: number | null,
    name: string,
    email: string,
    // password: string
}

export const userApiSlice = apiSlice.injectEndpoints({
    overrideExisting: true,
    endpoints: (builder) => ({
        getUsers:  builder.query<user[], void>({
            query: ()=> (`users`) 
        }),
        addUser:  builder.mutation<usersType, addUserType>({
            query: (data)=> ({
                url: `users`,
                method: "POST",
                body: data
            }) 
        }),
        removeUser:  builder.mutation<void, {id: string}>({
            query: (id)=> ({
                url: `users/${id}`,
                method: "DELETE",
                // body: data
            }) 
        }),
        editUser:  builder.mutation<void, { id: number | null, obj: addUserType}>({
            query: (data)=> ({
                url: `users/${data?.id}`,
                method: "PATCH",
                body: data.obj
            })
        }),
    })
})

export const {
    useGetUsersQuery,
    useAddUserMutation,
    useRemoveUserMutation,
    useEditUserMutation
} = userApiSlice