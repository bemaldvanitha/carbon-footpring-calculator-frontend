import React from 'react';

import './SingleChoiseQuestion.css';

const SingleChoiseQuestion = ({ value, onChangeValue, title, options, isError, errorMessage, isMultiple = false }) => {

    const isSelectHandler = (selected, currentOne) => {
        if(isMultiple){
            let idx = selected.findIndex(item => item === currentOne);
            return idx !== -1;

        }
        return selected === currentOne;
    }

    return(
        <div className={'single-choise-option'}>
            <p className={'single-choise-option-title'}>{ title }</p>
            <div className={'single-choise-option-container'}>
                {options.map((option, index) => {
                    return(
                        <div key={index} onClick={() => onChangeValue(option.value)} className={`single-choise-option-box 
                        ${isSelectHandler(value, option.value) ? 'single-choise-option-box-selected': 'single-choise-option-box-not-selected'}`}>
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