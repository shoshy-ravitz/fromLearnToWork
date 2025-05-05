import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - הדף לא נמצא</h1>
      <p>הדף שחיפשת אינו קיים.</p>
      <button onClick={() => navigate('/')} style={{ marginTop: '20px' }}>
        חזרה לדף הבית
      </button>
    </div>
  );
};

export default NotFound;
