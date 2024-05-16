import { CALCULATE_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

export const calculatorSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        calculate: builder.mutation({
            query: (data) => ({
                url: `${CALCULATE_URL}/calculate`,
                method: 'POST',
                body: data
            })
        })
    })
});

export const { useCalculateMutation } = apiSlice;