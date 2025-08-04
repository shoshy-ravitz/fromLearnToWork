import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchResumeByUserId, updateResumeWithPresignedUrl } from '../../store/slices/resumeSlice';
import { StoreType } from '../../store/store';
import axios from 'axios';
import API from '../../services/axios.interceptor';

const UpdateResume: React.FC = () => {
    const dispatch = useDispatch();
    const { resume, loading, error } = useSelector((state: StoreType) => state.resume);
    const [file, setFile] = useState<File | null>(null);
    const userId = useSelector((state: StoreType) => state.auth.userId);

    useEffect(() => {
        dispatch(fetchResumeByUserId(userId));
    }, [dispatch, userId]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setFile(event.target.files[0]);
        }
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!file) {
            alert('אנא בחר קובץ להעלאה.');
            return;
        }

        try {
           
            await dispatch(updateResumeWithPresignedUrl({ userId: Number(userId), file }));
        //   debugger
            let json=JSON.stringify(file.name);
            console.log(json);
        
          const response = await API.put(`/resume/update/${userId}`,`${file.name}` );

        console.log(response.data);
          
          setFile(null);
        } catch (error) {
            console.error('Error updating resume:', error);
        }
    };

    return (
        <div>
            <h2>עדכון קורות חיים</h2>
            {loading && <p>טוען...</p>}
            {error && (
                <p style={{ color: 'red' }}>
                    {typeof error === 'string' ? error : JSON.stringify(error)}
                </p>
            )}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="file">בחר קובץ:</label>
                    <input type="file" id="file" onChange={handleFileChange} />
                </div>
                <button type="submit">עדכן</button>
            </form>
            {resume && (
                <div>
                    <h3>קובץ נוכחי:</h3>
                    <p>{resume.fileName}</p>
                </div>
            )}
        </div>
    );
};

export default UpdateResume;


// import React, { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { updateResume } from '../../store/slices/resumeSlice';
// import { StoreType } from '../../store/store';
// import useAsyncDispatch from '../../hooks/useAsyncDispatch';

// const UpdateResume: React.FC = () => {
//     const resumes = useSelector((state: StoreType) => state.resume.resumes);
//     const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
//     const [file, setFile] = useState<File | null>(null);
//     const { asyncDispatch } = useAsyncDispatch();

//     const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//         if (event.target.files && event.target.files[0]) {
//             setFile(event.target.files[0]);
//         }
//     };

//     const handleSubmit = async (event: React.FormEvent) => {
//         event.preventDefault();

//         if (!selectedResumeId) {
//             asyncDispatch(null, '', 'אנא בחר קובץ לעדכון.');
//             return;
//         }

//         if (!file) {
//             asyncDispatch(null, '', 'אנא בחר קובץ להעלאה.');
//             return;
//         }

//         try {
//             await asyncDispatch(
//                 updateResume({ id: selectedResumeId, file }),
//                 'קורות החיים עודכנו בהצלחה!',
//                 'עדכון קורות החיים נכשל. נסה שוב.'
//             );
//             setFile(null);
//         } catch (error) {
//             console.error('Error updating resume:', error);
//         }
//     };

//     return (
//         <div>
//             <h2>עדכון קורות חיים</h2>
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label htmlFor="resume">בחר קובץ:</label>
//                     <select
//                         id="resume"
//                         value={selectedResumeId || ''}
//                         onChange={(e) => setSelectedResumeId(e.target.value)}
//                     >
//                         <option value="" disabled>
//                             -- בחר קובץ --
//                         </option>
//                         {resumes.map((resume) => (
//                             <option key={resume.id} value={resume.id}>
//                                 {resume.fileName}
//                             </option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label htmlFor="file">בחר קובץ:</label>
//                     <input type="file" id="file" onChange={handleFileChange} />
//                 </div>
//                 <button type="submit">עדכן</button>
//             </form>
//         </div>
//     );
// };

// export default UpdateResume;