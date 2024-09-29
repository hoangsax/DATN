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
    Text,
    FlatList,
} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { spaces } from "@/constants/space.const";
import ReviewComponent from "./REinfo_component/comment";
import ReviewSummaryScreen from "./REinfo_component/buy";

const imgs = [
    {
        id: "1",
        src: "https://i2.au.reastatic.net/1176x696-resize,extend,r=33,g=40,b=46/0b247edc345223dbcac6c3de4529f3ed71448391aa967216268bebf1201cf849/image.jpg",
    },
    {
        id: "2",
        src: "https://i2.au.reastatic.net/1176x696-resize,extend,r=33,g=40,b=46/8ee7fc2339b5eb0f38b1d7701512e4c609e54c98cc56766cae0bb3236be09adb/image.jpg",
    },
    {
        id: "3",
        src: "https://i2.au.reastatic.net/1176x696-resize,extend,r=33,g=40,b=46/b67e5cb70d2ebab646fad84a05db82675e58e3fc173ac9ecfdc54c7fa5100841/image.jpg",
    },
    {
        id: "4",
        src: "https://i2.au.reastatic.net/1176x696-resize,extend,r=33,g=40,b=46/c5e2812c9776f7f40c7fa0fc52d50af52b2ce433ed20b9648ceab3f2d2f7e954/image.jpg",
    },
    {
        id: "5",
        src: "https://i2.au.reastatic.net/1176x696-resize,extend,r=33,g=40,b=46/a3ab6061348a797417337b804033d0a02a035c97487612426215a322a82202f4/image.jpg",
    },
    {
        id: "6",
        src: "https://i2.au.reastatic.net/1176x696-resize,extend,r=33,g=40,b=46/07155159b5d8589270208dc7bf5c5cc34c3fba980d5d96bcb58a1f80dc511eb3/image.jpg",
    },
];

const GalleryComponent = () => {
    const renderImage = ({ item }: any) => (
        <View style={styles.imageContainer}>
            <Image source={{ uri: item.src }} style={styles.image} />
        </View>
    );
    const rows = [];
    for (let i = 0; i < imgs.length; i += 2) {
        rows.push(imgs.slice(i, i + 2));
    }
    return (
        <View
            style={{
                paddingHorizontal: spaces.globalPadding,
                paddingTop: verticalScale(15),
            }}
        >
            {rows.map((row, rowIndex) => (
                <View
                    key={rowIndex}
                    style={[styles.row, { flexDirection: "row" }]}
                >
                    {row.map((item) => (
                        <View key={item.id} style={styles.imageContainer}>
                            <Image
                                source={{ uri: item.src }}
                                style={styles.image}
                            />
                        </View>
                    ))}
                </View>
            ))}
        </View>
    );
};
const AddressComponent = () => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const handleViewOnMapPress = () => {
        // Logic to open map or navigate to a detailed map view
        console.log("View on Map pressed");
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.addressLabel}>Address</Text>
                <TouchableOpacity onPress={handleViewOnMapPress}>
                    <UIText
                        value="Bản đồ"
                        color={Colors.TEXT_SPE_MAIN}
                        fWeight={600}
                    />
                </TouchableOpacity>
            </View>
            <View
                style={{
                    height: 1,
                    backgroundColor: "gray",
                    marginBottom: verticalScale(10),
                }}
            />
            <View style={styles.addressText}>
                <SvgXml xml={icons.LOCATION_FILL} height={15} width={15} />
                <UIText
                    value={"Lorem Ipsum is simply dummy text"}
                    color={Colors.TEXT_STD_FORM}
                />
            </View>

            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{
                        latitude: 37.78825,
                        longitude: -122.4324,
                    }}
                    title={"UNION"}
                    description={"Street name"}
                />
            </MapView>
        </View>
    );
};

export default AddressComponent;

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
    data: any;
}

const InvestButton = ({ price, style, data }: InvestButtonProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const [modal, setModal] = useState(false)
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
            <View>{price && <Button.Primary title="Mua ngay" onPress={() => setModal(true)} />}</View>
            <ReviewSummaryScreen visible={modal} setVisible={setModal} data={data} />
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
            index * (WIDTH_SCREEN / 2) /* separator width */,
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
                {data && (
                    <>
                        <View
                            style={{
                                height: HEIGHT_SCREEN - heights.BOTNAV * 1.5,
                            }}
                        >
                            <ScrollView
                                style={{
                                    width: "100%",
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
                                            paddingHorizontal:
                                                horizontalScale(20),
                                            paddingTop:
                                                verticalScale(35) -
                                                heights.STATUS_BAR,
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
                                            paddingHorizontal:
                                                horizontalScale(20),
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
                                                paddingVertical:
                                                    verticalScale(10),
                                            }}
                                        >
                                            <TouchableOpacity
                                                style={styles.tab}
                                                onPress={() =>
                                                    handleTabPress(0)
                                                }
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
                                                onPress={() =>
                                                    handleTabPress(1)
                                                }
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
                                        </View>

                                        <View
                                            style={{
                                                height: 2,
                                                width: "100%",
                                                backgroundColor:
                                                    Colors.BG_BTI_SUB,
                                            }}
                                        >
                                            <Animated.View
                                                style={[
                                                    {
                                                        height: 2,
                                                        width: WIDTH_SCREEN / 2,
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
                                                paddingHorizontal:
                                                    horizontalScale(20),
                                            }}
                                        >
                                            <View
                                                style={{
                                                    flexDirection: "row",
                                                    justifyContent:
                                                        "space-between",
                                                    gap: horizontalScale(20),
                                                }}
                                            >
                                                <IconValueInfo
                                                    value={data.area.slice(
                                                        0,
                                                        -4
                                                    )}
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
                                            <View
                                                style={{
                                                    gap: verticalScale(10),
                                                }}
                                            >
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
                                                        justifyContent:
                                                            "space-between",
                                                    }}
                                                >
                                                    <View
                                                        style={{
                                                            flexDirection:
                                                                "row",
                                                            gap: verticalScale(
                                                                10
                                                            ),
                                                        }}
                                                    >
                                                        <Image
                                                            source={
                                                                images.PROFILE
                                                            }
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
                                                                gap: verticalScale(
                                                                    5
                                                                ),
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
                                                            flexDirection:
                                                                "row",
                                                            gap: horizontalScale(
                                                                10
                                                            ),
                                                        }}
                                                    >
                                                        <SvgXml
                                                            xml={icons.EMAIL}
                                                        />
                                                        <SvgXml
                                                            xml={icons.PHONE}
                                                        />
                                                    </View>
                                                </View>
                                            </View>
                                            <AddressComponent />
                                        </View>
                                    )}

                                    {tabOn == 1 && <GalleryComponent />}
                                </View>
                            </ScrollView>
                        </View>
                        <InvestButton
                            style={{ position: "absolute", bottom: 0 }}
                            price={data.valuationPerToken}
                            data={data}
                        />
                    </>
                )}
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
    container: {
        flex: 1,
        marginBottom: 20,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 8,
    },
    addressLabel: {
        fontSize: 16,
        fontWeight: "bold",
    },
    viewOnMap: {
        color: "blue",
    },
    addressText: {
        flexDirection: "row",
        marginBottom: 16,
        gap: 5,
        alignItems: "center",
    },
    map: {
        width: "100%",
        height: 200,
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 16,
    },
    count: {
        color: "blue",
    },
    row: {
        justifyContent: "space-between",
        gap: 10,
    },
    imageContainer: {
        flex: 1,
        marginBottom: 10,
        borderRadius: 8,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: 150,
        resizeMode: "cover",
    },
});
