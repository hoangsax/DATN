import client, {
    GET_RE_INFO,
    GET_REDATA,
    localClient,
    LOGIN_USER,
} from "@/client";
import { Button } from "@/components/button";
import { InputForm, InputPassword } from "@/components/input";
import { UIText } from "@/components/text";
import { icons, images, weight } from "@/constants";
import { AppDispatch, RootState } from "@/store";
import { login } from "@/store/auth";
import { useAppDispatch } from "@/store/hooks";
import { AuthParamList, horizontalScale, verticalScale } from "@/utils";
import { useMutation } from "@apollo/react-hooks";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, StyleSheet, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { useDispatch, useSelector } from "react-redux";

type RegisterNavigationProps = StackNavigationProp<AuthParamList, "Register">;

export const RegisterScreen = () => {
    const navigation = useNavigation<RegisterNavigationProps>()
    const [username, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [password2, setPassword2] = useState<string>("");
    const [inputError, setInputError] = useState<string | null>()
    const colors = useSelector((state: RootState) => state.theme.palette);
    const auth = useSelector((state: RootState) => state.auth);
    const dispatch = useAppDispatch();
    const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
    const handleOnPress = async () => {
        if (username.length == 0) {
            alert("Vui lòng nhập tài khoản");
            return;
        }
        if (password != password2) {
            alert("Mật khẩu không trùng khớp");
            return;
        }
        else {
            if (password.length < 8) {
                alert("Mật khẩu cần có độ dài từ 8 trở lên")
            }
        }
    };

    useEffect(() => {
        if (data) {
            dispatch(login(data.loginUser));
        }
    }, [data]);

    return (
        <View style={styles.container}>
            <View style={styles.imgWrapper}>
                <SvgXml xml={icons.LOGO} style={styles.img} />
            </View>
            <View style={styles.contentWrapper}>
                <View style={styles.formGroup}>
                    <UIText
                        value="Tài khoản"
                        fWeight={weight.semibold}
                        fSize={14}
                    />
                    <InputForm
                        licon={icons.MAIL}
                        value={username}
                        placeholder="Tài khoản"
                        onChangeText={(value) => setEmail(value)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <UIText
                        value="Mật khẩu"
                        fWeight={weight.semibold}
                        fSize={14}
                    />
                    <InputPassword
                        value={password}
                        onChangeText={(value) => setPassword(value)}
                    />
                </View>
                <View style={styles.formGroup}>
                    <UIText
                        value="Nhập lại mật khẩu"
                        fWeight={weight.semibold}
                        fSize={14}
                    />
                    <InputPassword
                        value={password2}
                        onChangeText={(value) => setPassword2(value)}
                    />
                </View>
                <View style={styles.buttonGroup}>
                    {loading && (
                        <ActivityIndicator size="large" color="#0000ff" />
                    )}
                    {auth.error && (
                        <UIText value={auth.error} color={colors.ERROR} />
                    )}
                    <Button.Primary
                        title="Tiếp tục"
                        fill={true}
                        onPress={handleOnPress}
                    />
                </View>
                <View style={styles.or}>
                    <View
                        style={{
                            backgroundColor: colors.BORDER_FORM_MAIN,
                            height: 1,
                            flex: 4,
                        }}
                    ></View>
                    <View
                        style={{
                            height: "auto",
                            flex: 2,
                            alignItems: "center",
                        }}
                    >
                        <UIText value="Hoặc" fWeight={weight.semibold} />
                    </View>
                    <View
                        style={{
                            backgroundColor: colors.BORDER_FORM_MAIN,
                            height: 1,
                            flex: 4,
                        }}
                    ></View>
                </View>
                <View style={styles.otherMethods}>
                    <Button.Login
                        title="Tiếp tục với Google"
                        icon={icons.GOOGLE}
                    />
                    <Button.Login title="Đăng nhập" onPress={() => navigation.navigate("Login")} />
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
    imgWrapper: {},
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
    otherMethods: {
        gap: verticalScale(10),
        width: "100%",
    },
    or: {
        marginVertical: verticalScale(20),
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
});

export default RegisterScreen;
