import { USER_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

const getToken = () => localStorage.getItem('token');

export const userSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchUser: builder.query({
            query: () => ({
                url: `${USER_URL}/personal`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        }),
        updateUser: builder.mutation({
            query: (data) => ({
                url: USER_URL,
                body: data,
                method: 'PATCH',
                headers: {
                    'Authorization': getToken()
                }
            })
        }),
        deleteUser: builder.mutation({
            query: () => ({
                url: USER_URL,
                method: 'DELETE',
                headers: {
                    'Authorization': getToken()
                }
            })
        })
    })
});

export const { useFetchUserQuery, useUpdateUserMutation, useDeleteUserMutation } = userSlice;