import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { LoginScreen } from "@/pages/login";
import { screens } from "@/constants/screen.const";
import { HomeScreen } from "@/pages/home";
import { BotNav } from "@/navigations/bottomNav";

const AuthNav = () => {

    const auth = useSelector((state: RootState) => state.auth)
    const Stack = createNativeStackNavigator();

    console.log(auth.isLogin)

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {auth.isLogin ?
                    (<Stack.Screen name={screens.HOME} component={BotNav} />) :
                    (<Stack.Screen name={screens.LOGIN} component={LoginScreen} />)
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AuthNav;