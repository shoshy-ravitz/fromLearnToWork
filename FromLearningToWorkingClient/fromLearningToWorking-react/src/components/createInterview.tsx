import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question';
import { checkAnswer, createInterview, nextQuestion } from '../store/interviewSlice';
import { StoreType } from '../store/store';
import { Button } from '@mui/material';


const CreateInterview = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(createInterview());
    }), []

    return (
        <>
           create interview componant 
        </>
    );
};

export default CreateInterview;