import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { resultOfInterview } from '../../../store/slices/interviewSlice';
import { StoreType } from '../../../store/store';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';
import SketchOfInterviewResults from './sketchOfInterviewResults';
import QuestionsResult from './QuestionsResult';

const ResultOfInterview = () => {
    const { id: idParam } = useParams<{ id: string }>(); // Get the interview ID from the route parameters
    const id = idParam ? Number(idParam) : undefined; // Convert id to a number
    const dispatch = useDispatch();
    const { mark, feedback, timeInterview, status, error } = useSelector(
        (state: StoreType) => state.interview
    );

    useEffect(() => {
        if (id) {
            dispatch(resultOfInterview(Number(id))); // Fetch the result of the interview
        }
    }, [dispatch, id]);

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

    return (
        <Card style={{ maxWidth: 800, margin: '20px auto', padding: '20px' }}>
            <CardContent>
                <Typography variant="h4" gutterBottom>
                    Interview Result
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Total Mark: {(mark !== undefined && mark !== null) ? mark : 'N/A'}
                </Typography>
                <Typography variant="h6" color="textSecondary">
                    Total Time: {timeInterview || 'N/A'} seconds
                </Typography>
                <Typography variant="body1" style={{ marginBottom: '20px' }}>
                    {typeof feedback === 'object' ? JSON.stringify(feedback) : feedback || 'No feedback provided.'}
                </Typography>
                {id !== undefined &&
                    <>
                        <SketchOfInterviewResults interviewId={id} />
                        <QuestionsResult interviewId={id} />
                    </>}
            </CardContent>
        </Card>
    );
};

export default ResultOfInterview;