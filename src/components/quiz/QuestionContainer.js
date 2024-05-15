import React from 'react';

import './QuestionContainer.css';

const QuestionContainer = ({ children }) => {
    return(
        <div className={'question-container'}>
            {children}
        </div>
    )
}

export default QuestionContainer;