import axios from 'axios';

export const instance = axios.create({
    baseURL: 'https://localhost:7275/api',
});

instance.defaults.headers.common['Authorization'] = window.localStorage.getItem('token');

export default instance;