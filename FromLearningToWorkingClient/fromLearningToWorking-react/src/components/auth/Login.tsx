import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { loginUser } from '../../store/slices/authSlice';
import { StoreType } from '../../store/store';
import { useNotification } from '../../context/NotificationContext';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(true);
    const { loading } = useSelector((state: StoreType) => state.auth);
    const { showNotification } = useNotification();
    const { asyncDispatch } = useAsyncDispatch();
    const navigate = useNavigate();

    const handleLogin = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await asyncDispatch(
                loginUser({ email, password }),
                'Login successful!',
                'Invalid credentials. Please try again.'
            );
            setOpen(false);
            navigate('/home');
        } catch (error) {
            
            showNotification('Invalid credentials. Please try again.', 'error');
        }
    };

    return (
        <div>
            {open && (
                <div>
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div>
                            <label>Email:</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label>Password:</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" disabled={loading}>
                            {loading ? 'Logging in...' : 'Login'}
                        </button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Login;