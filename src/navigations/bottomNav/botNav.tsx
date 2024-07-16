import { icons, screens } from "@/constants";
import { stacks } from "@/constants";
import { heights } from "@/constants/heights.const";
import { HomeScreen, WaitingRelease, Rent, ProfileScreen, MarketPlace } from "@/pages";
import { HEIGHT_SCREEN, verticalScale } from "@/utils";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";
const BotNav = () => {
    const Tab = createBottomTabNavigator();

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
                            xml={focused ? icons.INVEST_ACTIVE : icons.INVEST}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name={screens.RENT}
                component={WaitingRelease}
                options={{
                    tabBarIcon: ({ focused }) => (
                        <SvgXml
                            xml={focused ? icons.RENT_ACTIVE : icons.RENT}
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
                        />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

export default BotNav;
