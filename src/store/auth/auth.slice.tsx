import client from "@/client";
import { LOGIN_MUTATION } from "@/client/mutation";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localStorage from 'react-native-expo-localstorage'
interface User {
    id: string;
    email: string;
    name: string;
}

interface LoginResponse {
    token: string,
    user: User
}

interface authState {
    isLogin: boolean;
    user: User | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

interface ErrorMsg {
    message: string;
}

const initialState: authState = {
    isLogin: false,
    user: null,
    token: null,
    loading: false,
    error: null,
};

const login = createAsyncThunk(
    "auth/login",
    async (
        { email, password }: { email: string; password: string },
        { rejectWithValue }
    ) => {
        try {
            const response = await client.mutate({
                mutation: LOGIN_MUTATION,
                variables: {
                    email,
                    password,
                },
            });

            if (response.data?.login) {
                // LOGIN_MUTATION's response:
                // data {
                //     login {
                //         token,
                //         user {
                //             id,
                //             email,
                //             name,
                //         }
                //     } 
                // }
                return response.data.login;
            } else {
                return rejectWithValue("Login failed");
            }
        } catch (error) {
            const e = error as ErrorMsg;
            return rejectWithValue(e.message);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(
                login.fulfilled,
                (state, action: PayloadAction<LoginResponse>) => {
                    state.loading = false;
                    state.user = action.payload.user
                    state.token = action.payload.token
                    localStorage.setItem("token", action.payload.token)
                    state.isLogin = state.user !== null && state.token !== null;
                }
            )
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export { login };
export default authSlice.reducer;
