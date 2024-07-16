import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
interface InputFormProps {
    licon?: any;
    value?: string;
    backgroundColor?: string;
    placeholder?: string;
    maxLength?: number;
    onChangeText?: (text: string) => void;
}

export const InputForm = (props: InputFormProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);
    const { licon, value, backgroundColor, placeholder, maxLength, onChangeText } = props;

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
            {licon && <SvgXml xml={licon} height={horizontalScale(18)} width={horizontalScale(18)} />}
            <TextInput
                style={[styles.input, { color: colors.TEXT_STD_MAIN }]}
                value={value}
                placeholder={placeholder}
                placeholderTextColor={colors.TEXT_STD_SUB}
                maxLength={maxLength}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingVertical: verticalScale(10),
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
    },
    icon: {
        flex: 1,
    },
});

export default InputForm;
