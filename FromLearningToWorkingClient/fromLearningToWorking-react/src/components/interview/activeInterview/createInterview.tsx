import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createInterview, } from '../../../store/slices/interviewSlice';
import { User } from '../../../models/user.model';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';


const CreateInterview = () => {
    const dispatch = useDispatch();
    const userId :User= useSelector((state: any) => state.auth.userId);
    const navigate = useNavigate();
    
    const createNewInterview = () => {
        if (!userId) {
            alert('משתמש לא מזוהה. אנא התחבר.');
            navigate('/login');
        }
        dispatch(createInterview({ userId: userId }))
    }

    return (
        <>
            <Button onClick={() => createNewInterview()}>start interview</Button>
        </>
    );
};

export default CreateInterview;