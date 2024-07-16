import client, { GET_REDATA } from "@/client";
import { LOGIN_MUTATION } from "@/client/mutation";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import localStorage from "react-native-expo-localstorage";

interface ErrorMsg {
    message: string;
}

interface securityTokensProps {
    supplyTotal: number;
    tokenInfo: {
        tokenId: number;
        tokenName: string;
    };
}

interface ReDataState {
    securityTokens: securityTokensProps[];
    error: string | null;
}

const initialState: ReDataState = {
    securityTokens: [],
    error: null,
};
const fetchReData = createAsyncThunk<
    securityTokensProps[],
    void,
    { rejectValue: string }
>("data/fetchReData", async (_, ThunkApi) => {
    try {
        const response = await client.query({
            query: GET_REDATA,
        });

        if (response.data?.securityTokens) {
            return response.data.securityTokens;
        } else {
            return ThunkApi.rejectWithValue("Login failed");
        }
    } catch (error) {
        const e = error as ErrorMsg;
        return ThunkApi.rejectWithValue(e.message);
    }
});

const dataSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        removeData: (state) => {
            state.securityTokens = [];
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReData.pending, (state) => {
                state.error = null;
            })
            .addCase(
                fetchReData.fulfilled,
                (state, action: PayloadAction<securityTokensProps[]>) => {
                    state.securityTokens = action.payload;
                }
            )
            .addCase(fetchReData.rejected, (state, action) => {
                state.securityTokens = [];
                state.error = action.payload as string;
            });
    },
});

// export const { logout, logtemp } = authSlice.actions;
export { fetchReData };
export default dataSlice.reducer;
