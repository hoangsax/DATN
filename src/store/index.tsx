import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/auth";
import themeReducer from "@/store/theme";
import redataReducer from "./redata";
const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
        redata: redataReducer
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch

export default store;
