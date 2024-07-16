import React from "react";
import {
    Image,
    ImageBackground,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import { UIText } from "../text";
import {
    MarketPlaceItemData,
    RealEstateItemData,
    icons,
    images,
} from "@/constants";
import { WIDTH_SCREEN, horizontalScale, verticalScale } from "@/utils";
import { heights } from "@/constants/heights.const";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { SvgXml } from "react-native-svg";
import { ReType } from "../tab/ReType";

interface TradeCardProps {
    style?: StyleProp<ViewStyle>;
    dataItem: MarketPlaceItemData;
    paddingHorizontal?: number;
}

export const TradeCard = React.memo(({
    style,
    dataItem,
    paddingHorizontal,
}: TradeCardProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const PART_HEIGHT = verticalScale(150);
    const styles = StyleSheet.create({
        container: {
            width: (WIDTH_SCREEN * 7.5) / 10,
            height: "auto",
            borderWidth: 0.5,
            borderTopRightRadius: 10,
            borderTopLeftRadius: 10,
            borderColor: Colors.BG_MAIN,
            backgroundColor: Colors.BG_CARD
        },
        top: {
            height: PART_HEIGHT,
            alignItems: "flex-end",
            paddingHorizontal: horizontalScale(10),
            paddingVertical: verticalScale(10),
            justifyContent: "flex-start",
        },
        mid: {
            paddingVertical: verticalScale(20),
            paddingHorizontal: horizontalScale(10),
            borderBottomWidth: 4,
            borderColor: Colors.BG_MAIN,
        },
        bot: {
            height: "auto",
        },
        botItem: {
            flexDirection: "row",
            paddingVertical: verticalScale(15),
            borderTopWidth: 1,
            borderColor: Colors.BG_TAB_FIELD,
        },
        half: {
            flex: 1,
            paddingLeft: horizontalScale(10),
            gap: verticalScale(10),
        },
        bot_odd: {
            backgroundColor: Colors.BG_CARD_MAIN
        },
        bot_last: {
            
            borderBottomEndRadius: 10,
            borderBottomStartRadius: 10,
        }
    });

    return (
        <TouchableOpacity style={styles.container}>
            <ImageBackground source={images.logo} style={styles.top}>
                <ReType value={dataItem.type} />
            </ImageBackground>
            <View style={styles.mid}>
                <UIText fWeight={"bold"} value={dataItem.name} />
                <UIText value={dataItem.location} color={Colors.TEXT_STD_SUB} />
            </View>
            <View style={styles.bot}>
                <View style={styles.botItem}>
                    <View style={styles.half}>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: horizontalScale(5),
                                justifyContent: "center",
                            }}
                        >
                            <SvgXml xml={icons.TOKEN} />
                            <UIText value={``} />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <UIText
                                value={`${dataItem.totalTokens} Token`}
                                fWeight={"bold"}
                            />
                        </View>
                    </View>
                    <View style={styles.half}>
                        <View
                            style={{
                                flexDirection: "row",
                                gap: horizontalScale(5),
                                justifyContent: "center",
                            }}
                        >
                            <SvgXml xml={icons.USER} />
                            <UIText value={``} />
                        </View>
                        <View style={{ alignItems: "center" }}>
                            <UIText
                                value={`${dataItem.owners} Chủ sở hữu`}
                                fWeight={"bold"}
                            />
                        </View>
                    </View>
                </View>
                <View style={[styles.botItem, styles.bot_odd]}>
                    <View style={styles.half}>
                        <UIText value={"Tỉ lệ lợi nhuận"} />
                    </View>
                    <View style={styles.half}>
                        <UIText
                            value={`${dataItem.revenuePercents}%`}
                            fWeight={"bold"}
                        />
                    </View>
                </View>
                <View style={styles.botItem}>
                    <View style={styles.half}>
                        <UIText value={"Khối lượng giao dịch"} />
                    </View>
                    <View style={styles.half}>
                        <UIText
                            value={`${dataItem.averageTradePerWeek} lệnh/tuần`}
                            fWeight={"bold"}
                        />
                    </View>
                </View>
                <View style={[styles.botItem, styles.bot_odd]}>
                    <View style={styles.half}>
                        <UIText value={"Giá trị giao dịch"} />
                    </View>
                    <View style={styles.half}>
                        <UIText
                            value={`${dataItem.totalTradingValue} triệu đồng `}
                            fWeight={"bold"}
                        />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
});
