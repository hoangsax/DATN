import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoginScreen } from "@/pages/login";
import { screens } from "@/constants";
import { BotNav } from "@/navigations/bottomNav";
import { View } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { StatusBar } from "expo-status-bar";
// import { selectIsLoggedIn } from "@/selector";

const AuthNav = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const theme = useSelector((state: RootState) => state.theme);
    const Stack = createNativeStackNavigator();
    const Bheight = getStatusBarHeight();

    return (
        <NavigationContainer>
            <View
                style={{ height: Bheight, backgroundColor: theme.palette.MAIN }}
            >
                <StatusBar style="auto" />
            </View>
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    contentStyle: { backgroundColor: 'transparent' },
                }}
            >
                {auth.isLogin ? (
                    <Stack.Screen name={screens.HOME} component={BotNav} />
                ) : (
                    <Stack.Screen
                        name={screens.LOGIN}
                        component={LoginScreen}
                    />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNav;
