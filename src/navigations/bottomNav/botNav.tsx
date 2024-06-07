import { icons } from "@/constants";
import { stacks } from "@/constants";
import { HomeScreen } from "@/pages/home";
import ProfileScreen from "@/pages/profile/profile";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SvgXml } from "react-native-svg";
const BotNav = () => {

    const Tab = createBottomTabNavigator()

    return (
        <Tab.Navigator screenOptions={{headerShown: false, tabBarShowLabel: false}}>
            <Tab.Screen name={stacks.HOMESTACK} component={HomeScreen} options={{tabBarIcon: ({focused}) => <SvgXml xml={focused? icons.LOCATION_ACTIVE : icons.LOCATION}/>}} />
            <Tab.Screen name={stacks.PROFILESTACK} component={ProfileScreen} options={{tabBarIcon: ({focused}) => <SvgXml xml={focused? icons.PROFILE_ACTIVE : icons.PROFILE} />}} />
        </Tab.Navigator>
    )
}

export default BotNav;