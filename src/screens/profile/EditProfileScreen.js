import React, {useEffect, useState} from "react";
import { useNavigate } from "react-router";
import {message, Spin} from "antd";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";
import { useFetchUserQuery, useUpdateUserMutation } from "../../slicers/userSlice";

import './EditProfileScreen.css';

const EditProfileScreen = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: "",
        phone_number: "",
        full_name: ""
    });

    const [formError, setFormError] = useState({
        email_error: false,
        phone_number_error: false,
        full_name_error: false
    });

    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchUserQuery();
    const [updateUser, { isLoading }] = useUpdateUserMutation();

    useEffect(() => {
        if(userData?.data){
            setFormData(userData?.data);
        }
    }, [userData]);

    const handleChange = (field, value) => {
        setFormData((prevData) => ({
            ...prevData,
            [field]: value,
        }));
    };

    const fullNameChangeHandler = (e) => {
        handleChange('full_name', e.target.value);
    }

    const emailChangeHandler = (e) => {
        handleChange('email', e.target.value);
    }

    const phoneNumberChangeHandler = (e) => {
        handleChange('phone_number', e.target.value);
    }

    const accountUpdateHandler = async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidity = emailRegex.test(formData.email);
        const fullNameValidity = formData.full_name.trim().length >= 3;
        const phoneNumberValidity = formData.phone_number.trim().length >= 5;

        setFormError({
            email_error: false,
            phone_number_error: false,
            full_name_error: false
        });

        if(emailValidity && fullNameValidity && phoneNumberValidity){
            try{
                const res = updateUser(formData).unwrap();
                message.success(res?.message);
                navigate('/profile')
            }catch (err){
                message.error(err?.data?.message);
            }
        }else {
            setFormError({
                email_error: !emailValidity,
                phone_number_error: !phoneNumberValidity,
                full_name_error: !fullNameValidity
            });
        }
    }

    if(userIsLoading || isLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'edit-profile-screen'}>
                <div className={'edit-profile-screen-container'}>
                    <p className={'edit-profile-screen-title'}>Edit Profile</p>
                    <CustomInput title={'Full name'} value={formData.full_name} onChangeHandle={fullNameChangeHandler} id={'fullName'}
                                 errorMessage={'Enter Valid full name'} isError={formError.full_name_error} placeholder={'Enter full name'}
                                 type={'text'}/>
                    <CustomInput title={'Email'} value={formData.email} onChangeHandle={emailChangeHandler} id={'email'}
                                 errorMessage={'Enter Valid email'} isError={formError.email_error} placeholder={'Enter your email'}
                                 type={'email'}/>
                    <CustomInput title={'Phone Number'} value={formData.phone_number} onChangeHandle={phoneNumberChangeHandler}
                                 id={'phoneNumber'} errorMessage={'Enter Valid phone number'} isError={formError.phone_number_error}
                                 placeholder={'Enter phone number'} type={'tel'}/>
                    <CustomButton title={'Account Update'} onClick={accountUpdateHandler} fontColor={'#f0f0f0'} bgColor={'#41B06E'}/>
                </div>
            </div>
        )
    }
}

export default EditProfileScreen;