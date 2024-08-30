import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { screens, stacks } from "@/constants";
import { View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { heights } from "@/constants/heights.const";
import { HEIGHT_SCREEN, verticalScale } from "@/utils";
import { WaitingRelease, REinfo_modal } from "@/pages";
// import { selectIsLoggedIn } from "@/selector";

export type ProjectStackProps = {
    Project: undefined;
    ReInfo: { data: any };
};

const Stack = createNativeStackNavigator<ProjectStackProps>();

const ProjectStack = () => {
    const auth = useSelector((state: RootState) => state.auth);
    const theme = useSelector((state: RootState) => state.theme);
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
                    <Stack.Screen
                        name="Project"
                        component={WaitingRelease}
                    />
                    <Stack.Screen
                        name="ReInfo"
                        component={REinfo_modal}
                    />
                </Stack.Navigator>
            </View>
        </NavigationContainer>
    );
};

export default ProjectStack;
