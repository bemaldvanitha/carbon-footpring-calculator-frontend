import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router";
import { message } from "antd";

import CustomInput from "../../components/common/CustomInput";
import CustomFileSelect from "../../components/common/CustomFileSelect";
import CustomButton from "../../components/common/CustomButton";
import { useGeneratePresignedUrlMutation } from "../../slicers/fileSlice";
import { useAddCategoryMutation } from "../../slicers/categorySlice";

import './AddCategoryScreen.css';

const AddCategoryScreen = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageObj, setImageObj] = useState(null);

    const [generatePresignedUrl, { isLoading }] = useGeneratePresignedUrlMutation();
    const [addCategory, { isLoading: addCategoryLoading }] = useAddCategoryMutation();

    const categoryTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const categoryImageChange = (e) => {
        let file = e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onload = () => {
                setImageObj(reader.result);
            };
            reader.readAsDataURL(file);
        }
    }

    const fileUploadHandler = async () => {
        const uploadImage = image.name;

        const data = await generatePresignedUrl({
            file_name: uploadImage,
            file_extension: uploadImage.split('.').pop(),
            path: "category"
        }).unwrap();

        await axios.put(data.pre_signed_url, image, {
            headers: {
                "Content-Type": uploadImage.split('.').pop() || "application/octet-stream",
            },
        });
        return data.new_file_name;
    }

    const submitHandler = async () => {
        const titleValidity = title.trim().length > 3;
        const fileValidity = image !== null;

        setTitleError(false);
        setImageError(false);

        if(titleValidity && fileValidity){
            try{
                const newFileName = await fileUploadHandler();
                const res = await addCategory({
                    title: title,
                    image: newFileName
                }).unwrap();
                message.success(res?.message);
                navigate('/admin-categories')
            }catch (err){
                message.error(err?.data?.message);
            }
        }else {
            setTitleError(!titleValidity);
            setImageError(!fileValidity);
        }
    }

    return(
        <div className={'add-category-screen'}>
            <div className={'add-category-screen-container'}>
                <p className={'add-category-screen-title'}>Create new category</p>
                <CustomInput id={'category'} title={'Enter category title'} type={'text'} value={title}
                             placeholder={'Enter category title'}
                             isError={titleError} errorMessage={'Enter category title'}
                             onChangeHandle={categoryTitleChange}/>
                <CustomFileSelect id={'image'} title={'Select category image'} value={image} isError={imageError}
                                  errorMessage={'Select category image'} onChangeHandle={categoryImageChange}/>
                {image !== null && <img src={imageObj} alt={'selected-img'} className={'add-category-image'}/>}
                <CustomButton title={'Create category'} onClick={submitHandler} fontColor={'#f0f0f0'}
                              bgColor={'#41B06E'}/>
            </div>
        </div>
    )
}

export default AddCategoryScreen;