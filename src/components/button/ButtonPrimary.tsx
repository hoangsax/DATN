import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { defStyles } from "@/constants";
////////////////////////////////
// Create another Button with 'backgroundColor' props
////////////////////////////////
interface ButtonProps {
    title: string;
    color?: string;
    fill?: boolean;
    onPress?: () => void;
}

const ButtonPrimary = (props: ButtonProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);

    const { title, color, fill, onPress } = props;

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            width: "auto",
        },
        button: {
            flex: fill ? 1 : undefined,
            backgroundColor: colors.BG_BT_MAIN,
            paddingVertical: verticalScale(12),
            paddingHorizontal: horizontalScale(20),
            borderRadius: 8,
            alignItems: "center",
            height: "auto",
        },
        text: {
            color: color ? color : colors.TEXT_BT_MAIN,
            fontSize: fontSize(18),
            fontWeight: "bold",
            paddingHorizontal: horizontalScale(10),
        },
    });

    return (
        <View style={[styles.container, defStyles.shadowBox]}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    );
};

export default ButtonPrimary;
