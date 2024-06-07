// src/screens/SettingsScreen.tsx
import { ReCard } from "@/components/card/ReCard";
import { SearchBar, InputForm } from "@/components/input";
import { Tab } from "@/components/tab";
import { icons } from "@/constants";
import { RootState } from "@/store";
import { login } from "@/store/auth/auth.slice";
import { toggleTheme } from "@/store/theme";
import { horizontalScale } from "@/utils";
import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";

const LoginScreen = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const colors = useSelector((state: RootState) => state.theme.palette);
    const dispatch = useDispatch();

    return (
        <View style={[styles.container, { backgroundColor: colors.MAIN }]}>
            <Text style={styles.text}>Login Screen</Text>
            <Button title="Login" onPress={() => dispatch(login("user1"))} />

            <InputForm licon={icons.STAR} />
            <View style={{ padding: 20 }} />
            <SearchBar />
            <View style={{ padding: 20 }} />
            <View style={{ flexDirection: "row" }}>
                <Tab title="Recommended" active={true} onPress={() => dispatch(login("user1"))} />
                <Tab title="Top Rates" active={false} onPress={() => dispatch(toggleTheme())} />
            </View>
            <View style={{ padding: 20 }} />
            <ReCard  />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: horizontalScale(25.5),
    },
    text: {
        fontSize: 24,
    },
});

export default LoginScreen;
