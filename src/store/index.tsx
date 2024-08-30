import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/auth";
import themeReducer from "@/store/theme";
import dataSlice from "@/store/fetch";
const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        data: dataSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;
