import { configureStore } from "@reduxjs/toolkit";
import authReducer from "@/store/auth";
import themeReducer from "@/store/theme";

const store = configureStore({
    reducer: {
        auth: authReducer,
        theme: themeReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ReturnType<typeof store.dispatch>;

export default store;
