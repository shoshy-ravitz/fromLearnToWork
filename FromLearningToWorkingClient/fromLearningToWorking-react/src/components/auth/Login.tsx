import React, { useState } from 'react';
import { loginUser } from '../../store/slices/authSlice';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { asyncDispatch } = useAsyncDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await asyncDispatch(
                loginUser({ email, password }),
                'התחברת בהצלחה!'
            );
            navigate('/home'); // ניתוב לדף הבית לאחר התחברות מוצלחת
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    return (
        <div>
            <h2>התחברות</h2>
            <form onSubmit={handleLogin}>
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
                <button type="submit">התחבר</button>
            </form>
        </div>
    );
};

export default Login;