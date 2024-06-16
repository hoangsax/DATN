import { Button } from "@/components/button";
import { InputForm, InputPassword } from "@/components/input";
import { UIText } from "@/components/text";
import { icons, images, weight } from "@/constants";
import { AppDispatch, RootState } from "@/store";
import { login } from "@/store/auth";
import { useAppDispatch } from "@/store/hooks";
import { horizontalScale, verticalScale } from "@/utils";
import React, { useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";

export const LoginScreen = () => {
    const [email, setEmail] = useState("user1@example.com");
    const [password, setPassword] = useState("password1");
    const colors = useSelector((state: RootState) => state.theme.palette);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch()
    const handleOnPress = () => {
        dispatch(login({email, password}))
    };

    return (
        <View style={styles.container}>
            <View style={styles.imgWrapper}>
                <Image source={images.logo} style={styles.img} />
            </View>
            <View style={styles.contentWrapper}>
                <UIText value="Login" fWeight={weight.semibold} fSize={18} />
                <View style={styles.formGroup}>
                    <UIText
                        value="Username"
                        fWeight={weight.semibold}
                        fSize={14}
                    />
                    <InputForm
                        licon={icons.USER}
                        value={email}
                        placeholder="Username"
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <UIText
                        value="Password"
                        fWeight={weight.semibold}
                        fSize={14}
                    />
                    <InputPassword
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    {auth.loading && (
                        <ActivityIndicator size="large" color="#0000ff" />
                    )}
                    {auth.error && (
                        <UIText value={auth.error} color={colors.ERROR} />
                    )}
                    <Button.Primary
                        title="Login"
                        fill={true}
                        onPress={handleOnPress}
                    />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: horizontalScale(25.5),
        paddingTop: verticalScale(50),
        alignItems: "center",
        gap: verticalScale(50),
    },
    imgWrapper: {
        width: horizontalScale(200),
        height: horizontalScale(124.24),
    },
    img: {
        width: "100%",
        height: "100%",
    },
    contentWrapper: {
        gap: verticalScale(25),
        width: "100%",
        alignItems: "center",
    },
    formGroup: {
        alignItems: "flex-start",
        gap: verticalScale(10),
    },
    buttonGroup: {
        gap: verticalScale(10),
        width: "100%",
        alignItems: "center",
    },
});

export default LoginScreen;
