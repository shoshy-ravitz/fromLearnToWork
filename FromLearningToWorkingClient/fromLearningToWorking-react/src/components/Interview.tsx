import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Question from './Question';
import { StoreType } from '../store/store';
import { nextQuestion } from '../store/interviewSlice';
import CreateInterview from './createInterview';
import { Button } from '@mui/material';
import ResultOfInterview from './ResultOfInterview';

const Interview = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate(); // React Router hook for navigation
    const questions = useSelector((state: StoreType) => state.interview.questions);
    const currentQuestionIndex = useSelector((state: StoreType) => state.interview.currentQuestionIndex);
    const interviewId = useSelector((state: StoreType) => state.interview.IdInterview);

    const handleNextQuestion = () => {
        dispatch(nextQuestion());
    };

    const handleFinishInterview = () => {
        // debugger
        // navigate('/login');
        navigate(`/resultInterview/${interviewId}`); // Navigate to the result page
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
                {/* <Button
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '20px' }}
                        onClick={handleFinishInterview}
                    >
                        Finish Interview
                    </Button> */}
                {/* <Button color="inherit" component={Link} to={`/resultInterview/${interviewId}`}>
                    result interview
                </Button> */}
            </div>
        </>
    );
};

export default Interview;