import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { AuthFormType } from "src/constants/constants";
import { IAuthState } from "src/interfaces/auth";

const initialState: IAuthState = {
    currentFormActive: AuthFormType.LOGIN
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setCurrentFormActive: (state, action: PayloadAction<AuthFormType>) => {
            state.currentFormActive = action.payload;
        }
    }
});

export const { setCurrentFormActive } = authSlice.actions;

export default authSlice.reducer;