import React from "react";

import './CustomFileSelect.css';

const CustomFileSelect = ({ id, isError, errorMessage, title, value, onChangeHandle }) => {
    return(
        <div className={'custom-file-container'}>
            <label className={'custom-file-label'}>
                {title}
            </label>
            <input id={id} value={value} onChange={onChangeHandle} type={'file'} className={'custom-file-input'} multiple={false}/>
            {isError && <p className={'custom-file-error'}>{errorMessage}</p>}
        </div>
    )
}

export default CustomFileSelect;