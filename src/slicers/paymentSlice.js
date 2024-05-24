import { PAYMENT_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

const getToken = () => localStorage.getItem('token');

export const paymentSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchCarbonCredits: builder.query({
            query: () => ({
                url: `${PAYMENT_URL}/carbon_credits`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        }),
        payAmount: builder.mutation({
            query: (data) => ({
                url: PAYMENT_URL,
                body: data,
                method: 'POST',
                headers: {
                    'Authorization': getToken()
                }
            })
        })
    })
});

export const { useFetchCarbonCreditsQuery, usePayAmountMutation } = paymentSlice;