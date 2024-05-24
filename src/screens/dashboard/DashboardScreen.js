import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useNavigate } from "react-router";

import CategoryTile from "../../components/dashboard/CategoryTile";
import ProjectTile from "../../components/dashboard/ProjectTile";
import { useFetchCategoriesQuery } from "../../slicers/categorySlice";
import { useFetchProjectsQuery, useFetchProjectsByCategoryQuery } from "../../slicers/projectSlice";
import { useFetchCarbonCreditsQuery } from "../../slicers/paymentSlice";
import { useFetchUserQuery } from "../../slicers/userSlice";

import './DashboardScreen.css';

const DashboardScreen = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(0);

    const { data: categoryData, isLoading: categoryIsLoading, error: categoryError } = useFetchCategoriesQuery();
    const { data: projectData, isLoading: projectIsLoading, error: projectError } = useFetchProjectsQuery();
    const { data: projectCategoryData, isLoading: projectCategoryIsLoading, error: projectCategoryError } =
        useFetchProjectsByCategoryQuery(selectedCategory);
    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchUserQuery();
    const { data: ccData, isLoading: ccIsLoading, error: ccError } = useFetchCarbonCreditsQuery();

    useEffect(() => {
        if (categoryData?.data) {
            let allCategories = [...categoryData.data];
            if (allCategories.length > 0 && allCategories[0].id !== 0) {
                allCategories.unshift({
                    id: 0,
                    title: 'All',
                    presigned_url: 'https://images.pexels.com/photos/1563604/pexels-photo-1563604.jpeg'
                });
            }
            setCategories(allCategories);
        }

        if(selectedCategory === 0){
            setProjects(projectData?.data);
        }else {
            setProjects(projectCategoryData?.data);
        }
        setUser({...userData?.data, ...ccData?.data});
    }, [categoryData, projectData, userData, ccData, selectedCategory, projectCategoryData]);

    const categoryClickHandler = (id) => {
        setSelectedCategory(id);
    }

    const projectClickHandler = (id) => {
        navigate(`/project/${id}`);
    }

    if(categoryIsLoading || projectCategoryIsLoading || projectIsLoading || userIsLoading || ccIsLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'dashboard-screen'}>
                <div className={'dashboard-screen-header'}>
                    <p className={'dashboard-screen-header-title'}>Hi {user?.full_name}</p>
                    <p className={'dashboard-screen-header-desc'}>
                        {(user?.carbon_emission - user?.current_offset) > 0 ? `Let's neutralise your ${(user?.carbon_emission - 
                            user?.current_offset).toFixed(2)} Tons of carbon emission` : `Thanks for neutralizing 
                            your carbon footprint`}</p>
                </div>
                <div className={'dashboard-screen-category-container'}>
                    {categories.map((category, index) => <CategoryTile key={index} id={category?.id} title={category?.title}
                                                                       image={category?.presigned_url} onClick={categoryClickHandler}/>)}
                </div>
                <div className={'dashboard-screen-project-container'}>
                    {projects.map((project, index) => <ProjectTile key={index} id={project?.id} title={project?.title}
                                                                   image={project?.image} certification_type={project?.certification_type}
                                                                   location={project?.location} onClickHandler={projectClickHandler}/>)}
                </div>
            </div>
        )
    }
}

export default DashboardScreen;