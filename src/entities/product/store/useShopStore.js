import { create } from 'zustand';
import { shopService } from '@/shared/api/shopApi';

export const useShopStore = create((set, get) => ({
  products: [],
  loading: false,
  error: null,
  
  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const products = await shopService.getAllProducts();
      set({ products, loading: false });
      return products;
    } catch (error) {
      set({ error: error.message, loading: false });
      throw error;
    }
  },
  

  getProductById: (id) => {
    return get().products.find(product => product._id === id);
  },
  

  addProduct: (product) => {
    set((state) => ({
      products: [...state.products, product]
    }));
  },
  

  updateProduct: (id, updatedProduct) => {
    set((state) => ({
      products: state.products.map(product =>
        product._id === id ? { ...product, ...updatedProduct } : product
      )
    }));
  },
  

  removeProduct: (id) => {
    set((state) => ({
      products: state.products.filter(product => product._id !== id)
    }));
  }
}));