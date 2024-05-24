import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from "react-router";

import Navbar from "../common/Navbar";

const PrivateRoute = () => {
    const [isLogin, setIsLogin] = useState(true);

    useEffect(() => {
        let token = localStorage.getItem('token');
        if(token === null){
            setIsLogin(false)
        }else {
            setIsLogin(true)
        }
    }, []);

    return isLogin ? <div>
        <Navbar/>
        <main><Outlet/></main>
    </div> : <Navigate to={'/login'} replace/>
}

export default PrivateRoute;