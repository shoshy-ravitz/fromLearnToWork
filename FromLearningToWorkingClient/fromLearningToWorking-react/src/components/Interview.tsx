import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question';
import { checkAnswer, createInterview, nextQuestion } from '../store/interviewSlice';
import { StoreType } from '../store/store';
import CreateInterview from './createInterview';


const Interview = () => {
    const dispatch = useDispatch();
    const questions = useSelector((state: StoreType) => state.interview.questions);
    const currentQuestionIndex = useSelector((state: StoreType) => state.interview.currentQuestionIndex);
    // const [file, setFile] = React.useState('');

    // const handleChange = (e) => {
    //     if (e.target.files && e.target.files[0]) {
    //         setFile(e.target.files[0]);
    //     }
    // };
    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(uploadResume(file));
    // };

    const handleFeedbackReceived = (feedback) => {
        dispatch(checkAnswer({ question: questions[currentQuestionIndex], answer: feedback }));
        dispatch(nextQuestion()); // מעדכן את currentQuestionIndex
    };

    return (
        <div>
            <h2>ראיון</h2>
            <CreateInterview />
fdas
            {questions.map((question, index) => (
                <Question
                    // key={index}
                    question={question}
                    index={index}
                />
            ))}
        </div>
    );
};

export default Interview;