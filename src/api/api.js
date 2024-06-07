// src/api/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:8000', // FastAPI 服务的地址
    withCredentials: false, // 如果需要处理跨域请求则设为 true
    headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
    }
});

export default {
    getOccurrences(params) {
        return apiClient.get('/occurrence/', { params });
    },
    // 可以在这里添加更多 API 调用方法
};
