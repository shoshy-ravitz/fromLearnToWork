import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { checkAnswer, saveAnswer } from '../store/interviewSlice';

const Question = ({ index, question, onNext }) => {
    const [answer, setAnswer] = useState(' ');
    const [loading, setLoading] = useState(false);
    const [elapsedTime, setElapsedTime] = useState(0); // זמן שחלף
    const dispatch = useDispatch();

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
            // שמירת התשובה ב-Redux
            dispatch(saveAnswer({ answer }));

            // שליחת התשובה לשרת יחד עם הזמן שחלף
            const feedbackAnswer = await dispatch(
                checkAnswer({
                    question,
                    answer,
                    time: elapsedTime, // הזמן שחלף
                    interviewId: 5, // מזהה ראיון לדוגמה
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
            <p>Time Elapsed: {elapsedTime} seconds</p> {/* הצגת הזמן שחלף */}
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