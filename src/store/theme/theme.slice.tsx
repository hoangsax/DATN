import { createSlice } from "@reduxjs/toolkit";
import { ThemeTypes, DarkTheme, LightTheme } from "@/constants/colors.const";

interface ThemeState {
    theme: "light" | "dark";
    palette: ThemeTypes;
}

const initialState: ThemeState = {
    theme: "light",
    palette: LightTheme,
};

const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === "light" ? "dark" : "light";
            state.palette = state.theme === "light" ? LightTheme : DarkTheme;
        },
    },
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
