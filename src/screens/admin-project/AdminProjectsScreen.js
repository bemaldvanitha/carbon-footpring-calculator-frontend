import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router";
import { message, Modal, Spin } from "antd";
import { MdDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

import CustomButton from "../../components/common/CustomButton";
import { useFetchProjectsQuery } from "../../slicers/projectSlice";
import { useDeleteProjectMutation } from "../../slicers/projectSlice";

import './AdminProjectsScreen.css';

const AdminProjectsScreen = () => {
    const navigate = useNavigate();
    const [projects, setProjects] = useState([]);
    const [deleteModelOpen, setDeleteModelOpen] = useState(false);
    const [deleteProjId, setDeleteProjId] = useState(0);

    const { data: projectData, isLoading: projectIsLoading, error: projectError } = useFetchProjectsQuery();
    const [deleteProject, { isLoading: projectDeleteLoading }] = useDeleteProjectMutation();

    useEffect(() => {
        if(projectData?.data){
            setProjects(projectData?.data);
        }
    }, [projectData]);

    const deleteHandler = (id) => {
        setDeleteModelOpen(true);
        setDeleteProjId(id);
    }

    const cancelDelete = () => {
        setDeleteModelOpen(false);
        setDeleteProjId(0);
    }

    const deleteOkHandler = async () => {
        try {
            const res = await deleteProject(deleteProjId).unwrap();
            message.success(res?.message);
        }catch (err){
            message.error(err?.data?.message);
        }

        setDeleteModelOpen(false);
        setDeleteProjId(0)
    }

    const createProjectNavigator = () => {
        navigate('/add-project');
    }

    const editHandler = (projectId) => {
        navigate(`/add-project?project_id=${projectId}`);
    }

    if(projectIsLoading || projectDeleteLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'admin-project-screen'}>
                <Modal title="Delete category" open={deleteModelOpen} onOk={deleteOkHandler} onCancel={cancelDelete}>
                    <p>Are you sure about this category deletion?</p>
                </Modal>
                <div className={'admin-project-screen-container'}>
                    <p className={'admin-project-screen-title'}>Projects</p>

                    <div className={'admin-project-screen-button-container'}>
                        <div className={'no-content'}></div>
                        <CustomButton title={'Create Project'} onClick={createProjectNavigator} fontColor={'#f0f0f0'} bgColor={'#41B06E'}/>
                    </div>

                    <table className={'admin-project-table'}>
                        <thead>
                        <tr>
                            <th className={'admin-project-table-header'}>ID</th>
                            <th className={'admin-project-table-header'}>Title</th>
                            <th className={'admin-project-table-header'}>Image</th>
                            <th className={'admin-project-table-header'}>Location</th>
                            <th className={'admin-project-table-header'}>Created At</th>
                            <th className={'admin-project-table-header'}>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {projects.map((project, index) => {
                            return <tr key={index}>
                                <td className={'admin-project-table-data'}>{project.id}</td>
                                <td className={'admin-project-table-data'}>{project.title}</td>
                                <td>
                                    <img alt={'category-img'} className={'admin-project-table-image'}
                                         src={project.image}/>
                                </td>
                                <td className={'admin-project-table-data'}>{project.location}</td>
                                <td className={'admin-project-table-data'}>{new Date(project.created_at).toLocaleDateString()}</td>
                                <td>
                                    <MdDelete className={'admin-project-table-icon icon-delete'}
                                              onClick={() => deleteHandler(project.id)}/>
                                    <FaEdit className={'admin-project-table-icon icon-edit'} onClick={() => editHandler(project.id)}/>
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

export default AdminProjectsScreen;