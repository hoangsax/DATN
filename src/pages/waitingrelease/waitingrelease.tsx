import { Button } from "@/components/button";
import { LongCard } from "@/components/card/LongCard";
import { UIText } from "@/components/text";
import { defStyles, icons, weight } from "@/constants";
import { heights } from "@/constants/heights.const";
import { RootState } from "@/store";
import {
    HEIGHT_SCREEN,
    SelectOptions,
    SelectableOptions,
    WIDTH_SCREEN,
    fontSize,
    horizontalScale,
    verticalScale,
} from "@/utils";
import React, { Ref, useEffect, useRef, useState } from "react";
import {
    FlatList,
    LayoutChangeEvent,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
    Text,
    ActivityIndicator,
    RefreshControl,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    RealEstateItemData,
    REInfoType,
    STOInfo,
    TokenData,
    TokenInfo,
} from "@/constants/types";
import { login } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import { ReItem } from "@/components";
import { REinfo_modal } from "./utils/REinfo_modal";
import { spaces } from "@/constants/space.const";
import { SvgXml } from "react-native-svg";
import { FetchDataComponent } from "./utils/fetchingData";

interface SectionBarProps {
    tabOn: number;
    setTabOn: (num: number) => void;
    setRef: () => void;
}
const TABLIST_HEIGHT = verticalScale(45);
const fSize = fontSize(14);

const SectionBar = ({ tabOn, setTabOn, setRef }: SectionBarProps) => {
    const Colors = useAppSelector((state) => state.theme.palette);
    const tabOnColor = Colors.BG_CARD_MAIN;
    const textColorOn = Colors.TEXT_STD_MAIN;
    const textColorOff = Colors.MAIN;
    const indicatorPos = useSharedValue(tabOn);
    const TAB_WIDTH =
        (WIDTH_SCREEN -
            spaces.globalPadding * 2 /* margin of 2 sides */ -
            horizontalScale(3) * 6 /* 6 gap between tab */ -
            2) /* 2 2-width separators */ /
        3;
    const handleTabPress = (index: number) => {
        setTabOn(index);
        indicatorPos.value = withTiming(
            index *
                (TAB_WIDTH +
                    horizontalScale(3) * 2 /* 2 margin of each tab */ +
                    1) /* separator width */,
            { duration: 300 }
        );
        setRef();
    };
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: indicatorPos.value }],
        };
    });
    return (
        <View
            style={[
                styles.tabList,
                {
                    backgroundColor: Colors.BG_TAB_FIELD,
                    justifyContent: "center",
                },
            ]}
        >
            <Animated.View
                style={[
                    styles.tabIndicator,
                    defStyles.shadowBox,
                    animatedStyle,
                    {
                        width: TAB_WIDTH,
                        backgroundColor: Colors.BG_TAB_ON,
                    },
                ]}
            />
            <View style={styles.listContent}>
                {["Đang mở", "Sắp mở", "Kết thúc"].map((title, index) => (
                    <React.Fragment key={index}>
                        <TouchableOpacity
                            style={[styles.tab]}
                            onPress={() => {
                                handleTabPress(index);
                            }}
                        >
                            <UIText
                                value={title}
                                fSize={fSize}
                                fWeight={weight.bold}
                                color={
                                    tabOn == index ? textColorOn : textColorOff
                                }
                            />
                        </TouchableOpacity>
                        {index < 2 && <View style={styles.seperator} />}
                    </React.Fragment>
                ))}
            </View>
        </View>
    );
};

interface ButtonListProps {
    setSortOptions: (value: any) => void;
    setFilterOptions: (value: any) => void;
}

const ButtonList = React.memo(
    ({ setSortOptions, setFilterOptions }: ButtonListProps) => {
        const bstyles = StyleSheet.create({
            container: {
                flexDirection: "row",
                gap: horizontalScale(10),
                paddingVertical: verticalScale(10),
            },
        });

        const [filterOptions] = useState<SelectableOptions[]>([
            { key: "Villa", label: "Nhà phố" },
            { key: "Estate", label: "Đất nền" },
            { key: "Hall", label: "Cao ốc" },
            { key: "House", label: "Chung cư" },
            { key: null, label: "Không" },
        ]);

        const [sortOptions] = useState<SelectableOptions[]>([
            { key: "name", label: "Tên" },
            { key: "totalTokens", label: "Số token" },
            { key: "price", label: "Đơn giá" },
            { key: "investors", label: "Nhà đầu tư" },
        ]);

        const [sortModal, setSortModal] = useState(false);
        const [filterModal, setFilterModal] = useState(false);

        const handleSortPress = () => {
            setSortModal((prev) => !prev);
        };

        const handleFilterPress = () => {
            setFilterModal((prev) => !prev);
        };
        return (
            <View style={[bstyles.container]}>
                <Button.Util
                    title="Sắp xếp"
                    icon="SORT"
                    onPress={handleSortPress}
                />
                <SelectOptions
                    name="Sắp xếp"
                    options={sortOptions}
                    visible={sortModal}
                    toggleVisible={handleSortPress}
                    setReturnValue={setSortOptions}
                />
                <Button.Util
                    title="Lọc"
                    icon="FILTER"
                    onPress={handleFilterPress}
                />
                <SelectOptions
                    name="Lọc"
                    options={filterOptions}
                    visible={filterModal}
                    toggleVisible={handleFilterPress}
                    setReturnValue={setFilterOptions}
                />
            </View>
        );
    }
);

export const WaitingRelease = () => {
    const DataState = useSelector((state: RootState) => state.data.returnData);
    const [loading, setLoading] = useState(false)
    const [tabOn, setTabOn] = useState(0);
    const scrollRef = useRef<FlatList>(null);
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const [ButtonListH, setButtonListH] = useState<number>(0);
    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setButtonListH(height);
    };
    const [constData, setConstData] = useState<any>([]);
    const [initData, setInitData] = useState<any>([]);
    const [renderData, setRenderData] = useState<any>([]);
    const [sortByOption, setSortByOption] = useState("");
    const [filterByOption, setFilterByOption] = useState<any>(null);
    const [refreshing, setRefreshing] = useState(false);
    const [reInfoModal, setReInfoModal] = useState(false);
    const [reInfoParam, setReInfoParam] = useState<any>(null);
    const toggleReInfoModal = (item: any) => {
        setReInfoParam(item);
        setReInfoModal((prev) => !prev);
    };
    const [error, setError] = useState<string>("");
    const handleTab = (data: any) => {
        const currentEpochTime = Math.floor(Date.now() / 1000);
        if (tabOn == 0) {
            return [...data].filter(
                (item) =>
                    item.isSTOs == "Đã phát hành" &&
                    item.startAt - currentEpochTime < 0 &&
                    item.endAt - currentEpochTime > 0
            );
        } else if (tabOn == 1) {
            return [...data].filter(
                (item) =>
                    item.isSTOs == "Chưa phát hành" ||
                    item.startAt - currentEpochTime > 0
            );
        } else if (tabOn == 2) {
            return [...data].filter(
                (item) =>
                    item.isSTOs == "Đã phát hành" &&
                    item.endAt - currentEpochTime < 0
            );
        } else return data;
    };

    const handleSort = (data: any) => {
        if (sortByOption === "name") {
            return [...data].sort((a, b) =>
                a.tokenName.localeCompare(b.tokenName)
            );
            } else if (sortByOption === "price") {
                return [...data].sort((a, b) => a.valuationPerToken - b.valuationPerToken);
            // } else if (sortByOption === "investors") {
            //     return [...data].sort((a, b) => a.investors - b.investors);
            } else if (sortByOption === "totalTokens") {
                return [...data].sort((a, b) => a.currentSupply - b.currentSupply);
        } else return data;
    };

    const handleFilter = () => {
        if (filterByOption) {
            return constData.filter(
                (item: any) => item.reType == filterByOption
            );
        } else return constData;
    };

    const handleRef = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
    };
    const onRefresh = () => {
        setRefreshing(true);

        // Simulate data update
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    };

    useEffect(() => {
        if (DataState) {
            setConstData([...DataState]);
            setInitData([...DataState]);
        }
    }, [DataState]);
    useEffect(() => {
        let tabData = handleTab(initData);
        setRenderData(tabData);
        handleRef();
    
    }, [tabOn, initData]);

    useEffect(() => {
        let filteredData = handleFilter();
        let sortedData = handleSort(filteredData);
        setInitData(sortedData);
    }, [sortByOption, filterByOption]);
    // useEffect(() => {
    //     // Set a delay of 3 seconds (3000 ms)
    //     setLoading(true)
    //     const timer = setTimeout(() => {
    //         setLoading(false);
    //     }, 2000);

    //     // Clean up the timer when the component is unmounted
    //     return () => clearTimeout(timer);
    // }, []); 
    return (
        <View style={[styles.container, {backgroundColor: Colors.MAIN}]}>
            <View
                style={[
                    styles.header,
                    defStyles.shadowBox,
                    { backgroundColor: Colors.MAIN_POP },
                ]}
            >
                <View style={{ flex: 1 }}></View>
                <View
                    style={{
                        flex: 1,
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <UIText value="Phát Hành" fSize={18} />
                </View>
                <View
                    style={{
                        flex: 1,
                        alignItems: "flex-end",
                        justifyContent: "center",
                    }}
                >
                    <SvgXml xml={icons.SEARCH} />
                </View>
            </View>
            <View style={styles.main}>
                <View
                    style={[
                        defStyles.shadowBox,
                        {
                            paddingHorizontal: spaces.globalPadding,
                            backgroundColor: Colors.MAIN_POP,
                        },
                    ]}
                    onLayout={handleLayout}
                >
                    <ButtonList
                        setFilterOptions={setFilterByOption}
                        setSortOptions={setSortByOption}
                    />
                </View>
                <SectionBar
                    tabOn={tabOn}
                    setTabOn={setTabOn}
                    setRef={handleRef}
                />
                {loading && <ActivityIndicator size="large" color="#0000ff" />}
                {error && <Text>error: {error}</Text>}
                <View>
                    {!loading && (
                        <FlatList
                            ref={scrollRef}
                            style={[
                                styles.reItems,
                                {
                                    height:
                                        HEIGHT_SCREEN - //Full screen height
                                        heights.STATUS_BAR - //status bar height
                                        TABLIST_HEIGHT - //<TabList />
                                        heights.BOTNAV * 2 - //bottom navigator height + header height
                                        verticalScale(10) - //margin bottom of header
                                        verticalScale(10) - //margin top of flatlist
                                        ButtonListH, //<ButtonList /
                                    paddingTop: verticalScale(5),
                                },
                            ]}
                            // showsVerticalScrollIndicator={false}
                            data={renderData}
                            renderItem={({ item, index }) => (
                                <React.Fragment key={index}>
                                    <View testID={`flatlist-item-${item.id}`}>
                                    <ReItem
                                        containerStyle={[
                                            {
                                                marginBottom: verticalScale(10),
                                            },
                                            defStyles.shadowBox,
                                        ]}
                                        data={item}
                                        onPress={() => toggleReInfoModal(item)}
                                    />
                                    </View>
                                </React.Fragment>
                            )}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                        />
                    )}
                    {refreshing && <FetchDataComponent />}
                    {reInfoParam && (
                        <REinfo_modal
                            visible={reInfoModal}
                            setVisible={() => setReInfoModal((prev) => !prev)}
                            data={reInfoParam}
                        />
                    )}
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        gap: verticalScale(5),
    },
    header: {
        flexDirection: "row",
        height: heights.BOTNAV,
        paddingHorizontal: spaces.globalPadding,
    },
    tabList: {
        height: TABLIST_HEIGHT,
        marginHorizontal: spaces.globalPadding,
        borderRadius: 99,
    },
    tabIndicator: {
        marginVertical: verticalScale(3),
        position: "absolute",
        bottom: 0,
        left: horizontalScale(3),
        height: TABLIST_HEIGHT - 2 * verticalScale(3),
        borderRadius: 99,
    },
    listContent: {
        height: "100%",
        paddingVertical: 3,
        flexDirection: "row",
        gap: horizontalScale(0),
        alignItems: "center",
    },
    reItems: {
        paddingHorizontal: spaces.globalPadding,
    },
    tab: {
        marginHorizontal: horizontalScale(3),
        flex: 1,
        height: "100%",
        justifyContent: "center",
        borderRadius: 99,
        paddingHorizontal: 0,
        borderColor: "gray",
        alignItems: "center",
    },
    main: {
        gap: verticalScale(5),
    },
    seperator: { height: "60%", width: 1, backgroundColor: "black" },
});
