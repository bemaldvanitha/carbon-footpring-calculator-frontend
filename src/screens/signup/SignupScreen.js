import React, { useState } from 'react';
import { useNavigate } from "react-router";

import CustomInput from "../../components/common/CustomInput";
import CustomButton from "../../components/common/CustomButton";

import './SignupScreen.css';

const SignupScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');

    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = useState(false);
    const [fullNameError, setFullNameError] = useState(false);

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const confirmPasswordHandler = (e) => {
        setConfirmPassword(e.target.value);
    }

    const phoneNumberHandler = (e) => {
        setPhoneNumber(e.target.value);
    }

    const fullNameHandler = (e) => {
        setFullName(e.target.value);
    }

    const signupHandler = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidity = emailRegex.test(email);
        const passwordValidity = password.trim().length >= 5 && password === confirmPassword;
        const fullNameValidity = fullName.trim().length >= 3;
        const phoneNumberValidity = phoneNumber.trim().length >= 5;

        setEmailError(false);
        setFullNameError(false);
        setPasswordError(false);
        setPhoneNumberError(false);

        if(emailValidity && passwordValidity && fullNameValidity && phoneNumberValidity){

        }else {
            setEmailError(!emailValidity);
            setFullNameError(!fullNameValidity);
            setPasswordError(!passwordValidity);
            setPhoneNumberError(!phoneNumberValidity);
        }
    }

    const loginNavigateHandler = () => {
        navigate('/login')
    }

    return(
        <div className={'signup-screen'}>
            <div className={'signup-screen-container'}>
                <p className={'signup-screen-title'}>Signup</p>
                <p className={'signup-screen-description'}>Create new account!</p>
                <CustomInput value={email} type={'email'} placeholder={'Enter Email'} id={'email'} title={'Email'}
                             errorMessage={'Enter valid email'} isError={emailError} onChangeHandle={emailChangeHandler}/>
                <CustomInput value={password} type={'password'} placeholder={'Enter Password'} id={'password'} title={'Password'}
                             onChangeHandle={passwordChangeHandler} isError={passwordError}
                             errorMessage={'Enter Valid Password (password should be more than 5 chars and need to be same)'}/>
                <CustomInput value={confirmPassword} type={'password'} placeholder={'Enter Confirm Password'} id={'confirmPassword'}
                             title={'Confirm Password'} onChangeHandle={confirmPasswordHandler} isError={passwordError}
                             errorMessage={'Enter Valid Password (password should be more than 5 chars and need to be same)'}/>
                <CustomInput value={phoneNumber} id={'phone'} type={'tel'} isError={phoneNumberError} title={'Phone Number'}
                             placeholder={'Enter Phone Number'} onChangeHandle={phoneNumberHandler}
                             errorMessage={'Enter valid phone number'}/>
                <CustomInput value={fullName} id={'fullName'} type={'text'} title={'Full name'} isError={fullNameError}
                             placeholder={'Enter valid full name'} onChangeHandle={fullNameHandler}
                             errorMessage={'Enter valid full name'}/>
                <CustomButton title={'Signup'} onClick={signupHandler} fontColor={'#f0f0f0'} bgColor={'#41B06E'}/>
                <div className={'signup-screen-body-quiz-container'}>
                    <p className={'signup-screen-body-quiz-container-text'}>Already Have and account!</p>
                    <p onClick={loginNavigateHandler} className={'signup-screen-body-quiz-container-text-link'}>Login!</p>
                </div>
            </div>
        </div>
    )
}

export default SignupScreen;