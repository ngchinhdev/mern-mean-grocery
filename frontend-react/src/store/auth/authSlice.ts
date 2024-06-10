import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthFormType } from "src/constants/constants";
import { IAuthState, IUser } from "src/interfaces/auth";

const initialState: IAuthState = {
    currentFormActive: AuthFormType.LOGIN,
    user: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentFormActive: (state, action: PayloadAction<AuthFormType>) => {
            state.currentFormActive = action.payload;
        },
        setUserLogged: (state, action: PayloadAction<IUser>) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { setCurrentFormActive, setUserLogged, logout } = authSlice.actions;

export default authSlice.reducer;