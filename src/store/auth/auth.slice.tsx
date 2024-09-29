import client, { localClient } from "@/client";
import { LOGIN_MUTATION, LOGIN_USER } from "@/client/mutation";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localStorage from "react-native-expo-localstorage";
import { UriProps } from "react-native-svg";
export interface User {
    username: string;
    password: string;
    mnemonic: string;
    walletAddress: string;
    firstName: string;
    lastName: string;
    avatar: string;
    gender: string;
    dateOfBirth: string;
    fullAddress: string;
    gmail: string;
    zipCode: string;
    city: string;
    phoneNumber: string;
    cccd: CCCD;
    role: string;
}
interface CCCD {
    number: string;
    createdDate: string;
    createdLocation: string;
}
interface LoginResponse {
    user: User;
}

interface LoginParams {
    email: string;
    password: string;
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

// const login = createAsyncThunk<LoginResponse, LoginParams, {rejectValue: string}>(
//     "auth/login",
//     async ({email, password}, ThunkAPI) => {
//         try {
//             const response = await localClient.mutate({
//                 mutation: LOGIN_USER,
//                 variables: {
//                     email,
//                     password
//                 }
//             });

//             if (response.data?.loginUser) {
//                 return response.data.loginUser;
//             } else {
//                 return ThunkAPI.rejectWithValue("Login failed");
//             }
//         } catch (error) {
//             const e = error as ErrorMsg;
//             return ThunkAPI.rejectWithValue(e.message);
//         }
//     }
// );

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (
            state,
            action: PayloadAction<User>
        ) => {
            state.user = action.payload;
            state.isLogin = true;
        },
        logout: (state) => {
            state.isLogin = false;
            state.user = null;
        },
    },
    // extraReducers: (builder) => {
    //     builder
    //         .addCase(login.pending, (state) => {
    //             state.loading = true;
    //             state.error = null;
    //         })
    //         .addCase(
    //             login.fulfilled,
    //             (state, action: PayloadAction<LoginResponse>) => {
    //                 state.loading = false;
    //                 state.user = action.payload.user
    //                 state.isLogin = state.user !== null && state.token !== null;
    //             }
    //         )
    //         .addCase(login.rejected, (state, action) => {
    //             state.loading = false;
    //             state.error = action.payload as string;
    //         });
    // },
});

export const { logout, login } = authSlice.actions;
// export { login };
export default authSlice.reducer;
