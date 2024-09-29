import { IconType, icons } from "@/constants";
import React from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { SvgXml } from "react-native-svg";
import { UIText } from "../text";
import { horizontalScale, verticalScale } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { heights } from "@/constants/heights.const";

interface ButtonUtilProps {
    icon?: IconType;
    title: string;
    color?: string;
    align?: 'center' | 'flex-end' | 'flex-start';
    backgroundColor?: string;
    onPress?: () => void;
}

export const ButtonUtil = ( props : ButtonUtilProps) => {

    const Colors = useSelector((state: RootState) => state.theme.palette)
    const {icon, title,color,backgroundColor,onPress, align} = props
    const styles = StyleSheet.create({
        container: {
            paddingHorizontal: horizontalScale(13),
            paddingVertical: verticalScale(10),
            gap: horizontalScale(6),
            backgroundColor: Colors.MAIN,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: Colors.BG_MAIN,
            flexDirection: 'row'
        }
    })

    return (
        <TouchableOpacity style={[styles.container,{justifyContent: align? align : 'flex-start'}]} onPress={onPress}>
            {icon && <SvgXml xml={icons.SORT} style={{height: heights.BUTTON_ICON, width: heights.BUTTON_ICON}} /> }
            <UIText value={title} />
        </TouchableOpacity>
    )
}