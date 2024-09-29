import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoginScreen } from "@/pages/login";
import { screens, stacks } from "@/constants";
import { BotNav } from "@/navigations/bottomNav";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { heights } from "@/constants/heights.const";
import { AuthParamList, HEIGHT_SCREEN, verticalScale } from "@/utils";
import RegisterScreen from "@/pages/login/register";
// import { selectIsLoggedIn } from "@/selector";

const AuthNav = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const theme = useSelector((state: RootState) => state.theme);
    const Stack = createNativeStackNavigator<AuthParamList>();
    const Bheight = heights.STATUS_BAR;
    return (
        <NavigationContainer>
            <View
                style={{
                    height: Bheight + 2,
                    backgroundColor: theme.palette.BG_MAIN,
                }}
            >
                <StatusBar style="auto" />
            </View>
            <View style={{ flex: 1 }}>
                <Stack.Navigator
                    screenOptions={{
                        headerShown: false,
                    }}
                >
                    {auth.isLogin ? (
                        <>
                            <Stack.Screen name={"BotNav"} component={BotNav} />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name={"Login"}
                                component={LoginScreen}
                            />
                            <Stack.Screen
                                name={"Register"}
                                component={RegisterScreen}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};

export default AuthNav;
