import React from 'react';

import './CategoryTile.css';

const CategoryTile = ({ id, image, title, onClick }) => {
    return(
        <div style={{ backgroundImage: `url(${image})` }} className={'category-tile'} onClick={() => onClick(id)}>
            <p className={'category-tile-text'}>{title}</p>
        </div>
    )
}

export default CategoryTile;