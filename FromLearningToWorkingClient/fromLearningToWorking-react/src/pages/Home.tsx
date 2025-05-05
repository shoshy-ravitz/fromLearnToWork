import React from 'react';

const Home: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Welcome to From Learning to Working</h1>
            <p>
                We invite you to explore our platform and prepare for your next interview.
            </p>
            <button
                style={{
                    padding: '10px 20px',
                    fontSize: '16px',
                    backgroundColor: '#007BFF',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
                onClick={() => alert('Get ready for your interview!')}
            >
                Start Preparing
            </button>
        </div>
    );
};

export default Home;