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
    const [projectImageObjs, setProjectImageObjs] = useState([]);

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

    const projectActiveSinceHandler = (e) => {
        handleChange('active_since', e.target.value);
    }

    const projectReadMoreChangeHandler = (e) => {
        handleChange('read_more', e.target.value);
    }

    const projectTotalCarbonCreditChangeHandler = (e) => {
        handleChange('total_carbon_credits', e.target.value);
    }

    const projectOffsetRateChangeHandler = (e) => {
        handleChange('offset_rate', e.target.value);
    }

    const projectImageChangeHandler = (e) => {
        let file = e.target.files[0];
        if (file) {
            handleChange('project_images', [...formData.project_images, file]);
            const reader = new FileReader();
            reader.onload = () => {
                setProjectImageObjs([...projectImageObjs, reader.result]);
            };
            reader.readAsDataURL(file);
        }
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
                <CustomInput type={'date'} value={formData.active_since} errorMessage={'Select project start date'}
                             title={'Project Start date'} isError={formDataError.active_since_error} id={'activeSince'}
                             placeholder={'Select active since date'} onChangeHandle={projectActiveSinceHandler}/>
                <CustomInput type={'link'} value={formData.read_more} errorMessage={'Enter valid link'}
                             title={'Project Link'} isError={formDataError.read_more_error} id={'readMore'}
                             placeholder={'Enter read more links'} onChangeHandle={projectReadMoreChangeHandler}/>
                <CustomInput type={'number'} value={formData.total_carbon_credits} errorMessage={'Enter valid total carbon credit amount'}
                             title={'Total Carbon Credits'} isError={formDataError.total_carbon_credits_error} id={'totalCC'}
                             placeholder={'Enter Total Carbon credits'} onChangeHandle={projectTotalCarbonCreditChangeHandler}/>
                <CustomInput type={'number'} value={formData.offset_rate} errorMessage={'Enter valid offset rate'}
                             title={'Offset Rate'} isError={formDataError.offset_rate_error} id={'offsetRate'}
                             placeholder={'Enter offset rate'} onChangeHandle={projectOffsetRateChangeHandler}/>
                <CustomFileSelect id={'projectImages'} title={'Project Images'} value={formData.project_images}
                                  onChangeHandle={projectImageChangeHandler} isError={formDataError.project_images_error}
                                  errorMessage={'Select few project images'} multiple={true}/>
                {formData.project_images.length > 0 && <div className={'add-project-image-list'}>
                    {projectImageObjs.map((projectImg, index) => <img src={projectImg} key={index} alt={`project-img-${index}`}
                                                                      className={'add-project-image'}/>)}
                </div>}
            </div>
        </div>
    )
}

export default AddProjectScreen;