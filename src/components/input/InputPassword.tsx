import React, { useState } from "react";
import { View, TextInput, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from "react-native";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
import { icons } from "@/constants";
interface InputPasswordProps {
    value?: string;
    backgroundColor?: string;
    maxLength?: number;
    onChangeText?: (value: string) => void;
}

export const InputPassword = (props: InputPasswordProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);
    const { value, backgroundColor, maxLength, onChangeText } = props;
    const [hidden, setHidden] = useState(true);
    return (
        <View
            style={[
                styles.container,
                {
                    backgroundColor: backgroundColor,
                    borderColor: colors.BORDER_FORM_MAIN,
                },
            ]}
        >
            <SvgXml xml={icons.PASSWORD} height={18} width={18} />
            <TextInput
                style={[styles.input, { color: colors.TEXT_STD_MAIN }]}
                value={value}
                placeholder={"Password"}
                placeholderTextColor={colors.TEXT_STD_SUB}
                secureTextEntry={hidden}
                onChangeText={onChangeText}
                maxLength={maxLength? maxLength : 12}
            />
            <TouchableOpacity onPress={() => setHidden((prev) => !prev)}>
                <SvgXml xml={icons.HIDE} height={18} width={18} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 51,
        paddingVertical: verticalScale(15),
        paddingHorizontal: verticalScale(20),
        borderWidth: 1,
        borderRadius: 10,
        alignItems: "center",
        justifyContent: "center",
        gap: horizontalScale(12),
    },
    input: {
        flex: 8,
        fontSize: fontSize(14.33),
        height: verticalScale(51),
    },
    icon: {
        flex: 1,
    },
});

export default InputPassword;
