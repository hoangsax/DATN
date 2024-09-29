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
import { fontSize, horizontalScale, verticalScale, WIDTH_SCREEN } from "@/utils";
import { SvgXml } from "react-native-svg";
import { icons, images, RealEstateItemData } from "@/constants";
import { UIText } from "../text";
import { Button } from "../button";
import { defStyles } from "@/constants";

interface ReCardProps {
    data?: RealEstateItemData;
    onPress?: () => void;
    small?: boolean;
    onFav?: () => void
}

const defData: RealEstateItemData = {
    status: "finished",
    type: "estate",
    name: "Elm Estate",
    location: "753 Elm Street, Maplewood",
    totalTokens: 900,
    boughtTokens: 294,
    price: 399.77,
    image: {
        uri: "https://example.com/images/elm_estate.jpg",
    },
    investors: 14,
}

export const ReCard = React.memo(({ data, onPress, small, onFav }: ReCardProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);
    const scale = small ? (WIDTH_SCREEN - horizontalScale(10) * 3) / (horizontalScale(242) * 2) : 1;
    const [item, setItem] = useState<RealEstateItemData>(defData);
    useEffect(() => {
        if (data) {
            setItem(data);
        }
    });
    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignContent: "center",
            width: horizontalScale(242) * scale,
            borderRadius: 15,
        },
        imgWrapper: {
            backgroundColor: colors.MAIN,
            borderRadius: 99,
        },
        img: {
            height: horizontalScale(155) * scale,
            width: "auto",
            borderRadius: 15,
        },
        detail: {
            flex: 2.5,
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
            alignItems: "flex-end",
            paddingRight: horizontalScale(11) * scale
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
                    source={images.RECARD_DEFAULLT}
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
                        backgroundColor={colors.BG_CARD_MAIN}
                        icon={icons.SAVED}
                        size={small? 'tiny' : 'small'}
                        radius={20}
                        onPress={onFav}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
});
