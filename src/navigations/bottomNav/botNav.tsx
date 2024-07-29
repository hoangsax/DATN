import { icons, screens } from "@/constants";
import { stacks } from "@/constants";
import { heights } from "@/constants/heights.const";
import { HomeScreen, WaitingRelease, Lease, ProfileScreen, MarketPlace } from "@/pages";
import { HEIGHT_SCREEN, verticalScale } from "@/utils";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";
const BotNav = () => {
    const Tab = createBottomTabNavigator();
    const iconSize = heights.BUTTON_ICON
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarStyle: {
                    height: heights.BOTNAV
                },
            }}
            initialRouteName={screens.PROJECT}
        >
            <Tab.Screen
                name={screens.HOME}
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml
                            xml={focused ? icons.HOME_ACTIVE : icons.HOME}
                            width={iconSize}
                            height={iconSize}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={screens.PROJECT}
                component={WaitingRelease}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml
                            xml={focused ? icons.PROJECT_ACTIVE : icons.PROJECT}
                            width={iconSize}
                            height={iconSize}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name={screens.INVEST}
                component={MarketPlace}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml
                            xml={focused ? icons.MARKETPLACE_ACTIVE : icons.MARKETPLACE}
                            width={iconSize}
                            height={iconSize}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name={screens.LEASE}
                component={Lease}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml
                            xml={focused ? icons.LEASE_ACTIVE : icons.LEASE}
                            width={iconSize}
                            height={iconSize}
                        />
                    ),
                }}
            />
            <Tab.Screen
                name={stacks.PROFILESTACK}
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml
                            xml={focused ? icons.PROFILE_ACTIVE : icons.PROFILE}
                            width={iconSize}
                            height={iconSize}
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BotNav;
