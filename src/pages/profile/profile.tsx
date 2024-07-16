// src/screens/SettingsScreen.tsx
import { UIText } from "@/components";
import { Button } from "@/components/button";
import { heights, images } from "@/constants";
import { RootState } from "@/store";
import { logout } from "@/store/auth";
import {
    HEIGHT_SCREEN,
    horizontalScale,
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
} from "react-native";
import {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { useDispatch, useSelector } from "react-redux";

const NOR_TEXT = 16;
const TITLE_TEXT = 25;

export const ProfileScreen = () => {
    const blur = useSharedValue(0);
    const auth = useSelector((state: RootState) => state.auth);
    const [componentHeight, setComponentHeight] = useState(0);
    const [showFixedComponent, setShowFixedComponent] = useState(false);
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const dispatch = useDispatch();
    const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
        const scrollPosition = event.nativeEvent.contentOffset.y;
        setShowFixedComponent(scrollPosition > verticalScale(116)); // Adjust the height threshold as needed
    };

    useEffect(() => {
        blur.value = showFixedComponent
            ? withTiming(1, { duration: 500 })
            : withTiming(0, { duration: 500 });
    }, [showFixedComponent]);
    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setComponentHeight(height);
        console.log(componentHeight);
    };
    return (
        <View style={styles.container}>
            <ScrollView
                onScroll={handleScroll}
                contentContainerStyle={styles.scrollContainer}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.header} onLayout={handleLayout}>
                    <View style={styles.header_top}>
                        <Image source={images.PROFILE} style={styles.logo} />
                        <UIText
                            value={"Placeholder"}
                            fWeight={"bold"}
                            fSize={TITLE_TEXT}
                        />
                        <UIText
                            value={auth.user?.email}
                            fSize={NOR_TEXT}
                            color={Colors.TEXT_STD_SUB}
                        />
                    </View>
                    <View style={styles.header_bottom}>
                        <TouchableOpacity style={styles.bot_button}>
                            <UIText
                                value={"Trang cá nhân"}
                                fSize={NOR_TEXT}
                                fWeight={"bold"}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.bot_button}>
                            <UIText
                                value={"Lịch sử giao dịch"}
                                fSize={NOR_TEXT}
                                fWeight={"bold"}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.content}>
                    <UIText
                        value={"Cài đặt"}
                        fWeight={"bold"}
                        fSize={TITLE_TEXT}
                    />
                    <View style={styles.option_list}>
                        <TouchableHighlight
                            underlayColor={Colors.BG_CARD_MAIN}
                            style={[
                                styles.option_button,
                                {
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                },
                            ]}
                            onPress={() => {}}
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
                            onPress={() => {}}
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
                <View style={styles.content}>
                    <UIText
                        value={"Tiện ích"}
                        fWeight={"bold"}
                        fSize={TITLE_TEXT}
                    />
                    <View style={styles.option_list}>
                        <TouchableHighlight
                            underlayColor={Colors.BG_CARD_MAIN}
                            style={[
                                styles.option_button,
                                {
                                    borderTopLeftRadius: 10,
                                    borderTopRightRadius: 10,
                                },
                            ]}
                            onPress={() => {}}
                        >
                            <UIText
                                value={"Danh sách chờ"}
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
                                value={"Quản lý chi tiêu"}
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
                                value={"PlaceHolder"}
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
                                value={"PlaceHolder"}
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
        paddingHorizontal: horizontalScale(10),
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
        backgroundColor: "green",
        width: "100%",
        marginTop: verticalScale(40),
        borderRadius: 10,
        alignItems: "center",
    },
    header_top: {
        width: "100%",
        alignItems: "center",
    },
    header_bottom: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        gap: horizontalScale(10),
        backgroundColor: "blue",
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
