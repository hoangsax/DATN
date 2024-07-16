import React, { useState, useEffect, version } from "react";
import {
    View,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    ImageSourcePropType,
} from "react-native";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import type { RealEstateItemData } from "../../constants/types";
import { SvgXml } from "react-native-svg";
import { UIText } from "@/components";
import { icons, images } from "@/constants";

const width = horizontalScale(180);
const coverHeight = horizontalScale(92);
const infoHeight = horizontalScale(64);
const icon_size = horizontalScale(8);

interface RealEstateItemProps {
    data?: RealEstateItemData;
    source?: ImageSourcePropType;
    onPress?: () => void;
    iconPress?: () => {};
}

const RealEstateItem = (props: RealEstateItemProps) => {
    const { data, source, onPress, iconPress } = props;

    const defaultData: RealEstateItemData = {
        status: "ongoing",
        type: "villa",
        name: "Maple House",
        location: "123 Maple Street, Springfield",
        totalTokens: 1000,
        boughtTokens: 467,
        price: 582.47,
        image: images.LOGO,
        investors: 15,
    };
    const [finalData, setFinalData] = useState<RealEstateItemData>(defaultData);

    useEffect(() => {
        // Use data if provided, otherwise use the defaultData
        if (data !== undefined && data !== null) {
            setFinalData(data);
        } else {
            setFinalData(defaultData);
        }
    }, [data]);
    return (
        <TouchableOpacity
            style={[styles.container, styles.shadowBox]}
            onPress={onPress}
        >
            <View style={styles.coverImg}>
                <ImageBackground
                    style={styles.imgBackground}
                    source={source ? source : images.LOGO}
                    resizeMode="stretch"
                >
                    <TouchableOpacity onPress={iconPress}>
                        <SvgXml
                            xml={icons.HEART}
                            height={horizontalScale(14)}
                            width={horizontalScale(14)}
                            style={styles.iconFav}
                        />
                    </TouchableOpacity>
                </ImageBackground>
            </View>
            <View style={styles.info}>
                <View style={styles.price}>
                    <View style={styles.price_token}>
                        <SvgXml
                            xml={icons.TOKEN}
                            height={horizontalScale(13)}
                            width={horizontalScale(13)}
                        />
                        <UIText
                            style={styles.textPrice}
                            value={`${finalData.boughtTokens}/${finalData.totalTokens}`}
                        />
                    </View>
                    <View style={styles.price_dong}>
                        <SvgXml
                            xml={icons.DONG}
                            height={horizontalScale(15)}
                            width={horizontalScale(15)}
                        />
                        <UIText
                            style={styles.textPrice}
                            value={finalData.price.toLocaleString()}
                        />
                    </View>
                </View>
                <View style={styles.detail}>
                    <UIText value={finalData.name} fSize={15} fWeight={'bold'} />
                </View>
                <View style={styles.address}>
                    <UIText
                        style={styles.textAddress}
                        value={finalData.location}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RealEstateItem;

const detailPaddingHorizontal = horizontalScale(6);
const seperatorWidth = horizontalScale(1);
const seperatorMarginHorizontal = horizontalScale(10);

const styles = StyleSheet.create({
    container: {
        width: width,
        height: coverHeight + infoHeight,
        backgroundColor: "white",
        borderRadius: 8,
    },

    coverImg: {
        height: coverHeight,
        borderRadius: 8,
    },

    imgBackground: {
        width: "100%",
        height: "100%",
        borderRadius: 8,
    },

    iconFav: {
        alignSelf: "flex-end",
        marginRight: horizontalScale(5),
        marginTop: horizontalScale(5),
    },

    info: {
        height: infoHeight,
        justifyContent: "space-between",
        paddingVertical: horizontalScale(4),
        paddingHorizontal: detailPaddingHorizontal,
    },

    //1st row
    price: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: horizontalScale(10)
    },

    price_token: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        gap: horizontalScale(4),
    },

    price_dong: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: 'flex-end'
    },

    textPrice: {
        fontSize: fontSize(10),
    },

    //2nd row
    seperator: {
        backgroundColor: "gray",
        width: seperatorWidth,
        marginHorizontal: seperatorMarginHorizontal,
    },

    detail: {
        flex: 1,
        justifyContent: 'center'
    },

    //3rd row
    address: {
        flex: 0.5,
    },

    shadowBox: {
        borderRadius: 8,
        elevation: 5, // For Android
        shadowColor: "black", // For iOS
        shadowOffset: { width: 0, height: 4 }, // For iOS
        shadowOpacity: 0.2, // For iOS
        shadowRadius: 0.2, // For iOS
    },

    //Text

    textLabel: {
        fontSize: fontSize(4),
        color: "gray",
        fontWeight: "600",
    },

    textLabelData: {
        fontSize: fontSize(10),
    },

    textAddress: {
        fontSize: fontSize(8),
    },
});
