import React from "react";
import { icons, screens } from "@/constants";
import { stacks } from "@/constants";
import { heights } from "@/constants/heights.const";
import {
    HomeScreen,
    WaitingRelease,
    Lease,
    ProfileScreen,
    MarketPlace,
} from "@/pages";
import { BottomTabParamList, HEIGHT_SCREEN, verticalScale } from "@/utils";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";
import ProjectStack from "../projectStack";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { FetchDataComponent } from "@/pages/waitingrelease/utils/fetchingData";
import { useState } from "react";

const Tab = createBottomTabNavigator<BottomTabParamList>(); // Use the type for the navigator

const BotNav: React.FC = () => {
    const iconSize = heights.BUTTON_ICON;
    const Colors = useSelector((state: RootState) => state.theme.palette)
    return (
        <>
            <FetchDataComponent />
            <Tab.Navigator
                screenOptions={{
                    headerShown: false,
                    tabBarShowLabel: false,
                    tabBarStyle: {
                        height: heights.BOTNAV,
                        backgroundColor: Colors.MAIN
                    },
                }}
                initialRouteName={'Project'}
            >
                <Tab.Screen
                    name="Home"
                    component={HomeScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <SvgXml
                                xml={focused ? icons.HOME_ACTIVE : icons.HOME}
                                width={iconSize}
                                height={iconSize}
                            />
                        ),
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name="Project"
                    component={WaitingRelease}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <SvgXml
                                xml={
                                    focused
                                        ? icons.PROJECT_ACTIVE
                                        : icons.PROJECT
                                }
                                width={iconSize}
                                height={iconSize}
                            />
                        ),
                    }}
                />
                <Tab.Screen
                    name="Invest"
                    component={MarketPlace}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <SvgXml
                                xml={
                                    focused
                                        ? icons.MARKETPLACE_ACTIVE
                                        : icons.MARKETPLACE
                                }
                                width={iconSize}
                                height={iconSize}
                            />
                        ),
                        unmountOnBlur: true,
                    }}
                />
                <Tab.Screen
                    name="ProfileStack"
                    component={ProfileScreen}
                    options={{
                        tabBarIcon: ({ focused }) => (
                            <SvgXml
                                xml={
                                    focused
                                        ? icons.PROFILE_ACTIVE
                                        : icons.PROFILE
                                }
                                width={iconSize}
                                height={iconSize}
                            />
                        ),
                        unmountOnBlur: true,
                    }}
                />
            </Tab.Navigator>
        </>
    );
};

export default BotNav;
