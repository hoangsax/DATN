import React from "react";
import { fontSize, horizontalScale } from "@/utils";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UIText } from "../text";
import { IconType } from "@/constants";

interface ButtonLoginProps {
    icon?: IconType;
    title: string;
    onPress?: () => void;
}

export const ButtonLogin = (props: ButtonLoginProps) => {
    const { icon, title, onPress } = props;
    const Colors = useSelector((state: RootState) => state.theme.palette);

    return (
        <TouchableOpacity
            style={[
                styles.container,
                {
                    borderColor: Colors.BORDER_FORM_MAIN,
                    backgroundColor: Colors.MAIN,
                },
            ]}
            onPress={onPress}
        >
            <View style={styles.Items}>
                {icon && <SvgXml xml={icon} />}
                <UIText value={title} style={styles.textTitle} />
            </View>
        </TouchableOpacity>
    );
};

export default ButtonLogin;

const styles = StyleSheet.create({
    container: {
        height: horizontalScale(44),
        width: "100%",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 8,
        borderWidth: 1,
        paddingHorizontal: horizontalScale(13),
    },
    Items: {
        flexDirection: "row",
        alignItems: "center",
        gap: horizontalScale(6),
    },
    textTitle: {
        fontSize: fontSize(16),
    },
});
