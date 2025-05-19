// filepath: c:\פרויקט\FromLearningToWorkingClient\fromLearningToWorking-react\src\components\auth\Register.tsx
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { StoreType } from '../../store/store';
import { registerUser } from '../../store/slices/authSlice';
import { useNotification } from '../../context/NotificationContext';
import useAsyncDispatch from '../../hooks/useAsyncDispatch';
import { useNavigate } from 'react-router-dom';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
};

const Register: React.FC = () => {
    const [open, setOpen] = useState(true);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { loading } = useSelector((state: StoreType) => state.auth);
    const { showNotification } = useNotification();
    const { asyncDispatch } = useAsyncDispatch();
    const navigate = useNavigate(); // הוספת useNavigate

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            await asyncDispatch(
                registerUser({ email, password, name }),
                'Registration successful!',
                'Registration failed. Please check your details and try again.'
            );
            setOpen(false);
            navigate('/home'); // ניתוב לדף הבית לאחר הצלחה
        } catch (error) {
            showNotification('Registration failed. Please check your details and try again.', 'error');
        }
    };

    return (
        <div>
            <Modal open={open} onClose={() => setOpen(false)}>
                <Box sx={style}>
                    <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
                        Register
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            fullWidth
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Email"
                            type="email"
                            variant="outlined"
                            fullWidth
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            fullWidth
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            sx={{ mb: 2 }}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                            <Button variant="contained" color="primary" type="submit" disabled={loading}>
                                {loading ? 'Registering...' : 'Save'}
                            </Button>
                            <Button variant="outlined" color="secondary" onClick={() => setOpen(false)}>
                                Cancel
                            </Button>
                        </Box>
                    </form>
                </Box>
            </Modal>
        </div>
    );
};

export default Register;