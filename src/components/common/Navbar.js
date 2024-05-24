import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";

import { useFetchUserQuery } from "../../slicers/userSlice";

import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});

    const { data: userData, isLoading: userLoading, error: userError } = useFetchUserQuery();

    useEffect(() => {
        if(userData?.data){
            setUser(userData?.data);
        }
    }, [userData]);

    const logoutHandler = () => {
        localStorage.removeItem('token');
        navigate('/login');
    }

    const profileNavigateHandler = () => {
        navigate('/profile');
    }

    const dashboardNavigateHandler = () => {
        if(user?.user_type === 'Admin'){
            navigate('/admin-dashboard');
        }else {
            navigate('/dashboard');
        }
    }

    if(userLoading){
        return <div></div>
    }else {
        return(
            <div className={'nav-bar'}>
                <div className={'nav-bar-header-container'}>
                    <p className={'nav-bar-header'} onClick={dashboardNavigateHandler}>Carboon</p>
                </div>
                <div className={'nav-bar-action-container'}>
                    <div onClick={profileNavigateHandler} className={'nav-bar-profile-container'}>
                        <p className={'nav-bar-profile-name'}>{user?.full_name}</p>
                        <img src={`https://robohash.org/${user?.full_name}`} alt={'profile'} className={'nav-bar-profile-image'}/>
                    </div>
                    <p onClick={logoutHandler} className={'nav-bar-logout'}>Logout</p>
                </div>
            </div>
        )
    }
}

export default Navbar;