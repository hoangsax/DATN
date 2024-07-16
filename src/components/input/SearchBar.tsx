import { RootState } from "@/store";
import React from "react";
import { useSelector } from "react-redux";
import { icons, defStyles } from "@/constants";
import { View, StyleSheet, TextInput, DimensionValue } from "react-native";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { SvgXml } from "react-native-svg";

interface SearchBarProps {
    setWidth?: DimensionValue
}

export const SearchBar = ({setWidth}: SearchBarProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);

    return (
        <View
            style={[
                styles.container,
                defStyles.shadowBox,
                { backgroundColor: colors.BG_CARD, width: setWidth? setWidth : horizontalScale(251)  },
            ]}
        >
            <SvgXml style={styles.icon} xml={icons.SEARCH} />
            <TextInput
                placeholder="Search by Address, City or Zip"
                placeholderTextColor={colors.TEXT_STD_FORM}
                style={[styles.input, { fontSize: fontSize(11) }]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        borderWidth: 0,
        borderRadius: 10,
        height: 51,
        paddingVertical: verticalScale(17),
        paddingHorizontal: horizontalScale(20),
        gap: horizontalScale(8),
    },
    input: {
        flex: 7,
    },
    icon: {
        flex: 1,
        alignContent: "center",
        justifyContent: "center",
    },
});
