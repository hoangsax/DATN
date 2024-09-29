import { Button, UIText } from "@/components";
import { heights, icons } from "@/constants";
import { spaces } from "@/constants/space.const";
import { RootState } from "@/store";
import { horizontalScale, ProfileStackParamList, verticalScale } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useState } from "react";
import { View, StyleSheet, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import { Card, Menu, RadioButton, TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import { Header } from "./header";
import ModalSelector from "react-native-modal-selector";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
type EditContactScreenNavigationProp = StackNavigationProp<
    ProfileStackParamList,
    "EditContact"
>;

const ContactInfo = () => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const user = useSelector((state: RootState) => state.auth.user);
    const navigation = useNavigation<EditContactScreenNavigationProp>();
    const [address, setAddress] = useState(user ? user.fullAddress : "");
    const [email, setEmail] = useState(user ? user.gmail : "");
    const [dateOfBirth, setDateOfBirth] = useState(
        user ? user.dateOfBirth : ""
    );
    const [gender, setGender] = useState(user ? user.gender : "");
    const [cccd, setCCCD] = useState(user ? user.cccd.number : "");
    const data = [
        { key: 1, label: "Male" },
        { key: 2, label: "Female" },
    ];
    // Handle Date of Birth Text Change with formatting
    const handleDateChange = (value: any) => {
        // Remove any non-numeric characters
        let cleanedValue = value.replace(/[^0-9]/g, "");

        // Insert slashes at the appropriate places (DD/MM/YYYY)
        if (cleanedValue.length >= 5) {
            cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(
                2,
                4
            )}/${cleanedValue.slice(4, 8)}`;
        } else if (cleanedValue.length >= 3) {
            cleanedValue = `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(
                2,
                4
            )}`;
        }

        setDateOfBirth(cleanedValue);
    };
    return (
        <View
            style={{
                // marginTop: heights.STATUS_BAR,
                height: "100%",
                backgroundColor: Colors.MAIN,
            }}
        >
            <Header title="Sửa thông tin" />
            <KeyboardAwareScrollView
            extraScrollHeight={10}
        >
            <ScrollView >
                <Text style={styles.header}>Thông tin cá nhân</Text>
                <Card style={styles.card}>
                    <TextInput
                        label="Ngày sinh"
                        value={dateOfBirth}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="DD/MM/YYYY"
                        onChangeText={handleDateChange}
                        maxLength={10} // Limit input to 10 characters
                    />

                    <TextInput
                        label="CCCD ()"
                        value={cccd}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="numeric"
                        onChangeText={(value) => setCCCD(value)}
                    />

                    {/* Gender selection menu */}
                    <ModalSelector
                        data={data}
                        initValue="Select Gender"
                        onChange={(option) => setGender(option.label)}
                    >
                        <TextInput
                            label={"Giới tính"}
                            mode="outlined"
                            style={styles.input}
                            editable={false}
                            placeholder="Select Gender"
                            value={gender}
                        />
                    </ModalSelector>
                </Card>
                <Text style={styles.header}>Thông tin liên hệ</Text>
                <Card style={styles.card}>
                    <TextInput
                        label={`Địa chỉ (${address.length}/256)`}
                        value={address}
                        mode="outlined"
                        style={styles.input}
                        onChangeText={(value) => setAddress(value)}
                    />
                    <TextInput
                        label={`Email (${email.length}/256)`}
                        value={email}
                        mode="outlined"
                        style={styles.input}
                        keyboardType="email-address"
                        onChangeText={(value) => setEmail(value)}
                    />
                </Card>
                <Button.Primary
                    title="Cập nhật"
                    fill={true}
                    style={{ paddingHorizontal: spaces.globalPadding, paddingBottom: verticalScale(15) }}
                />
            </ScrollView>
            </KeyboardAwareScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    card: {
        padding: spaces.globalPadding,
        margin: spaces.globalPadding,
        borderRadius: 8,
    },
    header: {
        paddingHorizontal: spaces.globalPadding,
        paddingTop: spaces.globalPadding,
        fontSize: 18,
        fontWeight: "bold",
    },
    input: {
        marginBottom: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 10,
    },
    dropdown: {
        height: 50,
        width: "100%",
    },
});

export default ContactInfo;
