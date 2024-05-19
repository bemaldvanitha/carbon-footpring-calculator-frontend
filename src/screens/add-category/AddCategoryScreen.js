import React, { useState } from 'react';

import CustomInput from "../../components/common/CustomInput";
import CustomFileSelect from "../../components/common/CustomFileSelect";
import CustomButton from "../../components/common/CustomButton";

import './AddCategoryScreen.css';

const AddCategoryScreen = () => {
    const [title, setTitle] = useState('');
    const [image, setImage] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [imageError, setImageError] = useState(false);

    const categoryTitleChange = (e) => {
        setTitle(e.target.value);
    }

    const categoryImageChange = (e) => {
        setImage(e.target.files[0]);
    }

    const submitHandler = () => {

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
                <CustomButton title={'Create category'} onClick={submitHandler} fontColor={'#f0f0f0'}
                              bgColor={'#41B06E'}/>
            </div>
        </div>
    )
}

export default AddCategoryScreen;