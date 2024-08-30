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

const re_typ_en = ["Villa", "House", "Hall", "Estate"];

const re_typ_vi = ["Nhà phố", "Chung cư", "Cao ốc", "Đất nền"];

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

    const typeFinder = (value: string) => {
        const result = re_typ_vi[re_typ_en.findIndex((item) => item == value)]
        if (result) return result
        else return "Khác"
    }

    return (
        <View style={styles.re_type}>
            <UIText color={Colors.TEXT_SPE_MAIN} value={typeFinder(value)}></UIText>
        </View>
    );
};
