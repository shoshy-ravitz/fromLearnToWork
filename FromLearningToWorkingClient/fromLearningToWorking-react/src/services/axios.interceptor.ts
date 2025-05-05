import axios from 'axios';
import { API_BASE_URL } from '../config/config';
import { toast } from 'react-toastify'; // Import a library for showing messages (optional)
import { useNavigate } from 'react-router-dom'; // For navigation

// Create an Axios instance
const API = axios.create({
    baseURL: API_BASE_URL,
});

// Add request interceptor
API.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);


API.interceptors.response.use(
    
    response => {
        return response;
    },
    error => {       
        if (error.response && error.response.status === 401) {
            localStorage.clear();
            window.location.href = '/login'; 
        }
        return Promise.reject(error);
    }
);

export default API;
