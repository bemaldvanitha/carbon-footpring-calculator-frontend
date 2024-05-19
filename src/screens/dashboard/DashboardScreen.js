import React, { useState, useEffect } from 'react';

import { useFetchCategoriesQuery } from "../../slicers/categorySlice";
import { useFetchProjectsQuery, useFetchProjectsByCategoryQuery } from "../../slicers/projectSlice";

import './DashboardScreen.css';

const DashboardScreen = () => {
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);

    const { data: categoryData, isLoading: categoryIsLoading, error: categoryError } = useFetchCategoriesQuery();
    const { data: projectData, isLoading: projectIsLoading, error: projectError } = useFetchProjectsQuery();
    const { data: projectCategoryData, isLoading: projectCategoryIsLoading, error: projectCategoryError } = useFetchProjectsByCategoryQuery();

    useEffect(() => {
        setCategories(categoryData?.data);
        setProjects(projectData?.data);
    }, [categoryData]);

    return(
        <div>

        </div>
    )
}

export default DashboardScreen;