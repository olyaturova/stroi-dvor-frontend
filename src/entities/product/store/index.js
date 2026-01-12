import { configureStore } from '@reduxjs/toolkit';
import productsReducer from '@/entities/products-details-tab/lib/products-slice';
import cartReducer from '@/entities/cart/lib/cart-slice';

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer
  },
});