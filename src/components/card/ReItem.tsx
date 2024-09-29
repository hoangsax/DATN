import { RootState } from "@/store";
import { formatNumberWithRegex, horizontalScale, verticalScale } from "@/utils";
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
import { defStyles, icons } from "@/constants";
import { RealEstateItemData } from "@/constants";
import { ReType } from "../tab/ReType";

const IMG_HW = horizontalScale(90);

interface LongCardProps {
    containerStyle?: StyleProp<ViewStyle>;
    ratio?: number;
    data: any;
    onPress: () => void;
}

export const ReItem = ({ containerStyle, data, onPress }: LongCardProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const styles = StyleSheet.create({
        container: {
            borderRadius: 15,
        },
        imgContainer: {
            height: IMG_HW,
            width: IMG_HW,
            borderRadius: 15,
            justifyContent: "center",
            alignItems: "center",
        },
        detail: {
            width: "100%",
            flex: 1,
        },
        progress: {
            flex: 1,
            flexDirection: "row",
            height: IMG_HW + 2 * horizontalScale(10),
            // width: ratio
            //     ? ratio * (WIDTH_SCREEN - 2 * horizontalScale(10))
            //     : WIDTH_SCREEN - 2 * horizontalScale(10),
            borderColor: Colors.BG_CARD_MAIN,
            borderWidth: 0.5,
            borderRadius: 15,
            gap: 10,
            backgroundColor: Colors.BG_CARD_MAIN,
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
            height: "auto",
            gap: verticalScale(2),
        },
        re_info: { flex: 2.5, gap: verticalScale(5) },
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
            flex: 3,
            flexDirection: "row",
            alignItems: "center",
            marginLeft: horizontalScale(20),
        },
    });

    useEffect(() => {
        return;
    }, []);

    return (
        <TouchableOpacity
            style={[styles.container, defStyles.shadowBox, styles.progress, containerStyle]}
            onPress={onPress}
        >
            <ImageBackground
                style={styles.imgContainer}
                source={require("@/assets/images/psuedo_data/img_001.jpeg")}
            ></ImageBackground>
            <View style={styles.detail}>
                <View style={styles.re_top}>
                    <View style={styles.re_investor}>
                        <UIText
                            value={`${data.reManagements.length}`}
                            fWeight={"bold"}
                            color={"#5d995d"}
                        />
                        <UIText value={` Nhà đầu tư`} />
                    </View>
                    <ReType value={data.reType} />
                </View>
                <View style={styles.re_info}>
                    <UIText
                        value={data.tokenName}
                        fSize={20}
                        fWeight={"bold"}
                    />
                    <View style={[styles.re_location, { width: "100%" }]}>
                        <SvgXml
                            xml={icons.LOCATION_FILL}
                            height={15}
                            width={15}
                        />
                        <UIText
                            value={
                                data.street +
                                ", " +
                                data.ward +
                                ", " +
                                data.district
                            }
                            color={Colors.TEXT_STD_FORM}
                            fSize={12}
                        />
                    </View>
                </View>
                <View style={styles.re_bot}>
                    <View style={styles.re_token}>
                        <SvgXml xml={icons.TOKEN} />
                        <UIText
                            value={`${
                                data.currentSupply ? data.currentSupply : 0
                            }/${data.supplyTotal ? data.supplyTotal : 0}`}
                        />
                    </View>
                    <View style={styles.re_price}>
                        <SvgXml xml={icons.DONG} />
                        <UIText
                            style={{ justifyContent: "flex-end" }}
                            value={formatNumberWithRegex(
                                data.valuationPerToken
                            )}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};
