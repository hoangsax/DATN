import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Switch,
    ScrollView,
    TouchableHighlight,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { StackNavigationProp } from "@react-navigation/stack";
import { Header } from "./header";
import { UIText } from "@/components";
import { spaces } from "@/constants/space.const";
import { HEIGHT_SCREEN, verticalScale } from "@/utils";
import { heights } from "@/constants";

type SettingsStackParamList = {
    PasswordSettings: undefined;
};

type SecuritySettingsScreenNavigationProp = StackNavigationProp<
    SettingsStackParamList,
    "PasswordSettings"
>;

const SecuritySettingsScreen: React.FC = () => {
    const navigation = useNavigation<SecuritySettingsScreenNavigationProp>();
    const [biometricsEnabled, setBiometricsEnabled] = useState(true);
    const [stayLoggedIn, setStayLoggedIn] = useState(true);
    return (
        <>
            <Header title="Quản lý tài khoản" />

            <ScrollView style={styles.container}>
                <View style={{ gap: verticalScale(10) }}>
                    <View style={{paddingTop: verticalScale(10)}}>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingBottom: verticalScale(10),
                                paddingHorizontal: spaces.globalPadding
                            }}
                        >
                            <UIText
                                value="Thông tin cá nhân"
                                fWeight={"bold"}
                                fSize={16}
                            />
                        </View>

                        <TouchableHighlight
                            onPress={() =>
                                navigation.navigate("PasswordSettings")
                            }
                        >
                            <View style={styles.settingItem}>
                                <Text style={styles.settingText}>Mật khẩu</Text>
                                <Icon
                                    name="chevron-right"
                                    size={20}
                                    color="black"
                                />
                            </View>
                        </TouchableHighlight>

                    <View style={styles.settingItem}>
                        <Text style={styles.settingText}>Sinh trắc học</Text>
                        <Switch
                            trackColor={{ false: "#767577", true: "#81b0ff" }}
                            thumbColor={
                                biometricsEnabled ? "#f5dd4b" : "#f4f3f4"
                            }
                            onValueChange={() =>
                                setBiometricsEnabled(
                                    (previousState) => !previousState
                                )
                            }
                            value={biometricsEnabled}
                        />
                    </View>

                    </View>
                    <View>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-between",
                                paddingBottom: verticalScale(10),
                                paddingHorizontal: spaces.globalPadding
                            }}
                        >
                            <UIText
                                value="Thông tin cá nhân"
                                fWeight={"bold"}
                                fSize={16}
                            />
                        </View>

                        <View style={styles.settingItem}>
                            <Text style={styles.settingText}>
                                Đăng nhập không cần mật khẩu
                            </Text>
                            <Switch
                                trackColor={{
                                    false: "#767577",
                                    true: "#81b0ff",
                                }}
                                thumbColor={
                                    stayLoggedIn ? "#f5dd4b" : "#f4f3f4"
                                }
                                onValueChange={() =>
                                    setStayLoggedIn(
                                        (previousState) => !previousState
                                    )
                                }
                                value={stayLoggedIn}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.settingItem}
                            onPress={() => {}}
                        >
                            <Text style={styles.settingText}>
                                Tự động khóa ứng dụng
                            </Text>
                            <Icon
                                name="chevron-right"
                                size={20}
                                color="black"
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: HEIGHT_SCREEN - heights.BOTNAV - 0.5,
    },
    section: {
        backgroundColor: "#ff80ab",
        padding: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#fff",
    },
    settingItem: {
        backgroundColor: "#fff",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: verticalScale(10),
        paddingHorizontal: spaces.globalPadding,
        
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
    },
    settingText: {
        fontSize: 16,
    },
});

export default SecuritySettingsScreen;
