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
        })
    })
});

export const { useFetchUserQuery } = userSlice;