import { configureStore } from '@reduxjs/toolkit';

import cartSlice from './cart/cartSlice';
import authSlice from './auth/authSlice';

export const store = configureStore({
    reducer: {
        cart: cartSlice,
        auth: authSlice
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;