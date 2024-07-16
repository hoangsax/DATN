import React from "react";
import { StyleSheet, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { UIText } from "../text";
import { horizontalScale, verticalScale } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ReTypeProps {
    value: string;
}

export const ReType = ({ value }: ReTypeProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);

    const styles = StyleSheet.create({
        re_type: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 5,
            backgroundColor: Colors.BG_TAB_OFF,
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(2),
        },
    });

    return (
        <View style={styles.re_type}>
            <UIText color={Colors.TEXT_SPE_MAIN} value={value}></UIText>
        </View>
    );
};
