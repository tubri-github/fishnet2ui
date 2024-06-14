// src/api/api.js
import axios from 'axios';

const apiClient = axios.create({
    baseURL:process.env.VUE_APP_API_BASE_URL, // FastAPI 服务的地址
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

    getTaxas(params) {
        return apiClient.get('/taxa/', { params });
    },

    getLocaton(params) {
        return apiClient.get('/locations/', { params });
    },

    getProviders(params) {
        return apiClient.get('/providers/', { params });
    },
};
