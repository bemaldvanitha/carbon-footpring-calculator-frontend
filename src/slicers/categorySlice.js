import { CATEGORY_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

const getToken = () => localStorage.getItem('token');

export const categorySlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchCategories: builder.query({
            query: () => ({
                url: CATEGORY_URL,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10,
        })
    })
})

export const { useFetchCategoriesQuery } = categorySlice;