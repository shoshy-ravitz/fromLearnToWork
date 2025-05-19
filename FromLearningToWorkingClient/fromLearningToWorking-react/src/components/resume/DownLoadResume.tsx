import React from 'react';
import { useSelector } from 'react-redux';
import { downloadResume } from '../../store/slices/resumeSlice';
import { StoreType } from '../../store/store';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';

const DownloadResume: React.FC = () => {
    const { asyncDispatch } = useAsyncDispatch();
    const userId = useSelector((state: StoreType) => state.auth.userId);

    const handleDownload = async () => {
        if (!userId) {
            asyncDispatch(null, '', 'משתמש לא מזוהה. אנא התחבר.');
            return;
        }

        try {
            const presignedUrl = await asyncDispatch(
                downloadResume(Number(userId)),
                'הקובץ יורד בהצלחה!',
                'הורדת הקובץ נכשלה. נסה שוב.'
            );
            if (presignedUrl) {
                window.open(presignedUrl, '_blank');
            }
        } catch (error) {
            console.error('Error downloading resume:', error);
        }
    };

    return (
        <div>
            <h2>הורדת קורות חיים</h2>
            <button onClick={handleDownload}>הורד קורות חיים</button>
        </div>
    );
};

export default DownloadResume;