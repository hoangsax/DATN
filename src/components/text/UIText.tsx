import { RootState } from "@/store";
import { fontSize } from "@/utils";
import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle } from "react-native";
import { useSelector } from "react-redux";

interface UITextProps {
    color?: any;
    fSize?: number;
    fWeight?: any;
    value: React.ReactNode;
    style?: StyleProp<TextStyle>
}

export const UIText = ({ color, fSize, value, fWeight, style }: UITextProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);

    const styles = StyleSheet.create({
        text: {
            color: color ? color : colors.TEXT_STD_TITLE,
            fontSize: fontSize(fSize ? fSize : 14),
            fontWeight: fWeight,
            padding: 0
        },
    });

    return <Text style={[styles.text, style, {width: 'auto'}]}>{value}</Text>;
};
