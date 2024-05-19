import React, { useState, useEffect } from 'react';
import { Outlet, Navigate } from "react-router";

import { useFetchUserQuery } from "../../slicers/userSlice";

const AdminRoute = () => {
    const [isAdmin, setIsAdmin] = useState(true);
    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchUserQuery();

    useEffect(() => {
        if(userData?.data?.user_type === 'User'){
            setIsAdmin(false)
        }
    }, [userData]);

    return isAdmin ? <Outlet/> : <Navigate to={"/login"}/>
}

export default AdminRoute;