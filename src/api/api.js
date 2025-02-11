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
async function getJwtToken() {
    try {
        const response = await axios.get(process.env.VUE_APP_API_BASE_URL + '/clients');
        return response.data.token; // 假设返回的是 { token: 'jwt-token-value' }
    } catch (error) {
        console.error('Error fetching JWT:', error);
        return null;
    }
}
apiClient.interceptors.request.use(async (config) => {
    const token = await getJwtToken();
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

const errorCodes = ['Invalid APIKey', 'Polygon is not validly formatted WKT', 'A database error occurred.']; // 示例错误代码

const handleResponse = async (response) => {
    if (typeof response.data === 'string' && errorCodes.includes(response.data)) {
        throw new Error(response.data);
    }
    // console.log(response)
    return response;
};

export default {
    async getOccurrences(params) {
        const response =  await apiClient.get('/occurrence/', { params });
        return handleResponse(response);
    },

    async getTaxas(params) {
        const response = await apiClient.get('/taxa/', { params });
        return handleResponse(response);
    },

    async getLocaton(params) {
        const response = await apiClient.get('/locations/', { params });
        return handleResponse(response);
    },

    async getProviders(params) {
        const response = await apiClient.get('/providers/', { params });
        return handleResponse(response);
    },
    async getProvidersList() {
        const response = await apiClient.get('/providerlist/');
        return handleResponse(response);
    },
};
