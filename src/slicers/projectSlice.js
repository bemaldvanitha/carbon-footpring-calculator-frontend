import { PROJECT_URL } from "../configuration";
import { apiSlice } from "./apiSlice";

const getToken = () => localStorage.getItem('token');

export const projectSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchProjects: builder.query({
            query: () => ({
                url: PROJECT_URL,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        }),
        fetchProjectsByCategory: builder.query({
            query: (categoryId) => ({
                url: `${PROJECT_URL}/category/${categoryId}`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        }),
        fetchSingleProject: builder.query({
            query: (projectId) => ({
                url: `${PROJECT_URL}/${projectId}`,
                headers: {
                    'Authorization': getToken()
                }
            }),
            keepUnusedDataFor: 10
        })
    })
});

export const { useFetchProjectsQuery, useFetchProjectsByCategoryQuery, useFetchSingleProjectQuery } = projectSlice;