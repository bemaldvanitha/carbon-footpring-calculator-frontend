import React, { useState, useEffect } from 'react';
import { message, Modal, Spin } from "antd";
import { useNavigate } from "react-router";

import CustomButton from "../../components/common/CustomButton";
import { useFetchUserQuery, useDeleteUserMutation } from "../../slicers/userSlice";

import './ProfileScreen.css';

const ProfileScreen = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({});
    const [deleteModelOpen, setDeleteModelOpen] = useState(false);

    const { data: userData, isLoading: userIsLoading, error: userError } = useFetchUserQuery();
    const [deleteUser, { isLoading: deleteIdLoading }] = useDeleteUserMutation();

    useEffect(() => {
        if(userData?.data){
            setUser(userData?.data);
        }
    }, [userData]);

    const deleteUserHandler = () => {
        setDeleteModelOpen(true);
    }

    const cancelDelete = () => {
        setDeleteModelOpen(false);
    }

    const deleteOkHandler = async () => {
        try {
            const res = await deleteUser().unwrap();
            message.success(res?.message);
        }catch (err){
            message.error(err?.data?.message);
        }
        setDeleteModelOpen(false);
        navigate('/');
    }

    const editUserHandler = () => {
        navigate('/edit-profile');
    }

    if(userIsLoading || deleteIdLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'profile-screen'}>
                <Modal title="Delete Account" open={deleteModelOpen} onOk={deleteOkHandler} onCancel={cancelDelete}>
                    <p>Are you sure about this Account?</p>
                </Modal>
                <div className={'profile-screen-container'}>
                    <div className={'profile-pic-container'}>
                        <img alt={'profile-pic'} src={`https://robohash.org/${user?.full_name}`}
                             className={'profile-pic'}/>
                    </div>
                    <div className={'profile-screen-info-container'}>
                        <div className={'profile-screen-info-box'}>
                            <p className={'profile-screen-info-box-title'}>Full Name:</p>
                            <p className={'profile-screen-info-box-desc'}>{user?.full_name}</p>
                        </div>
                        <div className={'profile-screen-info-box'}>
                            <p className={'profile-screen-info-box-title'}>Email:</p>
                            <p className={'profile-screen-info-box-desc'}>{user?.email}</p>
                        </div>
                        <div className={'profile-screen-info-box'}>
                            <p className={'profile-screen-info-box-title'}>Phone Number:</p>
                            <p className={'profile-screen-info-box-desc'}>{user?.phone_number}</p>
                        </div>
                    </div>
                    <div className={'profile-screen-button-container'}>
                        <CustomButton title={'Edit User'} bgColor={'#FFD700'} fontColor={'#ffffff'} onClick={editUserHandler}/>
                        <div className={'spacer'}></div>
                        <CustomButton title={'Delete User'} fontColor={'#ffffff'} onClick={deleteUserHandler} bgColor={'#C40C0C'}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProfileScreen;