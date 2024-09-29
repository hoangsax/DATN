// src/screens/SettingsScreen.tsx
import { UIText } from "@/components";
import { Button } from "@/components/button";
import { defStyles, heights, images } from "@/constants";
import { RootState } from "@/store";
import { logout } from "@/store/auth";
import {
    HEIGHT_SCREEN,
    horizontalScale,
    ProfileStackParamList,
    verticalScale,
    WIDTH_SCREEN,
} from "@/utils";
import React, { useEffect, useState } from "react";
import Animated from "react-native-reanimated";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    NativeScrollEvent,
    NativeSyntheticEvent,
    LayoutChangeEvent,
    TouchableHighlight,
    Modal,
    StatusBar,
    ImageBackground,
} from "react-native";
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";
import { Info } from "./info";
import ContactInfoScreen from "./editcontact";
import { spaces } from "@/constants/space.const";
import {
    createStackNavigator,
    StackNavigationProp,
} from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import ContactInfo from "./editcontact";
import SecuritySettingsScreen from "./SecuritySettingsScreen";
import PasswordSettingsScreen from "./PasswordSettingsScreen";

const NOR_TEXT = 16;
const TITLE_TEXT = 20;

const Stack = createStackNavigator<ProfileStackParamList>();

export const ProfileScreen: React.FC = () => {
    return (
        <Stack.Navigator
            initialRouteName="ProfileBotNav"
            screenOptions={{ headerShown: false }}
        >
            <Stack.Screen name="ProfileBotNav" component={ProfileBotNav} />
            <Stack.Screen name="Info" component={Info} />

            {
                //subcomponents
            }
            <Stack.Screen name="EditContact" component={ContactInfo} />
            <Stack.Screen
                name="SecuritySettings"
                component={SecuritySettingsScreen}
            />
            <Stack.Screen
                name="PasswordSettings"
                component={PasswordSettingsScreen}
            />
        </Stack.Navigator>
    );
};

interface ProfileBotNavProps {
    navigation: (tab: number) => void;
}

type ProfileBotNavNavigationProp = StackNavigationProp<
    ProfileStackParamList,
    "ProfileBotNav"
>;

const ProfileBotNav = () => {
    const blur = useSharedValue(0);
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation<ProfileBotNavNavigationProp>();
    const [componentHeight, setComponentHeight] = useState(0);
    const [showFixedComponent, setShowFixedComponent] = useState(0);
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const dispatch = useDispatch();
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        setShowFixedComponent(scrollPosition - verticalScale(116)); // Adjust the height threshold as needed
    };

    useEffect(() => {
        blur.value =
            showFixedComponent > 0
                ? withTiming(showFixedComponent, { duration: 1000 })
                : withTiming(0, { duration: 0 });
    }, [showFixedComponent]);
    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setComponentHeight(height);
    };
    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={handleScroll}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <ImageBackground
                    resizeMode="cover"
                    source={images.DEFIMG}
                    style={[styles.header, defStyles.shadowBox]}
                    onLayout={handleLayout}
                >
                    <View style={styles.header_top}>
                        <Image
                            source={user ? { uri: user.avatar } : images.LOGO}
                            style={[
                                styles.logo,
                                { backgroundColor: Colors.MAIN },
                            ]}
                        />
                        <UIText
                            value={
                                user
                                    ? user.lastName + " " + user.firstName
                                    : "Lỗi đăng nhập"
                            }
                            fWeight={"bold"}
                            fSize={TITLE_TEXT}
                            color={Colors.BG_MAIN}
                        />
                        <UIText
                            value={user?.phoneNumber}
                            fSize={NOR_TEXT}
                            color={Colors.TEXT_STD_SUB}
                        />
                    </View>
                    <View
                        style={[
                            styles.header_bottom,
                            { backgroundColor: Colors.BG_MAIN },
                        ]}
                    >
                        <TouchableOpacity
                            style={styles.bot_button}
                            onPress={() => navigation.navigate("Info")}
                        >
                            <UIText
                                value={"Thông tin cá nhân"}
                                fSize={NOR_TEXT}
                                fWeight={"bold"}
                            />
                        </TouchableOpacity>
                        <View style={{height: '80%', width: 1, backgroundColor: Colors.BG_FORM}} />
                        <TouchableOpacity style={styles.bot_button}>
                            <UIText
                                value={"Lịch sử giao dịch"}
                                fSize={NOR_TEXT}
                                fWeight={"bold"}
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <View style={styles.content}>
                    <UIText
                        value={"Cài đặt"}
                        fWeight={"bold"}
                        fSize={TITLE_TEXT}
                    />
                    <View style={[styles.option_list, defStyles.shadowBox]}>
                        <TouchableHighlight
                            underlayColor={Colors.BG_CARD_MAIN}
                            style={[
                                styles.option_button,
                                {
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                },
                            ]}
                            onPress={() => navigation.navigate("SecuritySettings")}
                        >
                            <UIText
                                value={"Quản lý tài khoản"}
                                fSize={NOR_TEXT}
                                fWeight={"bold"}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={Colors.BG_CARD_MAIN}
                            style={styles.option_button}
                            onPress={() => {}}
                        >
                            <UIText
                                value={"Cài đặt thanh toán"}
                                fSize={NOR_TEXT}
                                fWeight={"bold"}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={Colors.BG_CARD_MAIN}
                            style={styles.option_button}
                            onPress={() => navigation.navigate('SecuritySettings')}
                        >
                            <UIText
                                value={"Đăng nhập và bảo mật"}
                                fSize={NOR_TEXT}
                                fWeight={"bold"}
                            />
                        </TouchableHighlight>
                        <TouchableHighlight
                            underlayColor={Colors.BG_CARD_MAIN}
                            style={[
                                styles.option_button,
                                {
                                    borderBottomLeftRadius: 10,
                                    borderBottomRightRadius: 10,
                                },
                            ]}
                            onPress={() => {}}
                        >
                            <UIText
                                value={"Cài đặt thông báo"}
                                fSize={NOR_TEXT}
                                fWeight={"bold"}
                            />
                        </TouchableHighlight>
                    </View>
                </View>

                <Button.Primary
                    fill={true}
                    title="Logout"
                    onPress={() => dispatch(logout())}
                /> 
            </ScrollView>

            <Animated.View
                style={{
                    opacity: blur,
                    height: 100,
                    width: WIDTH_SCREEN,
                    backgroundColor: "black",
                    position: "absolute",
                }}
            ></Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: spaces.globalPadding,
        height:
            HEIGHT_SCREEN -
            heights.BOTNAV -
            heights.STATUS_BAR -
            verticalScale(40),
    },
    scrollContainer: {
        gap: verticalScale(40),
    },
    text: {
        fontSize: 24,
    },
    header: {
        width: "100%",
        marginTop: verticalScale(40),
        borderRadius: 10,
        alignItems: "center",
    },
    header_top: {
        width: "100%",
        alignItems: "center",
        paddingBottom: verticalScale(5),
    },
    header_bottom: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        borderEndStartRadius: 10,
        borderEndEndRadius: 10,
    },
    bot_button: {
        padding: 15,
        alignItems: "center",
    },
    logo: {
        width: 100,
        height: 100,
        borderRadius: 99,
        borderWidth: 0.5,
        borderColor: "red",
        marginTop: -30,
    },
    content: {
        gap: verticalScale(20),
    },
    option_list: {
        backgroundColor: "white",
        borderRadius: 10,
    },
    option_button: {
        paddingHorizontal: 15,
        paddingVertical: 20,
    },
});

export default ProfileScreen;
