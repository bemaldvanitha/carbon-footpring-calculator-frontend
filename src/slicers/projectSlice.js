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
        }),
        createProject: builder.mutation({
            query: (data) => ({
                url: `${PROJECT_URL}/create`,
                method: 'POST',
                body: data,
                headers: {
                    'Authorization': getToken()
                }
            })
        }),
        deleteProject: builder.mutation({
            query: (projectId) => ({
                url: `${PROJECT_URL}/${projectId}`,
                method: 'DELETE',
                headers: {
                    'Authorization': getToken()
                }
            })
        }),
        updateProject: builder.mutation({
            query: (projectId, data) => ({
                url: `${PROJECT_URL}/${projectId}`,
                method: 'PATCH',
                body: data,
                headers: {
                    'Authorization': getToken()
                }
            })
        })
    })
});

export const { useFetchProjectsQuery, useFetchProjectsByCategoryQuery, useFetchSingleProjectQuery, useCreateProjectMutation,
    useDeleteProjectMutation, useUpdateProjectMutation } = projectSlice;