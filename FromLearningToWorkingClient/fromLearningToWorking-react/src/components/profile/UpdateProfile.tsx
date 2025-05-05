import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchUserById, updateUser } from '../../store/slices/userSlice';
import { StoreType } from '../../store/store';

const UpdateProfile: React.FC = () => {
    const { user, loading, error } = useSelector((state: StoreType) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '', // Add password field
    });

    const [loginMessage, setLoginMessage] = useState<string | null>(null);

    useEffect(() => {
        if (!user) {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setLoginMessage('You must log in to access this page. Redirecting to login...');
                setTimeout(() => {
                    navigate('/login');
                }, 3000);
                return;
            } else {
                dispatch(fetchUserById(Number(userId)));
            }
        } else {
            // Populate form with user data
            setFormData({
                name: user.name || '',
                email: user.email || '',
                password:user.password || '', // Leave password empty for security
            });
        }
    }, [user, dispatch, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (user?.id) {
            await dispatch(updateUser({ id: user.id, user: formData }));
        }
    };

    return (
        <div>
            <h2>Update Profile</h2>
            {loginMessage && <p style={{ color: 'red' }}>{loginMessage}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                        placeholder="Enter new password if you want to change it"
                    />
                </div>
                <button type="submit" disabled={loading}>
                    {loading ? 'Updating...' : 'Update'}
                </button>
            </form>
        </div>
    );
};

export default UpdateProfile;