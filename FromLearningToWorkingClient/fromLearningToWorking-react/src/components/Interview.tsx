import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Question from './Question';
import { StoreType } from '../store/store';
import { createInterview, nextQuestion } from '../store/interviewSlice';
import CreateInterview from './createInterview';

const Interview = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state: StoreType) => state.interview.questions);
    const currentQuestionIndex = useSelector((state: StoreType) => state.interview.currentQuestionIndex);

    useEffect(() => {
        
        const userId = localStorage.getItem('userId')
        dispatch(createInterview({ userId: userId }))
    }, [])

    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };

    if (questions.length === 0) {
        return <p>No questions available. Please start an interview.</p>;
    }

    return (
        <div>
            {/* <CreateInterview /> */}
            <h2>Interview</h2>
            <Question
                key={questions[currentQuestionIndex].id}
                question={questions[currentQuestionIndex].question}
                index={currentQuestionIndex + 1}
                onNext={handleNextQuestion} // Pass the callback to move to the next question
            />
        </div>
    );
};

export default Interview;