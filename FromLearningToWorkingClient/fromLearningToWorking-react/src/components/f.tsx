import React, { useState } from 'react';
import axios from 'axios';

const Questions = () => {
    const [file, setFile] = useState(null);
    const [questions, setQuestions] = useState('');
    const [error, setError] = useState('');

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setQuestions('');

        if (!file) {
            setError('נא לבחור קובץ קורות חיים.');
            return;
        }

        const formData = new FormData();
        formData.append('resume', file);

        try {
            const response = await axios.post('http://localhost:5000/upload_resume', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setQuestions(response.data.questions);
        } catch (err) {
            console.log(err);
            
            setError(err.response ? err.response.data.error : 'שגיאה בלתי צפויה');
        }
    };

    return (
        <div>
            <h1>העלאת קורות חיים</h1>
            <form onSubmit={handleSubmit}>
                <input type="file" accept=".pdf" onChange={handleFileChange} />
                <button type="submit">שלח</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {questions && (
                <div>
                    <h2>שאלות שנוצרו:</h2>
                    <p>{questions}</p>
                </div>
            )}
        </div>
    );
};

export default Questions;