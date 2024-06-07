import React from "react";
import { View, TextInput, StyleSheet } from "react-native";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { SvgXml } from "react-native-svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "@/store";
interface InputFormProps {
    licon?: any;
    ricon?: any;
    backgroundColor?: string;
    placeholder?: string;
}

export const InputForm = (props: InputFormProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);
    const { licon, ricon, backgroundColor, placeholder } = props;

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
            {licon && <SvgXml xml={licon} height={18} width={18} />}
            <TextInput
                style={[styles.input, { color: colors.TEXT_STD_MAIN }]}
                placeholder={placeholder}
            />
            {ricon && <SvgXml xml={ricon} height={18} width={18} />}
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

export default InputForm;
