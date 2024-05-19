import { FILE_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

const getToken = () => localStorage.getItem('token');

export const fileSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        generatePresignedUrl: builder.mutation({
            query: (data) => ({
                url: `${FILE_URL}/generate_url`,
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': getToken()
                }
            }),
        })
    })
})

export const { useGeneratePresignedUrlMutation } = fileSlice;