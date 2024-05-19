import React from 'react';

import './ProjectTile.css';

const ProjectTile = ({ id, image, location, title, certification_type, onClickHandler }) => {
    return(
        <div onClick={() => onClickHandler(id)} className={'project-tile'}>
            <div className={'project-tile-image-container'}>
                <img alt={title} src={image} className={'project-tile-image'}/>
            </div>
            <div className={'project-tile-info-container'}>
                <p className={'project-tile-title'}>{title}</p>
                <div className={'project-tile-sub-info-container'}>
                    <p className={'project-tile-sub-info-location'}>🌎 {location}</p>
                    <div className={'project-tile-sub-info-certification-container'}>
                        <p className={'project-tile-sub-info-certification'}>📃 {certification_type}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectTile;