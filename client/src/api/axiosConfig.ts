import axios from 'axios';
import { RootState, store } from '../store/store';

const API_URL = 'http://localhost:3000/api';

const AXIOS_INSTANCE = axios.create({
    baseURL: API_URL,
});

AXIOS_INSTANCE.interceptors.request.use(async (config) => {
    const token = (store.getState() as RootState).auth.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
})


export { AXIOS_INSTANCE };
