import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Spin } from "antd";

import { useFetchSingleProjectQuery } from "../../slicers/projectSlice";

import './ProjectDetailScreen.css';

const ProjectDetailScreen = () => {
    const id = useParams().id;
    const [project, setProject] = useState({});
    const [mapImage, setMapImage] = useState('');

    const { data: projectData, isLoading: projectIsLoading, error: projectError } = useFetchSingleProjectQuery(id);

    const mapImageUrl = (latitude, longitude) => {
        //let latitude = project?.location?.latitude;
        //let longitude = project?.location?.longitude;
        const apiKey = 'AIzaSyBRibDiA4Da-Xx_aNQdj7x9wVDjfm9QNik';
        const zoom = 15;
        const size = '400x300';
        const markers = `markers=color:red|label:A|${latitude},${longitude}`;
        return `https://maps.googleapis.com/maps/api/staticmap?center=${5.9496},${80.5469}&zoom=${zoom}&size=${size}&${markers}&key=${apiKey}`;
    };

    useEffect(() => {
        setProject(projectData?.data);
    }, [projectData]);

    if(projectIsLoading){
        return <div className={'loading-container'}>
            <Spin size="large" />
        </div>
    }else {
        return(
            <div className={'project-detail-screen'}>
                <div style={{backgroundImage: `url(${project?.featured_image})`}}
                     className={'project-detail-screen-image-container'}>
                    <div>
                        <p className={'project-detail-screen-image-container-title'}>{project?.title}</p>
                        <p className={'project-detail-screen-image-container-location'}>{project?.location?.title}</p>
                    </div>
                </div>
                <div className={'project-detail-screen-detail-box'}>
                    <p className={'project-detail-screen-detail-box-title'}>Summary</p>
                    <p className={'project-detail-screen-detail-box-desc'}>{project?.summary}</p>
                </div>
                <div className={'project-detail-screen-detail-box'}>
                    <p className={'project-detail-screen-detail-box-title'}>How it works</p>
                    <p className={'project-detail-screen-detail-box-desc'}>{project?.how_it_work}</p>
                </div>
                <div className={'project-detail-screen-detail-box'}>
                    <p className={'project-detail-screen-detail-box-title'}>Project Images</p>
                    <div className={'project-detail-screen-detail-image-box'}>
                        {project?.project_images.map((image, index) => <img key={index} alt={index} src={image}
                                                                            className={'project-detail-screen-detail-image'}/>)}
                    </div>
                </div>
                <div className={'project-detail-screen-detail-box'}>
                    <p className={'project-detail-screen-detail-box-title'}>Location</p>
                    <p className={'project-detail-screen-detail-box-desc'}>{project?.location?.description}</p>
                    <p className={'project-detail-screen-detail-box-desc'}>🗺️ {project?.location?.title}</p>
                    <div className={'project-detail-screen-detail-map-box'}>
                        <img alt={'map'} src={mapImageUrl(project?.location?.latitude, project?.location?.longitude)}/>
                    </div>
                </div>
                <div className={'divider'}></div>
                <div className={'project-detail-screen-info-box'}>
                    <p className={'project-detail-screen-info-box-title'}>Project name</p>
                    <p className={'project-detail-screen-info-box-desc'}>{project?.title}</p>
                </div>
                <div className={'divider'}></div>
                <div className={'project-detail-screen-info-box'}>
                    <p className={'project-detail-screen-info-box-title'}>Active since</p>
                    <p className={'project-detail-screen-info-box-desc'}>{project?.active_since}</p>
                </div>
                <div className={'divider'}></div>
                <div className={'project-detail-screen-info-box'}>
                    <p className={'project-detail-screen-info-box-title'}>Certification</p>
                    <p className={'project-detail-screen-info-box-desc'}>{project?.certification_type}</p>
                </div>
                <div className={'divider'}></div>
                <div className={'project-detail-screen-info-box'}>
                    <p className={'project-detail-screen-info-box-title'}>Project developer</p>
                    <p className={'project-detail-screen-info-box-desc'}>{project?.project_developer?.name} /
                        {project?.project_developer?.organization}</p>
                </div>
                <div className={'divider'}></div>
                <div className={'project-detail-screen-info-box'}>
                    <p className={'project-detail-screen-info-box-title'}>Project design validator</p>
                    <p className={'project-detail-screen-info-box-desc'}>{project?.project_design_validator?.name} /
                        {project?.project_design_validator?.organization}</p>
                </div>
                <div className={'divider'}></div>
                <div className={'project-detail-screen-info-box'}>
                    <p className={'project-detail-screen-info-box-title'}>Project credit validator</p>
                    <p className={'project-detail-screen-info-box-desc'}>{project?.credits_validator?.name} /
                        {project?.credits_validator?.organization}</p>
                </div>
                <div className={'divider'}></div>
                <div className={'project-detail-screen-info-box'}>
                    <p className={'project-detail-screen-info-box-title'}>Technical documents</p>
                    <p className={'project-detail-screen-info-box-desc'}>
                        {project?.technical_documents.map((document, index) => <span key={index} className={'project-detail-document-box'}>
                        <a href={document} download={document} target="_blank">
                            Document {index + 1}
                        </a>
                    </span>)}
                    </p>
                </div>
                <div className={'divider'}></div>
                <div className={'project-detail-screen-info-box'}>
                    <p className={'project-detail-screen-info-box-title'}>Read more</p>
                    <a href={project?.read_more} target="_blank">More details</a>
                </div>
            </div>
        )
    }
}

export default ProjectDetailScreen;