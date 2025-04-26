import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question';
import { checkAnswer, createInterview, nextQuestion } from '../store/interviewSlice';
import { StoreType } from '../store/store';
import { Button } from '@mui/material';
import { User } from '../models/user.model';


const CreateInterview = () => {
    const dispatch = useDispatch();
    // const user :User= useSelector((state: any) => state.auth.user);
    const createNewInterview = () => {
        const userId = localStorage.getItem('userId')
        dispatch(createInterview({ userId: userId }))
    }

    return (
        <>
            <Button onClick={() => createNewInterview()}>start interview</Button>
        </>
    );
};

export default CreateInterview;