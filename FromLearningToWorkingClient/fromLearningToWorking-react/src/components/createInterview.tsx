import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Question from './Question';
import { checkAnswer, nextQuestion, uploadResume } from '../store/interviewSlice';
import { StoreType } from '../store/store';


const CreateInterview = () => {
    const dispatch = useDispatch();
    const [file, setFile] = React.useState('');

    const handleChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(uploadResume(file));
    };


    return (
        <div>
            <h1>שאלות מהשרת</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    accept=".pdf"
                    onChange={handleChange}
                />
                <button type="submit">שלח קורות חיים</button>
            </form>
        </div>
    );
};

export default CreateInterview;