import React from 'react';

import './InputQuestion.css'

const InputQuestion = ({ title, value, onChangeValue, placeholder, isError, errorMessage }) => {
    return(
        <div className={'input-question'}>
            <p className={'input-question-title'}>{title}</p>
            <div className={'input-question-container'}>
                <input type={'number'} value={value} onChange={(e) => onChangeValue(e.target.value)}
                    placeholder={placeholder} className={'input-question-input'}/>
            </div>
            {isError && <p className={'input-question-error-text'}>{errorMessage}</p>}
        </div>
    )
}

export default InputQuestion;