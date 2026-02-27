import axios from 'axios';

// For mobile builds (APK) the device "localhost" is the device itself.
// Use a fallback: in dev use localhost, in production build use Android emulator host.
const DEFAULT_LOCAL_API = import.meta.env.DEV ? 'http://localhost:5000/api' : 'http://10.0.2.2:5000/api';
const API_URL = import.meta.env.VITE_API_URL || DEFAULT_LOCAL_API;

const api = axios.create({
    baseURL: API_URL,
    timeout: 30000
});

// Add auth token to all requests from localStorage
api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('chatcam_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
