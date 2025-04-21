import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question';
import { StoreType } from '../store/store';
import { createInterview, nextQuestion } from '../store/interviewSlice';
import CreateInterview from './createInterview';
import { Button } from '@mui/material';

const Interview = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state: StoreType) => state.interview.questions);
    const currentQuestionIndex = useSelector((state: StoreType) => state.interview.currentQuestionIndex);

    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };

    if (questions.length === 0) {
        return <CreateInterview />;
    }

    return (
       <>
        <div>
            <h2>Interview</h2>
            <Question
                key={questions[currentQuestionIndex].id}
                question={questions[currentQuestionIndex].question}
                index={currentQuestionIndex + 1}
                onNext={handleNextQuestion} // Pass the callback to move to the next question
            />
        </div>
        </>
    );
};

export default Interview;