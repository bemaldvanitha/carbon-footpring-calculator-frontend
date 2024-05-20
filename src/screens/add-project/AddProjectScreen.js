import React, { useState, useEffect } from 'react';

import CustomInput from "../../components/common/CustomInput";
import CustomFileSelect from "../../components/common/CustomFileSelect";
import CustomSelect from "../../components/common/CustomSelect";
import CustomTextArea from "../../components/common/CustomTextArea";
import { useFetchCategoriesQuery } from "../../slicers/categorySlice";

import './AddProjectScreen.css';

const AddProjectScreen = () => {
    const [categories, setCategories] = useState([]);
    const [formData, setFormData] = useState({
        category_id: 0,
        title: "",
        featured_image: null,
        summary: "",
        how_it_work: "",
        active_since: "",
        read_more: "",
        total_carbon_credits: 0,
        offset_rate: 1,
        project_images: [],
        location: {
            title: "",
            description: "",
            latitude: 0,
            longitude: 0
        },
        technical_documents: [],
        certification_type: "",
        project_developer: {
            name: "",
            organization: ""
        },
        project_design_validator: {
            name: "",
            organization: ""
        },
        credit_validator: {
            name: "",
            organization: ""
        }
    });

    const [featuredImageObj, setFeaturedImageObj] = useState(null);

    const [formDataError, setFormDataError] = useState({
        category_id_error: false,
        title_error: false,
        featured_image_error: false,
        summary_error: false,
        how_it_work_error: false,
        active_since_error: false,
        read_more_error: false,
        project_images_error: false,
        total_carbon_credits_error: false,
        offset_rate_error: false,
        location: {
            title_error: false,
            description_error: false,
            latitude_error: false,
            longitude_error: false
        },
        technical_documents_error: false,
        certification_type_error: false,
        project_developer: {
            name_error: false,
            organization_error: false
        },
        project_design_validator: {
            name_error: false,
            organization_error: false
        },
        credit_validator: {
            name_error: false,
            organization_error: false
        }
    });

    const { data: categoryData, isLoading: categoryIsLoading, error: categoryError } = useFetchCategoriesQuery();

    useEffect(() => {
        if (categoryData?.data) {
            setCategories(categoryData?.data);
        }
    }, [categoryData]);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const projectTitleChangeHandler = (e) => {
        handleChange('title', e.target.value);
    }

    const projectFeaturedImageChangeHandler = (e) => {
        let file = e.target.files[0];
        if (file) {
            handleChange('featured_image', file);
            const reader = new FileReader();
            reader.onload = () => {
                setFeaturedImageObj(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const projectCategoryChangeHandler = (e) => {
        handleChange('category_id', parseInt(e.target.value));
    }

    const projectSummaryChangeHandler = (e) => {
        handleChange('summary', e.target.value);
    }

    const projectHowItWorkChangeHandler = (e) => {
        handleChange('how_it_work', e.target.value);
    }

    return(
        <div className={'add-project-screen'}>
            <div className={'add-project-screen-container'}>
                <p className={'add-project-screen-title'}>Create new Project</p>
                <CustomSelect title={'Project Category'} value={formData.category_id} id={'category'} errorMessage={'Select a category'}
                              isError={formDataError.category_id_error} options={categories} onChangeHandle={projectCategoryChangeHandler}/>
                <CustomInput title={'Project Title'} id={'title'} type={'text'} isError={formDataError.title_error} value={formData.title}
                             errorMessage={'Enter Valid Project title'} placeholder={'Enter Project Title'}
                             onChangeHandle={projectTitleChangeHandler}/>
                <CustomFileSelect id={'featuredImage'} title={'Featured Image'} value={formData.featured_image}
                                  onChangeHandle={projectFeaturedImageChangeHandler} isError={formDataError.featured_image_error}
                                  errorMessage={'Select a featured image for project'}/>
                {formData.featured_image !== null && <img src={featuredImageObj} alt={'selected-img'} className={'add-project-image'}/>}
                <CustomTextArea id={'summary'} value={formData.summary} title={'Project Summary'} isError={formDataError.summary_error}
                                placeholder={'Enter project summary'} errorMessage={'Enter valid project summary'}
                                onChangeHandle={projectSummaryChangeHandler}/>
                <CustomTextArea id={'howItWork'} value={formData.how_it_work} title={'How Project work'}
                                isError={formDataError.how_it_work_error} placeholder={'Enter how project work'}
                                errorMessage={'Enter valid how project work'} onChangeHandle={projectHowItWorkChangeHandler}/>
            </div>
        </div>
    )
}

export default AddProjectScreen;