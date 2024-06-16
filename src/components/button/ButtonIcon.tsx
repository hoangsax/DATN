import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { icons } from "@/constants/icon";
import { SvgXml } from "react-native-svg";
import { RootState } from "@/store";
import { useSelector } from "react-redux";

interface ButtonProps {
    icon?: any,
    backgroundColor?: string,
    size?: 'small' | 'medium' | 'large' | number,
    radius?: number,
    onPress?: () => void,
}
const ButtonIcon = (props: ButtonProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette)
    const [bg, setBg] = useState(colors.BG_BT_MAIN)
    const [ico, setIco] = useState(icons.DEFAULT)
    const [siz, setSiz] = useState(horizontalScale(20))
    const { icon, backgroundColor, size, radius, onPress } = props

    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
        },
        button: {
            backgroundColor: bg,
            padding     : verticalScale(17),
            borderRadius: radius? radius : 100,
            alignItems: 'center'
        },
        text: {
            fontSize: fontSize(18),
            fontWeight: 'bold',
            paddingHorizontal: horizontalScale(10)
        }
    })

    useEffect(()=>{
        backgroundColor && setBg(backgroundColor)
        icon && setIco(icon)
        switch (size) {
            case 'small':
                setSiz(horizontalScale(20))
                break;
            case 'medium':
                setSiz(horizontalScale(30))
                break;
            case 'large':
                setSiz(horizontalScale(40))
                break;
            case typeof size === 'number' && !isNaN(size) && size:
                setSiz(horizontalScale(size))
                break;
            default:
                break;
        }
    }),[backgroundColor, ico, size]

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                {size? <SvgXml xml={icon} width={siz} height={siz} /> : <SvgXml xml={icon} /> }
            </TouchableOpacity>
        </View>
    )
}

export default ButtonIcon;