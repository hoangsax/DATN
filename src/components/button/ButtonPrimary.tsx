import React, { useEffect, useState } from "react";
import { StyleSheet, TouchableOpacity, View, Text } from "react-native";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/store";

interface ButtonProps {
    title: string,
    color?: string,
    backgroundColor?: string,
    fill?: boolean,
    onPress?: () => void,
}

const ButtonPrimary = (props: ButtonProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette)
    const [bg, setBg] = useState(colors.BG_BT_MAIN)
    const [colr, setColr] = useState(colors.TEXT_BT_MAIN)
    const [fil, setFil] = useState(0)

    const { title, color, backgroundColor, fill, onPress } = props

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            width: 'auto'
        },
        button: {
            flex: fil,
            backgroundColor: bg,
            padding: verticalScale(17),
            borderRadius: 100,
            alignItems: 'center',
            height: 'auto'
        },
        text: {
            color: colr,
            fontSize: fontSize(18),
            fontWeight: 'bold',
            paddingHorizontal: horizontalScale(10)
        }
    })

    useEffect(()=>{
        backgroundColor && setBg(backgroundColor)
        color && setColr(color)
        fill && setFil(1)
    },[])

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.button} onPress={onPress}>
                <Text style={styles.text}>{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ButtonPrimary;