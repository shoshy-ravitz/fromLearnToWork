import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateResume } from '../../store/slices/resumeSlice';
import { StoreType } from '../../store/store';

const UpdateResume: React.FC = () => {
  const dispatch = useDispatch();
  const resumes = useSelector((state: StoreType) => state.resume.resumes);
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedResumeId) {
      setError('Please select a resume to update.');
      return;
    }

    if (!file) {
      setError('Please choose a file to upload.');
      return;
    }

    try {
      await dispatch(updateResume({ id: selectedResumeId, resume: { file } })).unwrap();
      alert('Resume updated successfully!');
      setFile(null);
    } catch (err) {
      setError('Failed to update the resume. Please try again.');
    }
  };

  return (
    <div>
      <h2>Update Resume</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="resume">Select Resume:</label>
          <select
            id="resume"
            value={selectedResumeId || ''}
            onChange={(e) => setSelectedResumeId(e.target.value)}
          >
            <option value="" disabled>
              -- Select a Resume --
            </option>
            {resumes.map((resume) => (
              <option key={resume.id} value={resume.id}>
                {resume.fileName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="file">Choose File:</label>
          <input type="file" id="file" onChange={handleFileChange} />
        </div>
        <button type="submit">Update</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default UpdateResume;
