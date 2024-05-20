import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import {Spin, Modal, message} from "antd";
import { MdDelete } from "react-icons/md";

import CustomButton from "../../components/common/CustomButton";
import { useFetchCategoriesQuery } from "../../slicers/categorySlice";
import { useDeleteCategoryMutation } from "../../slicers/categorySlice";

import './AdminCategoriesScreen.css';

const AdminCategoriesScreen = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [deleteModelOpen, setDeleteModelOpen] = useState(false);
    const [deleteCatId, setDeleteCatId] = useState(0);

    const { data: categoryData, isLoading: categoryIsLoading, error: categoryError } = useFetchCategoriesQuery();
    const [deleteCategory, { isLoading: deleteLoading }] = useDeleteCategoryMutation();

    useEffect(() => {
        if(categoryData?.data){
            setCategories(categoryData?.data);
        }
    }, [categoryData]);

    const createCategoryNavigator = () => {
        navigate('/add-category');
    }

    const deleteHandler = (id) => {
        setDeleteModelOpen(true);
        setDeleteCatId(id);
    }

    const cancelDelete = () => {
        setDeleteModelOpen(false);
        setDeleteCatId(0);
    }

    const deleteOkHandler = async () => {
        try {
            const res = await deleteCategory(deleteCatId).unwrap();
            message.success(res?.message);
        }catch (err){
            message.error(err?.data?.message);
        }

        setDeleteModelOpen(false);
        setDeleteCatId(0)
    }

    if(categoryIsLoading || deleteLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'admin-category-screen'}>
                <Modal title="Delete category" open={deleteModelOpen} onOk={deleteOkHandler} onCancel={cancelDelete}>
                    <p>Are you sure about this category deletion?</p>
                </Modal>
                <div className={'admin-category-screen-container'}>
                    <p className={'admin-category-screen-title'}>Categories</p>
                    <div className={'admin-category-screen-button-container'}>
                        <div className={'no-content'}></div>
                        <CustomButton title={'Create category'} onClick={createCategoryNavigator} fontColor={'#f0f0f0'} bgColor={'#41B06E'}/>
                    </div>
                    <table className={'admin-category-table'}>
                        <thead>
                        <tr>
                            <th className={'admin-category-table-header'}>ID</th>
                            <th className={'admin-category-table-header'}>Title</th>
                            <th className={'admin-category-table-header'}>Image</th>
                            <th className={'admin-category-table-header'}>Created At</th>
                            <th className={'admin-category-table-header'}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories.map((category, index) => {
                            return <tr key={index}>
                                <td className={'admin-category-table-data'}>{category.id}</td>
                                <td className={'admin-category-table-data'}>{category.title}</td>
                                <td>
                                    <img alt={'category-img'} className={'admin-category-table-image'}
                                         src={category.presigned_url}/>
                                </td>
                                <td className={'admin-category-table-data'}>{new Date(category.created_at).toLocaleDateString()}</td>
                                <td>
                                    <MdDelete className={'admin-category-table-icon'} onClick={() => deleteHandler(category.id)}/>
                                </td>
                            </tr>
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default AdminCategoriesScreen;