import { RootState } from "@/store";
import { horizontalScale, verticalScale } from "@/utils";
import React, { useEffect } from "react";
import {
    ImageBackground,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { useSelector } from "react-redux";
import { UIText } from "../text";
import { SvgXml } from "react-native-svg";
import { icons } from "@/constants";
import { RealEstateItemData } from "@/constants";
import { ReType } from "../tab/ReType";

const IMG_HW = horizontalScale(90);

interface LongCardProps {
    containerStyle?: StyleProp<ViewStyle>;
    ratio?: number;
    data: RealEstateItemData;
}

export const LongCard = ({ containerStyle, data }: LongCardProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const styles = StyleSheet.create({
        container: {
            borderRadius: 15,

            backgroundColor: Colors.BG_CARD_MAIN,
        },
        imgContainer: {
            height: IMG_HW,
            width: IMG_HW,

            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
        },
        detail: {
            flex: 1,
        },
        progress: {
            flex: 1,
            flexDirection: "row",
            height: IMG_HW + 2 * horizontalScale(10),
            // width: ratio
            //     ? ratio * (WIDTH_SCREEN - 2 * horizontalScale(10))
            //     : WIDTH_SCREEN - 2 * horizontalScale(10),
            borderColor: Colors.BORDER_ICON,
            borderRadius: 15,
            gap: 10,
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(10),
        },
        re_top: { flexDirection: "row", flex: 1, alignItems: "center" },
        re_investor: {
            flex: 1,
            flexDirection: "row",
        },
        re_location: {
            flexDirection: "row",
            gap: verticalScale(2),
        },
        re_info: { flex: 2.5 },
        re_bot: {
            flexDirection: "row",
            flex: 1,
            gap: verticalScale(5),
        },
        re_token: {
            flex: 3,
            flexDirection: "row",
            alignItems: "center",
            gap: verticalScale(3),
            paddingLeft: horizontalScale(3),
        },
        re_price: {
            flex: 2,
            flexDirection: "row",
            alignItems: "center",
            marginLeft: horizontalScale(-5),
        },
    });

    useEffect(() => {
        return;
    }, []);

    return (
        <TouchableOpacity
            style={[styles.container, styles.progress, containerStyle]}
        >
            <ImageBackground
                style={styles.imgContainer}
                source={require("@/assets/images/psuedo_data/img_001.jpeg")}
            ></ImageBackground>
            <View style={styles.detail}>
                <View style={styles.re_top}>
                    <View style={styles.re_investor}>
                        <UIText
                            value={`${data.investors}`}
                            fWeight={"bold"}
                            color={"#5d995d"}
                        />
                        <UIText value={` Nhà đầu tư`} />
                    </View>
                    <ReType value={data.type} />
                </View>
                <View style={styles.re_info}>
                    <UIText value={data.name} fSize={25} fWeight={"bold"} />
                    <View style={styles.re_location}>
                        <SvgXml
                            xml={icons.LOCATION_FILL}
                            height={15}
                            width={15}
                        />
                        <UIText
                            value={data.location}
                            color={Colors.TEXT_STD_FORM}
                            fSize={12}
                        />
                    </View>
                </View>
                <View style={styles.re_bot}>
                    <View style={styles.re_token}>
                        <SvgXml xml={icons.TOKEN} />
                        <UIText
                            value={`${data.boughtTokens}/${data.totalTokens}`}
                        />
                    </View>
                    <View style={styles.re_price}>
                        <SvgXml xml={icons.DONG} />
                        <UIText value={data.price} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
