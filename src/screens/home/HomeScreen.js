import React from 'react';
import { useNavigate } from "react-router";

import CustomButton from "../../components/common/CustomButton";

import './HomeScreen.css';

const HomeScreen = () => {
    const navigate = useNavigate();

    const navigateToQuizHandler = () => {
        navigate('/quiz');
    }

    const navigateToLoginHandler = () => {

    }

    return(
        <div className={'home-screen'}>
            <div className={'home-screen-header'}>
                <p className={'home-screen-header-title'}>Carboon</p>
                <p className={'home-screen-header-description'}>Want to save earth from climate change join with us!</p>
            </div>
            <div className={'home-screen-body'}>
                <div className={'home-screen-body-button-container'}>
                    <CustomButton title={'Calculate your footprint'} onClick={navigateToQuizHandler} bgColor={'#40A578'}
                                  fontColor={'#f0f0f0'}/>
                </div>
                <div className={'home-screen-body-login-container'}>
                    <p className={'home-screen-body-login-container-text'}>Already have an account</p>
                    <p onClick={navigateToLoginHandler} className={'home-screen-body-login-container-link'}>Login!</p>
                </div>
            </div>
        </div>
    )
}

export default HomeScreen;