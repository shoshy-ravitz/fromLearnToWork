import React, { use, useState } from 'react';
import { useSelector } from 'react-redux';
import { addResume } from '../../store/slices/resumeSlice';
import { StoreType } from '../../store/store';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate } from 'react-router-dom';

const AddResume: React.FC = () => {
    const [file, setFile] = useState<File | null>(null);
    const { asyncDispatch } = useAsyncDispatch();
    const userId = useSelector((state: StoreType) => state.auth.userId);
    const navigate = useNavigate();
    
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            asyncDispatch(null, '', 'אנא בחר קובץ להעלאה.');
            return;
        }
        if(!userId) {
           alert('משתמש לא מזוהה. אנא התחבר.'); 
            navigate('/login'); 
        }

        try {
            console.log("commponant user id ",userId);
            
            await asyncDispatch(
                addResume({ userId, file }),
                'הקובץ הועלה בהצלחה!',
                'העלאת הקובץ נכשלה. נסה שוב.'
            );
            setFile(null);
        } catch (error) {
            console.error('Error uploading resume:', error);
        }
    };

    return (
        <div>
            <h2>הוספת קורות חיים</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">העלה</button>
            </form>
        </div>
    );
};

export default AddResume;