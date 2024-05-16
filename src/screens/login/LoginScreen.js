import React, { useState } from 'react';
import { useNavigate } from "react-router";

import CustomButton from "../../components/common/CustomButton";
import CustomInput from "../../components/common/CustomInput";

import './LoginScreen.css';

const LoginScreen = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const emailChangeHandler = (e) => {
        setEmail(e.target.value);
    }

    const passwordChangeHandler = (e) => {
        setPassword(e.target.value);
    }

    const loginHandler = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const emailValidity = emailRegex.test(email);
        const passwordValidity = password.trim().length >= 5;

        console.log(emailValidity, passwordValidity)

        setEmailError(false);
        setPasswordError(false);

        if(emailValidity && passwordValidity){

        }else {
            setEmailError(!emailValidity);
            setPasswordError(!passwordValidity);
        }
    }

    const quizHandler = () => {
        navigate('/quiz');
    }

    return (
        <div className={'login-screen'}>
            <div className={'login-screen-container'}>
                <p className={'login-screen-title'}>Login</p>
                <p className={'login-screen-description'}>Welcome back!</p>
                <CustomInput title={'Enter Email'} placeholder={'Enter your email'} id={'email'} value={email}
                             type={'email'}
                             isError={emailError} errorMessage={'Enter valid email'}
                             onChangeHandle={emailChangeHandler}/>
                <CustomInput title={'Enter Password'} placeholder={'Enter your password'} id={'password'}
                             value={password}
                             type={'password'} isError={passwordError} errorMessage={'Enter valid password'}
                             onChangeHandle={passwordChangeHandler}/>
                <CustomButton title={'Login'} onClick={loginHandler} fontColor={'#f0f0f0'} bgColor={'#41B06E'}/>
                <div className={'login-screen-body-quiz-container'}>
                    <p className={'login-screen-body-quiz-container-text'}>Don't have an account fill our quiz and signup</p>
                    <p onClick={quizHandler} className={'login-screen-body-quiz-container-text-link'}>Quiz!</p>
                </div>
            </div>
        </div>
    )
}

export default LoginScreen;