import { PayloadAction, createSlice } from "@reduxjs/toolkit";

import { ICartItem, ICartState } from "src/interfaces/cart";
import { getLocalStorage, setLocalStorage } from "src/utils/helpers";

const cartStorage: ICartItem[] = getLocalStorage('cart') || [];

const initialState: ICartState = {
    items: cartStorage
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action: PayloadAction<ICartItem>) => {
            const payloadItem = action.payload;
            const existingItem = state.items.find(item => item.id === payloadItem.id);
            if (existingItem) {
                existingItem.quantity += payloadItem.quantity;
            } else {
                state.items.push(payloadItem);
            }
            setLocalStorage('cart', state.items);
        },
        increaseQuantity: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity++;
                setLocalStorage('cart', state.items);
            }
        },
        decreaseQuantity: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            if (existingItem) {
                if (existingItem.quantity === 1) {
                    setLocalStorage('cart', state.items);
                    return;
                }

                existingItem.quantity--;
                setLocalStorage('cart', state.items);
            }
        },
        deleteItem: (state, action: PayloadAction<string>) => {
            const id = action.payload;
            state.items = state.items.filter(item => item.id !== id);
            setLocalStorage('cart', state.items);
        }
    }
});

export const { addItem, increaseQuantity, decreaseQuantity, deleteItem } = cartSlice.actions;

export const getTotalPrice = (state: ICartState) => {
    return state.items.reduce((total, cur) => total + cur.price * cur.quantity, 0);
};

export default cartSlice.reducer;