import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { checkAnswer, saveAnswer } from '../store/interviewSlice';

const Question = ({index, question }) => {
    const [answer, setAnswer] = useState('');
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();

    const [feedback,setFeedback]=useState('')

    const handleAnswerChange = (e) => {
        setAnswer(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            // שמירת התשובה ב-Redux
            dispatch(saveAnswer({answer}));

            // שליחת התשובה לשרת וקבלת פידבק
            const feedbackAnswer = await dispatch(checkAnswer({ question, answer })).unwrap();
            setFeedback(feedbackAnswer)
            setAnswer('');
        } catch (error) {
            console.error('Error checking answer:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            question namber : {index}
            <h2>{question}</h2>
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
            <div>  {feedback}</div>   
        </div>
    );
};

export default Question;