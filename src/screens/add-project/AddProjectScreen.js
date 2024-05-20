import React, { useState, useEffect } from 'react';
import axios from "axios";
import { message } from "antd";
import { useLocation, useNavigate } from "react-router";

import CustomInput from "../../components/common/CustomInput";
import CustomFileSelect from "../../components/common/CustomFileSelect";
import CustomSelect from "../../components/common/CustomSelect";
import CustomTextArea from "../../components/common/CustomTextArea";
import CustomButton from "../../components/common/CustomButton";
import { useFetchCategoriesQuery } from "../../slicers/categorySlice";
import { useGeneratePresignedUrlMutation } from "../../slicers/fileSlice";
import { useCreateProjectMutation, useFetchSingleProjectQuery, useUpdateProjectMutation } from "../../slicers/projectSlice";

import './AddProjectScreen.css';

const certificationTypes = [
    { id: 1, title: 'Platinum Certification' },
    { id: 2, title: 'Gold Certification' },
    { id: 3, title: 'Silver Certification' },
    { id: 4, title: 'Bronze Certification' },
]

const AddProjectScreen = () => {
    const navigate = useNavigate();
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const project_id = params.get('project_id');

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
    const [editFeaturedImage, setEditFeaturedImage] = useState('');

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
    const [generatePresignedUrl, { isLoading }] = useGeneratePresignedUrlMutation();
    const [createProject, { isLoading: createProjectLoading }] = useCreateProjectMutation();
    const { data: projectData, isLoading: projectIsLoading, error: projectError } = useFetchSingleProjectQuery(project_id);
    const [updateProject, { isLoading: updateProjectLoading }] = useUpdateProjectMutation();

    useEffect(() => {
        if (categoryData?.data) {
            setCategories(categoryData?.data);
        }
    }, [categoryData]);

    useEffect(() => {
        if(projectData?.data && project_id){
            let projectD = projectData?.data;

            setEditFeaturedImage(projectD?.featured_image);
            setFormData({ category_id: 0, title: projectD?.title, featured_image: null, summary: projectD?.summary,
                how_it_work: projectD?.how_it_work, active_since: "", read_more: projectD?.read_more, total_carbon_credits: 0,
                offset_rate: 1, project_images: [],
                location: { title: projectD?.location.title, description: projectD?.location.description,
                    latitude: projectD?.location.latitude, longitude: projectD?.location.longitude },
                technical_documents: [], certification_type: "",
                project_developer: { name: "", organization: "" },
                project_design_validator: { name: "", organization: "" },
                credit_validator: { name: "", organization: "" }
            });
        }
    }, [project_id, projectData]);

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
        handleChange('total_carbon_credits', parseInt(e.target.value));
    }

    const projectOffsetRateChangeHandler = (e) => {
        handleChange('offset_rate', parseFloat(e.target.value));
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

    const projectLocationTitleChangeHandler = (e) => {
        let location= {
            title: e.target.value,
            description: formData.location.description,
            latitude: formData.location.latitude,
            longitude: formData.location.longitude
        };
        handleChange('location', location);
    }

    const projectLocationDescriptionChangeHandler = (e) => {
        let location= {
            title: formData.location.title,
            description: e.target.value,
            latitude: formData.location.latitude,
            longitude: formData.location.longitude
        };
        handleChange('location', location);
    }

    const projectLatitudeChangeHandler = (e) => {
        let location= {
            title: formData.location.title,
            description: formData.location.description,
            latitude: parseFloat(e.target.value),
            longitude: formData.location.longitude
        };
        handleChange('location', location);
    }

    const projectLongitudeChangeHandler = (e) => {
        let location= {
            title: formData.location.title,
            description: formData.location.description,
            latitude: formData.location.latitude,
            longitude: parseFloat(e.target.value)
        };
        handleChange('location', location);
    }

    const mapImageUrl = (latitude, longitude) => {
        const apiKey = 'AIzaSyBRibDiA4Da-Xx_aNQdj7x9wVDjfm9QNik';
        const zoom = 15;
        const size = '400x300';
        const markers = `markers=color:red|label:A|${latitude},${longitude}`;
        return `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${size}&${markers}&key=${apiKey}`;
    };

    const projectTechnicalDocChangeHandler = (e) => {
        let file = e.target.files[0];
        if (file) {
            handleChange('technical_documents', [...formData.technical_documents, file]);
        }
    }

    const projectCertificationTypeChangeHandler = (e) => {
        const certificationTypeText = certificationTypes.find(certi => certi.id === parseInt(e.target.value)).title;
        handleChange('certification_type', certificationTypeText);
    }

    const projectDeveloperNameChangeHandler = (e) => {
        let project_developer =  {
            name: e.target.value,
            organization: formData.project_developer.organization
        };
        handleChange('project_developer', project_developer);
    }

    const projectDeveloperOrganizationChangeHandler = (e) => {
        let project_developer =  {
            name: formData.project_developer.name,
            organization: e.target.value
        };
        handleChange('project_developer', project_developer);
    }

    const projectDesignerNameChangeHandler = (e) => {
        let project_design_validator= {
            name: e.target.value,
            organization: formData.project_design_validator.organization
        };
        handleChange('project_design_validator', project_design_validator);
    }

    const projectDesignerOrganizationChangeHandler = (e) => {
        let project_design_validator= {
            name: formData.project_design_validator.name,
            organization: e.target.value
        };
        handleChange('project_design_validator', project_design_validator);
    }

    const projectCreditorNameChangeHandler = (e) => {
        let credit_validator= {
            name: e.target.value,
            organization: formData.credit_validator.organization
        };
        handleChange('credit_validator', credit_validator);
    }

    const projectCreditorOrganizationChangeHandler = (e) => {
        let credit_validator= {
            name: formData.credit_validator.name,
            organization: e.target.value
        };
        handleChange('credit_validator', credit_validator);
    }

    const featuredImgUploadHandler = async () => {
        if(formData.featured_image === null){
            return '';
        }
        const uploadImage = formData.featured_image.name;

        const data = await generatePresignedUrl({
            file_name: uploadImage,
            file_extension: uploadImage.split('.').pop(),
            path: "project/images"
        }).unwrap();

        await axios.put(data.pre_signed_url, formData.featured_image, {
            headers: {
                "Content-Type": uploadImage.split('.').pop() || "application/octet-stream",
            },
        });
        return data.new_file_name;
    }

    const projectImgsUploadHandler = async () => {
        let allProjectImages = [];

        for(let uploadImageObj of formData.project_images){
            const uploadImage = uploadImageObj.name;

            const data = await generatePresignedUrl({
                file_name: uploadImage,
                file_extension: uploadImage.split('.').pop(),
                path: "project/images"
            }).unwrap();

            await axios.put(data.pre_signed_url, uploadImageObj, {
                headers: {
                    "Content-Type": uploadImage.split('.').pop() || "application/octet-stream",
                },
            });

            allProjectImages.push(data.new_file_name);
        }
        return allProjectImages;
    }

    const projectFileUploadHandler = async () => {
        let allProjectDocs = [];

        for(let document of formData.technical_documents){
            const uploadDocument = document.name;

            const data = await generatePresignedUrl({
                file_name: uploadDocument,
                file_extension: uploadDocument.split('.').pop(),
                path: "project/documents"
            }).unwrap();

            await axios.put(data.pre_signed_url, document, {
                headers: {
                    "Content-Type": uploadDocument.split('.').pop() || "application/octet-stream",
                },
            });

            allProjectDocs.push(data.new_file_name);
        }
        return allProjectDocs;
    }

    const projectCreateHandler = async () => {
        setFormDataError({ category_id_error: false, title_error: false, featured_image_error: false, summary_error: false,
            how_it_work_error: false, active_since_error: false, read_more_error: false, project_images_error: false,
            total_carbon_credits_error: false, offset_rate_error: false,
            location: { title_error: false, description_error: false, latitude_error: false, longitude_error: false },
            technical_documents_error: false, certification_type_error: false,
            project_developer: { name_error: false, organization_error: false },
            project_design_validator: { name_error: false, organization_error: false },
            credit_validator: { name_error: false, organization_error: false }
        });

        const date = new Date(formData.active_since);

        const categoryValidity = formData.category_id !== 0;
        const titleValidity = formData.title.trim().length > 3;
        const featuredImageValidity = formData.featured_image !== null;
        const summaryValidity = formData.summary.trim().length >= 10;
        const howWorkValidity = formData.how_it_work.trim().length >= 10;
        const activeSinceValidity =  formData.active_since.match(/^\d{4}-\d{2}-\d{2}$/) && date instanceof Date &&
            !isNaN(date);
        const readMoreValidity = formData.read_more.trim().length >= 3;
        const projectImageValidity = formData.project_images.length >= 1;
        const carbonCreditValidity = formData.total_carbon_credits > 0;
        const offsetRateValidity = formData.offset_rate > 0;
        const locationTitleValidity = formData.location.title.trim().length >= 3;
        const locationDescriptionValidity = formData.location.description.trim().length >= 10;
        const techDocValidity = formData.technical_documents.length >= 1;
        const certificationTypeValidity = formData.certification_type.trim() !== "";
        const developerNameValidity = formData.project_developer.name.trim().length >= 2;
        const developerOrganizationValidity = formData.project_developer.organization.trim().length >= 3;
        const designerNameValidity = formData.project_design_validator.name.trim().length >= 2;
        const designerOrganizationValidity = formData.project_design_validator.organization.trim().length >= 3;
        const creditorNameValidity = formData.credit_validator.name.trim().length >= 2;
        const creditorOrganizationValidity = formData.credit_validator.organization.trim().length >= 3;

        if(project_id === null){
            if (categoryValidity && titleValidity && featuredImageValidity && summaryValidity && howWorkValidity && activeSinceValidity &&
                readMoreValidity && projectImageValidity && carbonCreditValidity && offsetRateValidity && locationTitleValidity &&
                locationDescriptionValidity && techDocValidity && certificationTypeValidity && developerNameValidity &&
                developerOrganizationValidity && designerNameValidity && designerOrganizationValidity && creditorNameValidity &&
                creditorOrganizationValidity) {

                try {
                    const featuredImg = await featuredImgUploadHandler();
                    const projectImages = await projectImgsUploadHandler();
                    const projectDocs = await projectFileUploadHandler();

                    const res = await createProject({ ...formData, featured_image: featuredImg, project_images: projectImages,
                        technical_documents: projectDocs}).unwrap();
                    message.success(res?.message);
                    navigate('/admin-projects');
                }catch (err){
                    message.error(err?.data?.message);
                }

            } else {
                setFormDataError({ category_id_error: !categoryValidity, title_error: !titleValidity,
                    featured_image_error: !featuredImageValidity, summary_error: !summaryValidity, how_it_work_error: !howWorkValidity,
                    active_since_error: !activeSinceValidity, read_more_error: !readMoreValidity, project_images_error: !projectImageValidity,
                    total_carbon_credits_error: !carbonCreditValidity, offset_rate_error: !offsetRateValidity,
                    location: { title_error: !locationTitleValidity, description_error: !locationDescriptionValidity, latitude_error: false,
                        longitude_error: false},
                    technical_documents_error: !techDocValidity, certification_type_error: !certificationTypeValidity,
                    project_developer: { name_error: !developerNameValidity, organization_error: !developerOrganizationValidity },
                    project_design_validator: { name_error: !designerNameValidity, organization_error: !designerOrganizationValidity },
                    credit_validator: { name_error: !creditorNameValidity, organization_error: !creditorOrganizationValidity }
                });
            }
        }else {
            if(titleValidity && summaryValidity && howWorkValidity && readMoreValidity && locationTitleValidity &&
                locationDescriptionValidity){
                try{
                    const featuredImg = await featuredImgUploadHandler();
                    const projectImages = await projectImgsUploadHandler();
                    const projectDocs = await projectFileUploadHandler();

                    const data = {
                        title: formData.title,
                        featured_image: featuredImg,
                        summary: formData.summary,
                        how_it_work: formData.how_it_work,
                        read_more: formData.read_more,
                        project_images: Array.isArray(projectImages) ? projectImages : [],
                        location: {
                            title: formData.location.title,
                            description: formData.location.description,
                            latitude: parseFloat(formData.location.latitude),
                            longitude: parseFloat(formData.location.longitude)
                        },
                        technical_documents: Array.isArray(projectDocs) ? projectDocs : []
                    };

                    const res = await updateProject(project_id, data).unwrap();

                    message.success(res?.message);
                    navigate('/admin-projects');
                }catch (err){
                    message.error(err?.data?.message);
                }
            }else {
                setFormDataError({ category_id_error: false, title_error: !titleValidity, featured_image_error: false,
                    summary_error: !summaryValidity, how_it_work_error: !howWorkValidity, active_since_error: false,
                    read_more_error: !readMoreValidity, project_images_error: false, total_carbon_credits_error: false,
                    offset_rate_error: false, location: { title_error: !locationTitleValidity, description_error:
                            !locationDescriptionValidity, latitude_error: false, longitude_error: false}, technical_documents_error:
                        false, certification_type_error: false, project_developer: { name_error: false, organization_error: false },
                    project_design_validator: { name_error: false, organization_error: false }, credit_validator: { name_error: false,
                        organization_error: false }
                });
            }
        }
    }

    return(
        <div className={'add-project-screen'}>
            <div className={'add-project-screen-container'}>
                <p className={'add-project-screen-title'}>Create new Project</p>
                {project_id === null && <CustomSelect title={'Project Category'} value={formData.category_id} id={'category'}
                              errorMessage={'Select a category'} isError={formDataError.category_id_error} options={categories}
                                                      onChangeHandle={projectCategoryChangeHandler}/>}
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
                {project_id === null && <CustomInput type={'date'} value={formData.active_since} errorMessage={'Select project start date'}
                             title={'Project Start date'} isError={formDataError.active_since_error} id={'activeSince'}
                             placeholder={'Select active since date'} onChangeHandle={projectActiveSinceHandler}/>}
                <CustomInput type={'link'} value={formData.read_more} errorMessage={'Enter valid link'}
                             title={'Project Link'} isError={formDataError.read_more_error} id={'readMore'}
                             placeholder={'Enter read more links'} onChangeHandle={projectReadMoreChangeHandler}/>
                {project_id === null &&  <CustomInput type={'number'} value={formData.total_carbon_credits}
                             errorMessage={'Enter valid total carbon credit amount'} title={'Total Carbon Credits'}
                             isError={formDataError.total_carbon_credits_error} id={'totalCC'} placeholder={'Enter Total Carbon credits'}
                             onChangeHandle={projectTotalCarbonCreditChangeHandler}/>}
                {project_id === null && <CustomInput type={'number'} value={formData.offset_rate} errorMessage={'Enter valid offset rate'}
                             title={'Offset Rate'} isError={formDataError.offset_rate_error} id={'offsetRate'}
                             placeholder={'Enter offset rate'} onChangeHandle={projectOffsetRateChangeHandler}/>}
                <CustomFileSelect id={'projectImages'} title={'Project Images'} value={formData.project_images}
                                  onChangeHandle={projectImageChangeHandler} isError={formDataError.project_images_error}
                                  errorMessage={'Select few project images'} multiple={true}/>
                {formData.project_images.length > 0 && <div className={'add-project-image-list'}>
                    {projectImageObjs.map((projectImg, index) => <img src={projectImg} key={index} alt={`project-img-${index}`}
                                                                      className={'add-project-image'}/>)}
                </div>}
                <CustomInput type={'text'} value={formData.location.title} errorMessage={'Enter valid location title'}
                             title={'Location Title'} isError={formDataError.location.title_error} id={'locationTitle'}
                             placeholder={'Enter location title'} onChangeHandle={projectLocationTitleChangeHandler}/>
                <CustomTextArea id={'locationDescription'} value={formData.location.description} title={'Location Description'}
                                isError={formDataError.location.description_error} placeholder={'Enter location description'}
                                errorMessage={'Enter valid location description'} onChangeHandle={projectLocationDescriptionChangeHandler}/>
                <CustomInput type={'number'} value={formData.location.latitude} errorMessage={'Enter valid location latitude'}
                             title={'Location Latitude'} isError={formDataError.location.latitude_error} id={'locationLatitude'}
                             placeholder={'Enter location latitude'} onChangeHandle={projectLatitudeChangeHandler}/>
                <CustomInput type={'number'} value={formData.location.longitude} errorMessage={'Enter valid location longitude'}
                             title={'Location Longitude'} isError={formDataError.location.longitude_error} id={'locationLongitude'}
                             placeholder={'Enter location longitude'} onChangeHandle={projectLongitudeChangeHandler}/>
                <img src={mapImageUrl(formData.location.latitude, formData.location.longitude)}
                                                          alt={'map-img'} className={'project-map-image'}/>
                <CustomFileSelect id={'technicalDocuments'} title={'Technical Documents'} value={formData.technical_documents}
                                  onChangeHandle={projectTechnicalDocChangeHandler} isError={formDataError.technical_documents_error}
                                  errorMessage={'Select few technical documents'} multiple={true} acceptType={'application/pdf'}/>
                {project_id === null && <CustomSelect title={'Project Certification Type'} value={formData.certification_type}
                              id={'certificationType'} errorMessage={'Select project certification'}
                              isError={formDataError.certification_type_error} options={certificationTypes}
                              onChangeHandle={projectCertificationTypeChangeHandler}/>}
                {project_id === null && <CustomInput type={'text'} value={formData.project_developer.name}
                             errorMessage={'Enter valid developer name'} title={'Project Developer name'}
                             isError={formDataError.project_developer.name_error} id={'developerName'}
                             placeholder={'Enter project developer name'} onChangeHandle={projectDeveloperNameChangeHandler}/>}
                {project_id === null && <CustomInput type={'text'} value={formData.project_developer.organization}
                             errorMessage={'Enter valid developer organization'} title={'Project Developer organization'}
                             isError={formDataError.project_developer.organization_error} id={'developerOrganization'}
                             placeholder={'Enter project developer organization'}
                             onChangeHandle={projectDeveloperOrganizationChangeHandler}/>}
                {project_id === null && <CustomInput type={'text'} value={formData.project_design_validator.name}
                             errorMessage={'Enter valid designer name'} title={'Project Designer name'}
                             isError={formDataError.project_design_validator.name_error} id={'designerName'}
                             placeholder={'Enter project designer name'} onChangeHandle={projectDesignerNameChangeHandler}/>}
                {project_id === null && <CustomInput type={'text'} value={formData.project_design_validator.organization}
                             errorMessage={'Enter valid designer organization'} title={'Project Designer organization'}
                             isError={formDataError.project_design_validator.organization_error} id={'designerOrganization'}
                             placeholder={'Enter project designer organization'} onChangeHandle={projectDesignerOrganizationChangeHandler}/>}
                {project_id === null && <CustomInput type={'text'} value={formData.credit_validator.name}
                             errorMessage={'Enter valid credit validator name'} title={'Project Credit Validator name'}
                             isError={formDataError.credit_validator.name_error} id={'creditorName'}
                             placeholder={'Enter project credit validator name'} onChangeHandle={projectCreditorNameChangeHandler}/>}
                {project_id === null && <CustomInput type={'text'} value={formData.credit_validator.organization}
                             errorMessage={'Enter valid credit validator organization'} title={'Project Credit Validator organization'}
                             isError={formDataError.credit_validator.organization_error} id={'creditorOrganization'}
                             placeholder={'Enter project credit validator organization'}
                             onChangeHandle={projectCreditorOrganizationChangeHandler}/>}
                <CustomButton title={project_id === null ? 'Project Create' : 'Project Update'} onClick={projectCreateHandler}
                              fontColor={'#f0f0f0'} bgColor={'#41B06E'}/>
            </div>
        </div>
    )
}

export default AddProjectScreen;