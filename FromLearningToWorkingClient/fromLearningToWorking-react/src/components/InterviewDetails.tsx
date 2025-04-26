import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getQuestionsByInterviewId } from '../store/interviewSlice';
import { StoreType } from '../store/store';
import { Card, CardContent, Typography, CircularProgress, List, ListItem, ListItemText } from '@mui/material';

const  InterviewDetails= () => {
    const { id } = useParams<{ id: string }>(); // Get the interview ID from the route parameters
    const dispatch = useDispatch();
    const { questions, status, error } = useSelector((state: StoreType) => state.interview);

    useEffect(() => {
        if (id) {
            // dispatch(getQuestionsByInterviewId(Number(id)));
        }
    }, [id, dispatch]);

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
                    Interview Details
                </Typography>

            </CardContent>
        </Card>
    );
};

export default InterviewDetails;