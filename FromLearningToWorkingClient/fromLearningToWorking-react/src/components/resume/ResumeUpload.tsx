import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addResume } from '../../store/slices/resumeSlice';
import { StoreType } from '../../store/store';

const ResumeUpload: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const userId = useSelector((state: StoreType) => state.auth.userId);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
            setError(null);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            setError('אנא בחר קובץ להעלאה.');
            return;
        }


        try {
            await dispatch(addResume({ userId, file })).unwrap(); // שליחת userId, file, ו-token
            alert('הקובץ הועלה בהצלחה!');
            setFile(null);
        } catch (err) {
            setError('העלאת הקובץ נכשלה. נסה שוב.');
        }
    };

    return (
        <div>
            <h2>העלאת קורות חיים</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">העלה</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default ResumeUpload;