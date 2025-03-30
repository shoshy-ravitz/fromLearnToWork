import axios from 'axios';
import { API_BASE_URL } from './config'
// יצירת מופע של Axios
const API = axios.create({
    baseURL: API_BASE_URL,
});

// הוספת Interceptor
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

export default API;
