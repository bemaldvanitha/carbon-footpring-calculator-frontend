import React, { useState, useEffect } from 'react';
import { Spin, Tooltip } from "antd";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Pie, PieChart, XAxis, YAxis } from "recharts";
import { useNavigate } from "react-router";

import CustomButton from "../../components/common/CustomButton";
import { useGetFundingByUserQuery, useGetTotalFundingQuery, useGetFundingByProjectQuery, useGetFundingByCategoryQuery
    } from "../../slicers/adminSlice";

import './AdminDashboardScreen.css';

const CATEGORY_COLORS = ['#C3FF93', '#00C49F', '#8DECB4', '#87A922', '#114232', '#12372A'];
const PROJECT_COLORS = ['#FFAF45', '#FF8A08', '#FC4100', '#DA0C81', '#872341', '#940B92'];
const USER_COLORS = ['#8884d8', '#BC7FCD', '#B51B75', '#640D6B', '#D20062', '#430A5D'];

const AdminDashboardScreen = () => {
    const navigate = useNavigate();
    const [chartWidth, setChartWidth] = useState(window.innerWidth * 0.8);
    const [totalFunding, setTotalFunding] = useState({});
    const [fundingByCategory, setFundingByCategory] = useState([]);
    const [fundingByProject, setFundingByProject] = useState([]);
    const [fundingByUser, setFundingByUser] = useState([]);

    const { data: fundingByUserData, isLoading: isFundingByUserLoading, error: fundingByUserError } = useGetFundingByUserQuery();
    const { data: totalFundingData, isLoading: isTotalFundingLoading, error: totalFundingError } = useGetTotalFundingQuery();
    const { data: fundingByProjectData, isLoading: isFundingByProjectLoading, error: fundingByProjectError } = useGetFundingByProjectQuery();
    const { data: fundingByCatData, isLoading: isFundingByCatLoading, error: fundingByCatError } = useGetFundingByCategoryQuery();

    useEffect(() => {
        const handleResize = () => {
            setChartWidth(window.innerWidth * 0.8);
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    useEffect(() => {
        if(fundingByUserData?.data){
            const transformedUserData = fundingByUserData?.data.map(userItem => {
                return {
                    name: userItem.name,
                    value: parseInt(userItem.funding)
                }
            });
            setFundingByUser(transformedUserData);
        }

        if(fundingByProjectData?.data){
            const transformedProjectData = fundingByProjectData?.data.map(projData => {
                return {
                    name: projData.name,
                    value: parseInt(projData.funding)
                }
            })
            setFundingByProject(transformedProjectData);
        }

        if(fundingByCatData?.data){
            const transformedCatData = fundingByCatData?.data.map(catItem => {
                return {
                    name: catItem.name,
                    value: parseInt(catItem.funding)
                }
            });
            setFundingByCategory(transformedCatData);
        }

        if(totalFundingData?.data){
            setTotalFunding(totalFundingData?.data);
        }
    }, [fundingByCatData, fundingByProjectData, totalFundingData, fundingByUserData]);

    const navigateToCategoriesManager = () => {
        navigate('/admin-categories');
    }

    const navigateToProjectsManager = () => {
        navigate('/admin-projects');
    }

    if(isFundingByProjectLoading || isFundingByCatLoading || isTotalFundingLoading || isFundingByUserLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'admin-dashboard-screen'}>
                <div className={'admin-dashboard-total-container'}>
                    <div className={'admin-dashboard-total-box'}>
                        <p className={'admin-dashboard-total-box-title'}>Total Funding for Projects</p>
                        <p className={'admin-dashboard-total-box-desc'}>{totalFunding?.total}$</p>
                    </div>
                </div>
                <div className={'admin-navigate-container'}>
                    <CustomButton title={'Category Manager'} bgColor={'#87A922'} fontColor={'#f0f0f0'}
                                  onClick={navigateToCategoriesManager}/>
                    <CustomButton title={'Project Manager'} bgColor={'#00C49F'} fontColor={'#f0f0f0'}
                                  onClick={navigateToProjectsManager}/>
                </div>
                <div className={'admin-dashboard-chart-container-row-1'}>
                    <div className={'admin-dashboard-chart-container'}>
                        <p className={'admin-dashboard-chart-container-title'}>Funding By Category</p>
                        <div>
                            <PieChart width={400} height={400}>
                                <Pie data={fundingByCategory} cx="50%" cy="50%" innerRadius={60} outerRadius={80} fill="#8884d8"
                                     paddingAngle={5} dataKey="value" nameKey={"name"} label={(entry) => entry.name}>
                                    {
                                        fundingByCategory.map((entry, index) =>
                                            <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                                    )}
                                </Pie>
                            </PieChart>
                        </div>
                    </div>
                    <div className={'admin-dashboard-chart-container'}>
                        <p className={'admin-dashboard-chart-container-title'}>Funding By Project</p>
                        <div>
                            <PieChart width={400} height={400}>
                                <Pie data={fundingByProject} dataKey="value" nameKey="name" cx="50%" cy="50%"
                                     outerRadius={80} labelLine={true}>
                                    {
                                        fundingByProject.map((entry, index) =>
                                            <Cell key={`cell-${index}`} fill={PROJECT_COLORS[index % PROJECT_COLORS.length]} />)
                                    }
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </div>
                    </div>
                </div>
                <div className={'admin-dashboard-chart-container-row-2'}>
                    <div  className={'admin-dashboard-chart-container'}>
                        <p className={'admin-dashboard-chart-container-title'}>Funding By User</p>
                        <div className={'admin-dashboard-chart-box'}>
                            <BarChart width={chartWidth} height={250} data={fundingByUser}>
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis dataKey={'value'}/>
                                <Tooltip/>
                                <Legend/>
                                <Bar dataKey="value">
                                    {fundingByUser.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={USER_COLORS[index % USER_COLORS.length]}/>
                                    ))}
                                </Bar>
                            </BarChart>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AdminDashboardScreen;