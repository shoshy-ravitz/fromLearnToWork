import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestionsByInterviewId } from '../store/interviewSlice';
import { StoreType } from '../store/store';
import { CircularProgress, Typography } from '@mui/material';
import QuestionResult from './QuestionResult';

interface QuestionsResultProps {
    interviewId: number;
}

const QuestionsResult: React.FC<QuestionsResultProps> = ({ interviewId }) => {
    // const { id } = useParams<{ id: string }>(); // Get the interview ID from the route parameters
    const dispatch = useDispatch();
    const { questions, status, error } = useSelector((state: StoreType) => state.interview);
    
    // useEffect(() => {
    //     if (interviewId) {
    //         dispatch(getQuestionsByInterviewId(Number(interviewId))); // Fetch questions by interview ID
    //     }
    // }, []);

    if (status === 'loading') {
        return <CircularProgress style={{ display: 'block', margin: '20px auto' }} />;
    }

    if (status === 'failed') {
        return (
            <Typography variant="h6" color="error" style={{ textAlign: 'center', marginTop: '20px' }}>
                {error}
            </Typography>
        );
    }

    // if (!questions || questions.length === 0) {
    //     return (
    //         <Typography variant="h6" style={{ textAlign: 'center', marginTop: '20px' }}>
    //             No questions found for this interview.
    //         </Typography>
    //     );
    // }
    const handleFetchQuestions = () => {
        dispatch(getQuestionsByInterviewId(Number(interviewId))); // Fetch questions by interview ID
    };

    return (
        <>
        <button onClick={()=>handleFetchQuestions()}>fetch questions</button>
        <div style={{ maxWidth: '800px', margin: '20px auto' }}>
            <Typography variant="h4" gutterBottom>
                Questions Result
            </Typography>
            {questions.map((question) => (
                <QuestionResult key={question.id} question={question} />
            ))}
        </div>
        </>
        
    );
};

export default QuestionsResult;