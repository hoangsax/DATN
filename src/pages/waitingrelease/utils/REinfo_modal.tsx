import { Button, UIText } from "@/components";
import { ReType } from "@/components/tab/ReType";
import {
    defStyles,
    heights,
    icons,
    IconType,
    images,
    TokenManagementCompanyAccount,
    TokenManagementCompanyAccountInfo,
} from "@/constants";
import { RootState } from "@/store";
import {
    fontSize,
    HEIGHT_SCREEN,
    horizontalScale,
    verticalScale,
    WIDTH_SCREEN,
} from "@/utils";
import React, { useEffect, useState } from "react";
import {
    Image,
    ImageBackground,
    Modal,
    ScrollView,
    StyleProp,
    StyleSheet,
    TouchableOpacity,
    View,
    ViewStyle,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";

interface REinfo_modalProps {
    visible: boolean;
    setVisible: () => void;
    data: any; // should be replaced by actual data type
    title?: string; // should be replaced by actual title string
    onSave?: () => void; // should be replaced by actual function to save data
    onCancel?: () => void; // should be replaced by actual function to cancel changes
}

interface IconValueInfoProps {
    icon: IconType;
    value?: string;
    info: string;
}

interface InvestButtonProps {
    price: string | number;
    style: StyleProp<ViewStyle>;
}

const InvestButton = ({ price, style }: InvestButtonProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    return (
        <View
            style={[
                style,
                {
                    height: heights.BOTNAV * 1.5,
                    width: "100%",
                    flexDirection: "row",
                    backgroundColor: Colors.MAIN,
                    paddingHorizontal: horizontalScale(10),
                    paddingVertical: verticalScale(10),
                    justifyContent: "space-between",
                    alignItems: "center",
                },
            ]}
        >
            <View style={{ gap: verticalScale(5) }}>
                <View>
                    <UIText value="Đơn giá" fWeight={"bold"} fSize={16} />
                </View>
                <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                    {price ? (
                        <>
                            <UIText
                                value={`${price} VND`}
                                fWeight={"bold"}
                                fSize={20}
                                color={Colors.TEXT_SPE_MAIN}
                            />
                            <UIText
                                value="/Token"
                                color={Colors.TEXT_STD_FORM}
                            />
                        </>
                    ) : (
                        <UIText
                            value={"Chưa phát hành"}
                            fWeight={"bold"}
                            fSize={20}
                            color={Colors.TEXT_SPE_MAIN}
                        />
                    )}
                </View>
            </View>
            <View>{price && <Button.Primary title="Mua ngay" />}</View>
        </View>
    );
};

export const IconValueInfo = ({ icon, value, info }: IconValueInfoProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    return (
        <View
            style={[
                {
                    flex: 1,
                    borderRadius: 12,
                    justifyContent: "center",
                    alignItems: "center",
                    paddingVertical: verticalScale(5),
                    backgroundColor: Colors.MAIN,
                    gap: verticalScale(2),
                },
                defStyles.shadowBox,
            ]}
        >
            <SvgXml xml={icon} height={30} width={30} />
            {value && (
                <UIText value={value} fSize={12} color={Colors.TEXT_SPE_MAIN} />
            )}
            <UIText value={info} fSize={12} />
        </View>
    );
};

export const REinfo_modal = ({
    visible,
    setVisible,
    data,
}: REinfo_modalProps) => {
    const [tabOn, setTabOn] = useState(0);
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const indicatorPos = useSharedValue(0);

    const [companyData, setCompanyData] =
        useState<TokenManagementCompanyAccountInfo>();

    const handleTabPress = (index: number) => {
        setTabOn(index);
        indicatorPos.value = withTiming(
            index * (WIDTH_SCREEN / 3) /* separator width */,
            { duration: 300 }
        );
    };
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: indicatorPos.value }],
        };
    });

    useEffect(() => {
        if (data?.tokenManagementCompanyAccount) {
            setCompanyData(
                data.tokenManagementCompanyAccount
                    .tokenManagementCompanyAccountInfo
            );
        }
    }, [data]);

    return (
        <>
            <Modal
                visible={visible}
                onRequestClose={setVisible}
                animationType="slide"
            >
                {data && <>
                    <View
                    style={{
                        height: HEIGHT_SCREEN - heights.BOTNAV * 1.5,
                    }}
                >
                    <ScrollView
                        style={{
                            width: "100%",
                            backgroundColor: "red",
                            marginTop: heights.STATUS_BAR,
                        }}
                        showsVerticalScrollIndicator={false}
                    >
                        <ImageBackground
                            style={{
                                height: verticalScale(387),
                                width: "100%",
                            }}
                            source={
                                // data.imagesList
                                //     ? data.imagesList[0]
                                //     :
                                images.RECARD_DEFAULLT
                            }
                            resizeMode="cover"
                        >
                            <View
                                style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    paddingHorizontal: horizontalScale(20),
                                    paddingTop:
                                        verticalScale(35) - heights.STATUS_BAR,
                                }}
                            >
                                <Button.Icon
                                    icon={icons.BACK}
                                    backgroundColor="white"
                                    onPress={setVisible}
                                />
                                <View
                                    style={{
                                        flexDirection: "row",
                                        gap: horizontalScale(10),
                                    }}
                                >
                                    <Button.Icon
                                        icon={icons.SHARE}
                                        backgroundColor="white"
                                    />
                                    <Button.Icon
                                        icon={icons.HEART}
                                        backgroundColor="white"
                                    />
                                </View>
                            </View>
                        </ImageBackground>
                        <View style={{ backgroundColor: "white" }}>
                            <View
                                style={{
                                    paddingHorizontal: horizontalScale(20),
                                    paddingTop: verticalScale(15),
                                    gap: verticalScale(10),
                                }}
                            >
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-between",
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            gap: horizontalScale(5),
                                        }}
                                    >
                                        <SvgXml xml={icons.TOKEN} />
                                        <UIText
                                            value={`${
                                                data.currentSupply
                                                    ? data.currentSupply
                                                    : 0
                                            } / ${
                                                data.supplyTotal
                                                    ? data.supplyTotal
                                                    : 0
                                            }`}
                                        />
                                    </View>
                                    <ReType
                                        value={
                                            data.reType
                                                ? data.reType
                                                : "Không có"
                                        }
                                    />
                                </View>
                                <View style={{ gap: verticalScale(5) }}>
                                    <UIText
                                        value={
                                            data.tokenName
                                                ? data.tokenName
                                                : "Lỗi hiển thị"
                                        }
                                        fWeight={"bold"}
                                        fSize={20}
                                    />
                                    <UIText
                                        value={data.address}
                                        fSize={12}
                                        color={Colors.TEXT_STD_SUB}
                                    />
                                </View>
                            </View>
                            <View>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                        paddingVertical: verticalScale(10),
                                    }}
                                >
                                    <TouchableOpacity
                                        style={styles.tab}
                                        onPress={() => handleTabPress(0)}
                                    >
                                        <UIText
                                            value="Mô tả"
                                            style={styles.tab_text}
                                            color={
                                                tabOn == 0
                                                    ? Colors.TEXT_TAB_ON
                                                    : Colors.TEXT_TAB_OFF
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.tab}
                                        onPress={() => handleTabPress(1)}
                                    >
                                        <UIText
                                            value="Hình ảnh"
                                            style={styles.tab_text}
                                            color={
                                                tabOn == 1
                                                    ? Colors.TEXT_TAB_ON
                                                    : Colors.TEXT_TAB_OFF
                                            }
                                        />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.tab}
                                        onPress={() => handleTabPress(2)}
                                    >
                                        <UIText
                                            value="Đánh giá"
                                            style={styles.tab_text}
                                            color={
                                                tabOn == 2
                                                    ? Colors.TEXT_TAB_ON
                                                    : Colors.TEXT_TAB_OFF
                                            }
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View
                                    style={{
                                        height: 2,
                                        width: "100%",
                                        backgroundColor: Colors.BG_BTI_SUB,
                                    }}
                                >
                                    <Animated.View
                                        style={[
                                            {
                                                height: 2,
                                                width: WIDTH_SCREEN / 3,
                                                backgroundColor:
                                                    Colors.BG_BTI_MAIN,
                                            },
                                            animatedStyle,
                                        ]}
                                    />
                                </View>
                            </View>
                            {tabOn == 0 && (
                                <View
                                    style={{
                                        paddingTop: verticalScale(20),
                                        gap: verticalScale(20),
                                        paddingHorizontal: horizontalScale(20),
                                    }}
                                >
                                    <View
                                        style={{
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            gap: horizontalScale(20),
                                        }}
                                    >
                                        <IconValueInfo
                                            value={data.area.slice(0, -4)}
                                            info="mét vuông"
                                            icon={icons.AREA}
                                        />
                                        <IconValueInfo
                                            value={data.bedRoom}
                                            info="phòng ngủ"
                                            icon={icons.BEDROOM}
                                        />
                                        <IconValueInfo
                                            value={data.bathRoom}
                                            info="phòng tắm"
                                            icon={icons.BATHROOM}
                                        />
                                    </View>
                                    <View style={{ gap: verticalScale(10) }}>
                                        <UIText
                                            value="Liên hệ"
                                            fWeight={600}
                                            fSize={16}
                                        />
                                        <View
                                            style={{
                                                gap: verticalScale(10),
                                                flexDirection: "row",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    gap: verticalScale(10),
                                                }}
                                            >
                                                <Image
                                                    source={images.PROFILE}
                                                    style={{
                                                        height: 80,
                                                        width: 80,
                                                        borderRadius: 99,
                                                        borderWidth: 1,
                                                        borderColor:
                                                            Colors.BG_BT_MAIN,
                                                    }}
                                                />
                                                <View
                                                    style={{
                                                        justifyContent:
                                                            "center",
                                                        gap: verticalScale(5),
                                                    }}
                                                >
                                                    <UIText
                                                        value={
                                                            companyData
                                                                ? companyData.companyName
                                                                : "Không tồn tại"
                                                        }
                                                        fWeight={"bold"}
                                                    />
                                                    {companyData && (
                                                        <UIText
                                                            value={
                                                                companyData.certificateCode
                                                            }
                                                            color={
                                                                Colors.TEXT_STD_SUB
                                                            }
                                                        />
                                                    )}
                                                </View>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    gap: horizontalScale(10),
                                                }}
                                            >
                                                <SvgXml xml={icons.EMAIL} />
                                                <SvgXml xml={icons.PHONE} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                        </View>
                    </ScrollView>
                </View>
                <InvestButton
                    style={{ position: "absolute", bottom: 0 }}
                    price={data.valuationPerToken}
                /></>}
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    tab: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    tab_text: {
        fontSize: fontSize(15),
        fontWeight: "500",
    },
});
