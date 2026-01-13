import { createSlice } from '@reduxjs/toolkit';

const BASE_URL = 'https://stroi-dvor-backend.onrender.com';

export const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        cartItems: []
    },
    reducers: {
        addItemToCart: (state, action) => {
            let product, quantity;
            
            if (action.payload.product) {
                product = action.payload.product;
                quantity = action.payload.quantity || 1;
            } else {
                product = action.payload;
                quantity = 1;
            }
            
            const productId = product._id || product.id;
            
            const existingCartItem = state.cartItems.find(
                (item) => item.productId === productId
            );

            if (existingCartItem) {
                existingCartItem.quantity += quantity;
                existingCartItem.totalPrice = existingCartItem.quantity * existingCartItem.productPrice;
                console.log('Updated existing item:', existingCartItem);
            } else {
                const newItemId = new Date().getTime();
                
                const getImageUrl = (img) => {
                    if (!img) return '/placeholder.jpg';

                    if (img.startsWith('http')) return img;

                    if (product.imageUrl) return product.imageUrl;
        
                    if (img.includes('.')) {
                        return `${BASE_URL}/uploads/${img}`;
                    }
                    
                    return '/placeholder.jpg';
                };
                
                const newCartItem = {
                    id: newItemId,
                    productId: productId,
                    productName: product.name || product.title,
                    productImg: getImageUrl(product.image || product.productImg || product.imageUrl),
                    productPrice: product.price,
                    quantity: quantity,
                    totalPrice: quantity * product.price,
                };
                state.cartItems.push(newCartItem);
            }
        },

        removeItemFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter(
                (cartItem) => cartItem.id !== action.payload.cartItemId
            );
        },

        incrementCartItemQuantity: (state, action) => {
            const { productId, quantity = 1 } = action.payload;
            
            const cartItem = state.cartItems.find(
                (item) => item.productId === productId
            );
            
            if (cartItem) {
                cartItem.quantity += quantity;
                cartItem.totalPrice = cartItem.quantity * cartItem.productPrice;
            }
        },

        decrementCartItemQuantity: (state, action) => {
            const { productId } = action.payload;
    
            const cartItem = state.cartItems.find(
                (item) => item.productId === productId
            );
    
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                cartItem.totalPrice = cartItem.quantity * cartItem.productPrice;
            }
        },

        clearCart: (state) => {
            state.cartItems = [];
        }
    },
});

export const getTotalPrice = state => {
    const total = state.cart.cartItems.reduce((total, cartItem) => {
        return total + (cartItem.totalPrice || 0);
    }, 0);
    return +total.toFixed(2);
};

export const getTotalArticles = state => {
    return state.cart.cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
};

export const getCartItems = state => state.cart.cartItems;

export const { 
    addItemToCart, 
    removeItemFromCart, 
    incrementCartItemQuantity, 
    decrementCartItemQuantity, 
    clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;