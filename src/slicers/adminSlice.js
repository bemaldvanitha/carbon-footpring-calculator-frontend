import { apiSlice } from "./apiSlice";
import { ADMIN_URL } from "../configuration";

const getToken = () => localStorage.getItem('token');

export const adminSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getTotalFunding: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/all`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        }),
        getFundingByProject: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/funding_by_project`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        }),
        getFundingByCategory: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/funding_by_category`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        }),
        getFundingByUser: builder.query({
            query: () => ({
                url: `${ADMIN_URL}/funding_by_user`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        })
    })
});

export const { useGetTotalFundingQuery, useGetFundingByProjectQuery, useGetFundingByCategoryQuery, useGetFundingByUserQuery } = adminSlice;