import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from "react-router";

import Navbar from "../common/Navbar";
import { useFetchUserQuery } from "../../slicers/userSlice";

const AdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchUserQuery();

    useEffect(() => {
        if(userData?.data?.user_type === 'User'){
            setIsAdmin(false)
        }
    }, [userData]);

    return isAdmin ? <div>
        <Navbar/>
        <main><Outlet/></main>
    </div> : <Navigate to={"/login"}/>
}

export default AdminRoute;