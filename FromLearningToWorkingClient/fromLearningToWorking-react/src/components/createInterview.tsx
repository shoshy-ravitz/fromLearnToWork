import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question';
import { checkAnswer, createInterview, nextQuestion } from '../store/interviewSlice';
import { StoreType } from '../store/store';
import { Button } from '@mui/material';
import { User } from '../models/user.model';


const CreateInterview = () => {
    const dispatch = useDispatch();
    const user :User= useSelector((state: any) => state.auth.user);
    useEffect(() => {

        dispatch(createInterview({userId: user.id}))
    }), []

    return (
        <>
            create interview componant
        </>
    );
};

export default CreateInterview;