import React from 'react';

import './SingleChoiseQuestion.css';

const SingleChoiseQuestion = ({ value, onChangeValue, title, options, isError, errorMessage }) => {
    return(
        <div className={'single-choise-option'}>
            <p className={'single-choise-option-title'}>{ title }</p>
            <div className={'single-choise-option-container'}>
                {options.map((option, index) => {
                    return(
                        <div key={index} onClick={() => onChangeValue(option.value)} className={`single-choise-option-box 
                        ${value === option.value ? 'single-choise-option-box-selected': 'single-choise-option-box-not-selected'}`}>
                            <img alt={'option-image'} src={option.image} className={'single-choise-option-box-image'}/>
                            <p className={'single-choise-option-box-text'}>{option.title}</p>
                        </div>
                    )
                })}
            </div>
            {isError && <p className={'single-choise-error-text'}>{errorMessage}</p>}
        </div>
    )
}

export default SingleChoiseQuestion;