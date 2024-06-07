import React, { version } from "react";
import {
    Image,
    ImageURISource,
    TouchableOpacity,
    View,
    StyleSheet,
    Text
} from "react-native";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { SvgXml } from "react-native-svg";
import { icons } from "@/constants";

export interface ReCardData {
    image: ImageURISource;
    name: string;
    price: number;
    location: string;
}

interface ReCardProps {
    data?: ReCardData;
    onPress?: () => void;
    small?: boolean;
}

export const ReCard = ({ data, onPress, small }: ReCardProps) => {
    const img: ImageURISource = require("@/assets/images/favicon.png");
    const colors = useSelector((state: RootState) => state.theme.palette);
    const scale = small? 3/4 : 1;
    const styles = StyleSheet.create({
        container: {
            justifyContent: 'center',
            alignContent: 'center',
            height: horizontalScale(242) * scale,
            width: horizontalScale(242) * scale,
            borderRadius: horizontalScale(10) * scale,
        },
        img: {
            height: horizontalScale(155) * scale,
            width: 'auto',
            backgroundColor: 'blue'
        },
        detail: {
            height: horizontalScale(242 - 155) * scale,
            width: 'auto',
            backgroundColor: 'green',
            paddingHorizontal: horizontalScale(11) * scale, 
            paddingTop: verticalScale(13) * scale,
            gap: verticalScale(0        ) * scale,
        },
        name:{
            fontSize: fontSize(15) * scale,
            fontWeight: '600',
            color: colors.TEXT_STD_MAIN,
        },
        price: {
            fontSize: fontSize(11) * scale,
            color: colors.TEXT_SPE_MAIN
        },
        location: {
            flexDirection: 'row',
            gap: horizontalScale(4.36) * scale,
            alignItems: 'center',
        },
        address: {
            fontSize: fontSize(11) * scale,
            color: colors.TEXT_STD_SUB
        }
    });
    

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[styles.container, { backgroundColor: colors.BG_CARD }]}
        >
            <View style={styles.img}></View>
            <View style={styles.detail}>
                <Text style={styles.name}>Lorem House</Text>
                <Text style={styles.price}>$340/month</Text>
                <View style={styles.location}>
                    <SvgXml xml={icons.LOCATION} height={10} width={10} />
                    <Text style={styles.address}>rando</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

