import React, { useEffect, useState, version } from "react";
import {
    Image,
    ImageURISource,
    TouchableOpacity,
    View,
    StyleSheet,
    Text,
} from "react-native";
import { RootState } from "@/store";
import { useSelector } from "react-redux";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { SvgXml } from "react-native-svg";
import { icons } from "@/constants";
import { UIText } from "../text";
import { Button } from "../button";
import { defStyles } from "@/constants";
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
    onFav?: () => void
}

const defData = {
    image: require("@/assets/images/recard_default.jpg"),
    name: "Lorem House",
    price: 4,
    location: "random",
};

export const ReCard = ({ data, onPress, small, onFav }: ReCardProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);
    const scale = small ? 3 / 4 : 1;
    const [item, setItem] = useState<ReCardData>(defData);
    useEffect(() => {
        if (data) {
            setItem(data);
        }
    });
    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignContent: "center",
            height: horizontalScale(223) * scale,
            width: horizontalScale(242) * scale,
            borderRadius: horizontalScale(10) * scale,
        },
        imgWrapper: {
            backgroundColor: colors.MAIN,
        },
        img: {
            height: horizontalScale(155) * scale,
            width: "auto",
            borderRadius: 15,
        },
        detail: {
            flex: 2,
            height: horizontalScale(242 - 155) * scale,
            width: "auto",
            paddingHorizontal: horizontalScale(11) * scale,
            paddingTop: verticalScale(13) * scale,
            gap: verticalScale(5) * scale,
        },
        name: {
            fontSize: fontSize(15) * scale,
            fontWeight: "600",
            color: colors.TEXT_STD_MAIN,
        },
        price: {
            fontSize: fontSize(11) * scale,
            color: colors.TEXT_SPE_MAIN,
        },
        location: {
            flexDirection: "row",
            gap: horizontalScale(4.36) * scale,
            alignItems: "center",
        },
        address: {
            fontSize: fontSize(11) * scale,
            color: colors.TEXT_STD_SUB,
        },
        bottom: {
            flexDirection: "row",
            borderRadius: 15,
            backgroundColor: colors.BG_CARD,
        },
        fav: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
    });

    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.container,
                defStyles.shadowBox,
                { backgroundColor: colors.BG_CARD },
            ]}
        >
            <View style={styles.imgWrapper}>
                <Image
                    resizeMode="cover"
                    style={styles.img}
                    source={require("@/assets/images/recard_default.jpg")}
                />
            </View>
            <View style={styles.bottom}>
                <View style={styles.detail}>
                    <UIText style={styles.name} value={item.name} />
                    <UIText
                        style={styles.price}
                        value={`$${item.price}/token`}
                    />
                    <View style={styles.location}>
                        <SvgXml xml={icons.LOCATION} height={10} width={10} />
                        <UIText style={styles.address} value={item.location} />
                    </View>
                </View>
                <View style={styles.fav}>
                    <Button.Icon
                        backgroundColor={colors.BG_BTI_SUB}
                        icon={icons.SAVED}
                        size="small"
                        radius={20}
                        onPress={onFav}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};
