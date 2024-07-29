import { Button } from "@/components/button";
import { LongCard } from "@/components/card/LongCard";
import { UIText } from "@/components/text";
import { defStyles, weight } from "@/constants";
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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RealEstateItemData } from "@/constants/types";
import client, { GET_REDATA, GET_TOKEN_INFO } from "@/client";
import { login } from "@/store/auth";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchReData } from "@/store/redata";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

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
    const indicatorPos = useSharedValue(0);
    const TAB_WIDTH =
        (WIDTH_SCREEN -
            horizontalScale(10) * 2 /* margin of 2 sides */ -
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
            { key: "villa", label: "Villa" },
            { key: "estate", label: "Estate" },
            { key: "hall", label: "Hall" },
            { key: "house", label: "House" },
            { key: null, label: "None" },
        ]);

        const [sortOptions] = useState<SelectableOptions[]>([
            { key: "name", label: "Name" },
            { key: "totalTokens", label: "Total Tokens" },
            { key: "price", label: "Price" },
            { key: "investors", label: "Investors" },
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
                    title="Sort"
                    icon="SORT"
                    onPress={handleSortPress}
                />
                <SelectOptions
                    name="Sort"
                    options={sortOptions}
                    visible={sortModal}
                    toggleVisible={handleSortPress}
                    setReturnValue={setSortOptions}
                />
                <Button.Util
                    title="Filter"
                    icon="FILTER"
                    onPress={handleFilterPress}
                />
                <SelectOptions
                    name="Filter"
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
    const [tabOn, setTabOn] = useState(0);
    const scrollRef = useRef<FlatList>(null);
    const dispatch = useAppDispatch();
    // async function fetchData() {
    //     try {
    //       const response = await client.query({
    //         query: GET_REDATA
    //       });
    //       console.log(response.data);
    //     } catch (error) {
    //       console.error("Error fetching data: ", error);
    //     }
    //   }
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const [ButtonListH, setButtonListH] = useState<number>(0);
    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setButtonListH(height);
    };
    const [initData, setInitData] = useState<RealEstateItemData[]>(DATA);
    const [renderData, setRenderData] =
        useState<RealEstateItemData[]>(initData);
    const [sortByOption, setSortByOption] = useState("name");
    const [filterByOption, setFilterByOption] = useState<any>(null);
    const handleTab = (data: RealEstateItemData[]) => {
        if (tabOn == 0) {
            return [...data].filter((item) => item.status == "ongoing");
        } else if (tabOn == 1) {
            return [...data].filter((item) => item.status == "waiting");
        } else if (tabOn == 2) {
            return [...data].filter((item) => item.status == "finished");
        }
        else return data
    };

    const handleSort = (data: RealEstateItemData[]) => {
        if (sortByOption === "name") {
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortByOption === "price") {
            return [...data].sort((a, b) => a.price - b.price);
        } else if (sortByOption === "investors") {
            return [...data].sort((a, b) => a.investors - b.investors);
        } else if (sortByOption === "totalTokens") {
            return [...data].sort((a, b) => a.totalTokens - b.totalTokens);
        }
        else return data
    };

    const handleFilter = () => {
        if (filterByOption) {
            return DATA.filter((item) => item.type == filterByOption);
        } else return DATA;
    };

    const handleRef = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollToOffset({ animated: true, offset: 0 });
        }
    };

    useEffect(() => {
        setRenderData(handleTab(initData))
        handleRef();
    }, [tabOn, initData]);

    useEffect(() => {
        let filteredData = handleFilter()
        let sortedData = handleSort(filteredData);
        setInitData(sortedData);
    }, [sortByOption, filterByOption]);

    return (
        <View style={[styles.container, { backgroundColor: Colors.MAIN }]}>
            <View style={[styles.header, { backgroundColor: Colors.BG_MAIN }]}>
                <UIText value="Phát Hành" fWeight={"bold"} fSize={fSize + 10} />
            </View>
            <SectionBar tabOn={tabOn} setTabOn={setTabOn} setRef={handleRef} />
            <View style={styles.main}>
                <View onLayout={handleLayout}>
                    <ButtonList
                        setFilterOptions={setFilterByOption}
                        setSortOptions={setSortByOption}
                    />
                </View>
                <FlatList
                    ref={scrollRef}
                    style={[
                        styles.reItems,
                        {
                            height:
                                HEIGHT_SCREEN - //Full screen height
                                heights.STATUS_BAR - //status bar height
                                TABLIST_HEIGHT - //<TabList />
                                heights.BOTNAV * 2.5 - //bottom navigator height + header height
                                verticalScale(10) - //margin bottom of header
                                ButtonListH, //<ButtonList />
                        },
                    ]}
                    // showsVerticalScrollIndicator={false}
                    data={renderData}
                    renderItem={({ item, index }) => (
                        <React.Fragment key={index}>
                            <LongCard
                            containerStyle={[{
                                marginBottom: verticalScale(10)
                            }, defStyles.shadowBox]}
                            data={item}
                        />
                        </React.Fragment>
                    )}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        justifyContent: "center",
        height: heights.BOTNAV * 1.5,
        paddingHorizontal: horizontalScale(10),
        marginBottom: verticalScale(10),
    },
    tabList: {
        height: TABLIST_HEIGHT,
        marginHorizontal: horizontalScale(10),
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
        paddingRight: horizontalScale(10),
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
        paddingLeft: horizontalScale(10),
    },
    seperator: { height: "60%", width: 1, backgroundColor: "black" },
});

const DATA: RealEstateItemData[] = [
    {
        status: "ongoing",
        type: "villa",
        name: "Maple House",
        location: "123 Maple Street, Springfield",
        totalTokens: 1000,
        boughtTokens: 467,
        price: 582.47,
        image: {
            uri: "https://example.com/images/maple_house.jpg",
        },
        investors: 15,
    },
    {
        status: "ongoing",
        type: "villa",
        name: "Birch Villa",
        location: "321 Birch Avenue, Rivertown",
        totalTokens: 1200,
        boughtTokens: 948,
        price: 780.99,
        image: {
            uri: "https://example.com/images/birch_villa.jpg",
        },
        investors: 20,
    },
    {
        status: "waiting",
        type: "villa",
        name: "Cedar Villa",
        location: "123 Cedar Lane, Bay City",
        totalTokens: 1000,
        boughtTokens: 467,
        price: 582.47,
        image: {
            uri: "https://example.com/images/cedar_villa.jpg",
        },
        investors: 15,
    },
    {
        status: "finished",
        type: "villa",
        name: "Oak Villa",
        location: "654 Oak Drive, Woodtown",
        totalTokens: 900,
        boughtTokens: 823,
        price: 725.5,
        image: {
            uri: "https://example.com/images/oak_villa.jpg",
        },
        investors: 25,
    },
    {
        status: "ongoing",
        type: "estate",
        name: "Spruce Estate",
        location: "951 Spruce Lane, Meadowbrook",
        totalTokens: 1300,
        boughtTokens: 481,
        price: 560.89,
        image: {
            uri: "https://example.com/images/spruce_estate.jpg",
        },
        investors: 17,
    },
    {
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
    },
    {
        status: "waiting",
        type: "estate",
        name: "Willow Estate",
        location: "654 Willow Drive, Oldtown",
        totalTokens: 800,
        boughtTokens: 332,
        price: 242.67,
        image: {
            uri: "https://example.com/images/willow_estate.jpg",
        },
        investors: 10,
    },
    {
        status: "ongoing",
        type: "estate",
        name: "Pine Estate",
        location: "789 Pine Lane, Greenfield",
        totalTokens: 1200,
        boughtTokens: 948,
        price: 780.99,
        image: {
            uri: "https://example.com/images/pine_estate.jpg",
        },
        investors: 20,
    },
    {
        status: "ongoing",
        type: "hall",
        name: "Aspen Hall",
        location: "159 Aspen Way, Hilltop",
        totalTokens: 1100,
        boughtTokens: 530,
        price: 611.34,
        image: {
            uri: "https://example.com/images/aspen_hall.jpg",
        },
        investors: 18,
    },
    {
        status: "ongoing",
        type: "hall",
        name: "Maple Hall",
        location: "159 Maple Way, Hilltop",
        totalTokens: 1100,
        boughtTokens: 530,
        price: 611.34,
        image: {
            uri: "https://example.com/images/maple_hall.jpg",
        },
        investors: 18,
    },
    {
        status: "waiting",
        type: "hall",
        name: "Elm Hall",
        location: "951 Elm Street, Meadowbrook",
        totalTokens: 1300,
        boughtTokens: 481,
        price: 560.89,
        image: {
            uri: "https://example.com/images/elm_hall.jpg",
        },
        investors: 17,
    },
    {
        status: "finished",
        type: "hall",
        name: "Cedar Hall",
        location: "123 Cedar Lane, Bay City",
        totalTokens: 1000,
        boughtTokens: 467,
        price: 582.47,
        image: {
            uri: "https://example.com/images/cedar_hall.jpg",
        },
        investors: 15,
    },
    {
        status: "waiting",
        type: "house",
        name: "Hawthorn House",
        location: "357 Hawthorn Circle, Riverbend",
        totalTokens: 1200,
        boughtTokens: 623,
        price: 720.45,
        image: {
            uri: "https://example.com/images/hawthorn_house.jpg",
        },
        investors: 21,
    },
    {
        status: "waiting",
        type: "house",
        name: "Cedar House",
        location: "987 Cedar Boulevard, Bay City",
        totalTokens: 600,
        boughtTokens: 156,
        price: 489.01,
        image: {
            uri: "https://example.com/images/cedar_house.jpg",
        },
        investors: 12,
    },
    {
        status: "finished",
        type: "house",
        name: "Aspen House",
        location: "456 Aspen Road, Lakeside",
        totalTokens: 1000,
        boughtTokens: 723,
        price: 354.22,
        image: {
            uri: "https://example.com/images/aspen_house.jpg",
        },
        investors: 23,
    },
    {
        status: "ongoing",
        type: "house",
        name: "Birch House",
        location: "321 Birch Avenue, Rivertown",
        totalTokens: 1200,
        boughtTokens: 948,
        price: 780.99,
        image: {
            uri: "https://example.com/images/birch_house.jpg",
        },
        investors: 20,
    },
];
