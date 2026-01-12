import axios from 'axios';

const API_URL = 'https://stroi-dvor-backend.onrender.com/api';


const publicApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

publicApi.interceptors.request.use((config) => {
  delete config.headers.Authorization;
  return config;
});

export const publicService = {
  async getAllProducts() {
    try {
      const response = await publicApi.get('/shop');
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

};