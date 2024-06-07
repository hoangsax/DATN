import { createSlice } from "@reduxjs/toolkit";

interface authState {
    isLogin: boolean;
    user: any;
}

const initialState = {
    isLogin: false,
    user: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.isLogin = true;
            state.user = action.payload;
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
        }
    }
})

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;