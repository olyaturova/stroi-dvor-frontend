import axios from 'axios';

const BASE_URL = 'https://stroi-dvor-backend.onrender.com';
const API_URL = `${BASE_URL}/api`;

const api = axios.create({
    baseURL: API_URL,
    timeout: 10000,
});

export const shopService = {
    async getAllProducts() {
        try {
            const response = await api.get('/shop');
            return response.data;
        } catch (error) {
            console.error('Error fetching products:', error);
            throw error;
        }
    },

    async getProductById(id) {
        try {
            const response = await api.get(`/shop/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching product:', error);
            throw error;
        }
    },

    async createProduct(productData) {
        try {
            const formData = new FormData();
   
            if (productData.image) {
                formData.append('image', productData.image);
            }
     
            Object.keys(productData).forEach(key => {
                if (key !== 'image') {
                    formData.append(key, productData[key]);
                }
            });

            const response = await api.post('/shop', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            return response.data;
        } catch (error) {
            console.error('Error creating product:', error);
            throw error;
        }
    },

    async updateProduct(id, productData) {
        try {
            const formData = new FormData();
            
            if (productData.image) {
                formData.append('image', productData.image);
            }
            
            Object.keys(productData).forEach(key => {
                if (key !== 'image') {
                    formData.append(key, productData[key]);
                }
            });

            const response = await api.put(`/shop/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            
            return response.data;
        } catch (error) {
            console.error('Error updating product:', error);
            throw error;
        }
    },

    async deleteProduct(id) {
        try {
            const response = await api.delete(`/shop/${id}`);
            return response.data;
        } catch (error) {
            console.error('Error deleting product:', error);
            throw error;
        }
    }
};