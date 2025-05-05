import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAnswer, saveAnswer } from '../../../store/slices/interviewSlice';
import { StoreType } from '../../../store/store';

const Question = ({ index, question, onNext }) => {
    const [answer, setAnswer] = useState(' ');
    const [loading, setLoading] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0);
    const dispatch = useDispatch();
    const codeInterview=useSelector(((state: StoreType) => state.interview.IdInterview));

    useEffect(() => {
        // התחל טיימר כאשר השאלה מוצגת
        setElapsedTime(0);
        const timer = setInterval(() => {
            setElapsedTime((prevTime) => prevTime + 1);
        }, 1000);

        // נקה את הטיימר כאשר הקומפוננטה מתנתקת
        return () => clearInterval(timer);
    }, [question]);

    const handleAnswerChange = (e) => {     
        setAnswer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            dispatch(saveAnswer({ answer }));

            const feedbackAnswer = await dispatch(
                checkAnswer({
                    question,
                    answer,
                    time: elapsedTime, 
                    interviewId: codeInterview, 
                })
            ).unwrap();

            setAnswer(' ');
            onNext();
        } catch (error) {
            console.error('Error checking answer:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h3>Question {index}</h3>
            <h2>{question}</h2>
            {!loading && <p>Time Elapsed: {elapsedTime} seconds</p> }
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={answer}
                    onChange={handleAnswerChange}
                    placeholder="הקלד את התשובה שלך"
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'שולח...' : 'שלח תשובה'}
                </button>
            </form>
        </div>
    );
};

export default Question;