import { Button, UIText } from "@/components";
import { defStyles, heights, icons } from "@/constants";
import { RootState } from "@/store";
import {
    fontSize,
    HEIGHT_SCREEN,
    horizontalScale,
    ProfileStackParamList,
    verticalScale,
} from "@/utils";
import React from "react";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // or any other icon set
import { BotNav } from "@/navigations";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Header } from "./header";

interface ProfileRowProps {
    label: string;
    value: string;
    iconName: string;
}

const ProfileRow: React.FC<ProfileRowProps> = ({ label, value, iconName }) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    return (
        <View style={styles.row}>
            <Icon
                name={iconName}
                size={25}
                color={Colors.BG_MAIN}
                style={styles.icon}
            />
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: horizontalScale(15),
        paddingTop: verticalScale(10),
        height: HEIGHT_SCREEN - heights.BOTNAV * 2- heights.STATUS_BAR,
    },
    section: {
        backgroundColor: "#f0f0f0",
        paddingVertical: verticalScale(20),
        paddingHorizontal: horizontalScale(10),
        marginVertical: 10,
        borderRadius: 10,
        gap: 20,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
    },
    icon: {
        marginRight: 10,
    },
    label: {
        flex: 1,
        fontWeight: "bold",
        fontSize: fontSize(14),
    },
    value: {
        flex: 1,
        color: "#333",
        textAlign: "right",
        fontSize: fontSize(14),
    },
});

interface InfoProps {
    navigation: (name: string) => void;
}

type InfoScreenNavigationProp = StackNavigationProp<
    ProfileStackParamList,
    "Info"
>;

export const Info = () => {
    const user = useSelector((state: RootState) => state.auth.user);
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const navigation = useNavigation<InfoScreenNavigationProp>();
    return (
        <View
            style={{
                // marginTop: heights.STATUS_BAR,
                height: "100%",
                backgroundColor: Colors.MAIN,
            }}
        >
            <Header title="Thông tin của tôi" />
            <ScrollView style={styles.container}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    <UIText
                        value="Thông tin cá nhân"
                        fWeight={"bold"}
                        fSize={16}
                    />
                </View>
                <View style={[styles.section, defStyles.shadowBox]}>
                    <ProfileRow
                        label="Ngày sinh"
                        value={user ? user.dateOfBirth : "00/00/0000"}
                        iconName="wallet-giftcard"
                    />
                    <ProfileRow
                        label="Giới tính"
                        value={user ? user.gender : ""}
                        iconName="human-male-female"
                    />
                    <ProfileRow
                        label="CMND/CCCD"
                        value={user ? user.cccd.number : ""}
                        iconName="id-card"
                    />
                </View>
                <View>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                        }}
                    >
                        <UIText
                            value="Thông tin liên hệ"
                            fWeight={"bold"}
                            fSize={16}
                        />
                        <TouchableOpacity
                            activeOpacity={1}
                            onPress={() => navigation.navigate("EditContact")}
                        >
                            <UIText
                                value="Sửa thông tin"
                                fSize={14}
                                color={Colors.BG_MAIN}
                                fWeight={"bold"}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.section, defStyles.shadowBox]}>
                        <ProfileRow
                            label="Địa chỉ"
                            value={user ? user.fullAddress : ""}
                            iconName="map-marker-radius-outline"
                        />
                        <ProfileRow
                            label="Email"
                            value={user ? user.gmail : ""}
                            iconName="email-outline"
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};
