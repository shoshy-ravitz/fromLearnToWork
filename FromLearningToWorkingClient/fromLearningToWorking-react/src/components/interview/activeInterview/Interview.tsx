import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Question from './Question';
import { StoreType } from '../../../store/store';
import { nextQuestion } from '../../../store/slices/interviewSlice';
import CreateInterview from './createInterview';
import { Button } from '@mui/material';
import ResultOfInterview from '../resultInterview/ResultOfInterview';

const Interview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const questions = useSelector((state: StoreType) => state.interview.questions);
    const currentQuestionIndex = useSelector((state: StoreType) => state.interview.currentQuestionIndex);
    const interviewId = useSelector((state: StoreType) => state.interview.IdInterview);

    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };

    const handleFinishInterview = () => {
  
        navigate(`/resultInterview/${interviewId}`); 
        console.log("finish interview");

    }

    if (questions.length === 0) {
        return <CreateInterview />;
    }

    const isLastQuestion = currentQuestionIndex === questions.length - 1;

    return (
        <>
            <div>
                <h2>Interview</h2>
                {!isLastQuestion && <Question
                    key={questions[currentQuestionIndex].id}
                    question={questions[currentQuestionIndex].question}
                    index={currentQuestionIndex + 1}
                    onNext={handleNextQuestion} // Pass the callback to move to the next question
                />}
                { (
                    <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                        onClick={handleFinishInterview}
                    >
                        Finish Interview
                    </Button>
                )}
            </div>
        </>
    );
};

export default Interview;