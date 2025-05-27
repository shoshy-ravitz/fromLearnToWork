import React from 'react';
import { useSelector } from 'react-redux';
import { downloadResume } from '../../store/slices/resumeSlice';
import { StoreType } from '../../store/store';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate } from 'react-router-dom';

const DownloadResume: React.FC = () => {
    const { asyncDispatch } = useAsyncDispatch();
    const userId = useSelector((state: StoreType) => state.auth.userId);
    const navigate = useNavigate();

    const handleDownload = async () => {
        if (!userId) {
            alert('משתמש לא מזוהה. אנא התחבר.');
            navigate('/login');
            return;
        }

        try {
            // Step 1: Fetch the presigned URL
            const presignedUrl = await asyncDispatch(
                downloadResume(Number(userId)),
                'הקובץ יורד בהצלחה!',
                'הורדת הקובץ נכשלה. נסה שוב.'
            );

            if (presignedUrl) {
                // Step 2: Trigger the download
                const link = document.createElement('a');
                link.href = presignedUrl;
                link.download = 'resume.pdf'; // Set the default file name
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // Step 3: Show success message
                alert('הקובץ הורד בהצלחה!');
            }
        } catch (error) {
            console.error('Error downloading resume:', error);
            alert('אירעה שגיאה במהלך הורדת הקובץ. נסה שוב.');
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