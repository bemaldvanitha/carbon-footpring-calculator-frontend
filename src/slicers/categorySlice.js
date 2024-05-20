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
        }),
        addCategory: builder.mutation({
            query: (data) => ({
                url: `${CATEGORY_URL}/create`,
                body: data,
                method: 'POST',
                headers: {
                    'Authorization': getToken()
                }
            })
        }),
        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': getToken()
                }
            })
        })
    })
})

export const { useFetchCategoriesQuery, useAddCategoryMutation, useDeleteCategoryMutation } = categorySlice;