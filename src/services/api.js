import axios from 'axios';

const api = axios.create({
    timeout: 30000
});

// Candidates to probe (env override first)
const DEFAULT_CANDIDATES = [
    () => import.meta.env.VITE_API_URL,
    () => 'http://localhost:5000/api',
    () => 'http://10.0.2.2:5000/api'
];

async function testBaseUrl(url) {
    if (!url) return false;
    try {
        const health = url.replace(/\/api$/, '') + '/health';
        const res = await fetch(health, { method: 'GET', cache: 'no-store' });
        return res && res.ok;
    } catch (e) {
        return false;
    }
}

export async function initApi() {
    for (const cand of DEFAULT_CANDIDATES) {
        const url = cand();
        if (!url) continue;
        const ok = await testBaseUrl(url);
        if (ok) {
            api.defaults.baseURL = url;
            localStorage.setItem('chatcam_api_url', url);
            return url;
        }
    }

    const saved = localStorage.getItem('chatcam_api_url');
    if (saved) {
        api.defaults.baseURL = saved;
        return saved;
    }

    const fallback = DEFAULT_CANDIDATES[0]() || 'http://localhost:5000/api';
    api.defaults.baseURL = fallback;
    return fallback;
}

// Add auth token to all requests from localStorage
api.interceptors.request.use(async (config) => {
    const token = localStorage.getItem('chatcam_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
