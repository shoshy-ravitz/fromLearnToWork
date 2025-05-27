import React, { useState } from 'react';
import { registerUser } from '../../store/slices/authSlice';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { asyncDispatch } = useAsyncDispatch();
    const navigate = useNavigate();

    const handleRegister = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await asyncDispatch(
                registerUser({ name, email, password }),
                'נרשמת בהצלחה!'
            );
            navigate('/home'); // ניתוב לדף הבית לאחר הרשמה מוצלחת
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h2>הרשמה</h2>
            <form onSubmit={handleRegister}>
                <div>
                    <label>שם:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>אימייל:</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>סיסמה:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">הרשם</button>
            </form>
        </div>
    );
};

export default Register;