import { defStyles } from "@/constants";
import { RootState } from "@/store";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

interface TabProps {
    title: string;
    active: boolean;
    onPress?: () => void;
}

export const Tab = ({ title, active, onPress }: TabProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                defStyles.shadowBox,
                {
                    backgroundColor: active
                        ? colors.BG_TAB_ON
                        : colors.BG_TAB_OFF,
                },
            ]}
        >
            <Text style={[styles.text, {color: active? colors.TEXT_TAB_ON : colors.TEXT_TAB_OFF}]}>{title}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: horizontalScale(16),
        paddingVertical: verticalScale(10),
        borderRadius: 20,
    },
    text: {
        fontSize: fontSize(15),
        fontWeight: '600'
    },
});
