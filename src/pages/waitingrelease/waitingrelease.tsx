import { Button } from "@/components/button";
import { LongCard, REData } from "@/components/card/LongCard";
import { UIText } from "@/components/text";
import { weight } from "@/constants";
import { heights } from "@/constants/heights.const";
import { RootState } from "@/store";
import {
    HEIGHT_SCREEN,
    Sorting,
    fontSize,
    horizontalScale,
    verticalScale,
} from "@/utils";
import React, { useEffect, useRef, useState } from "react";
import {
    FlatList,
    LayoutChangeEvent,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View,
} from "react-native";
import { useSelector } from "react-redux";

interface SectionBarProps {
    tabOn: number;
    setTabOn: (num: number) => void;
}

const SectionBar = ({ tabOn, setTabOn }: SectionBarProps) => {
    const fSize = fontSize(14);

    return (
        <View style={[styles.tabList]}>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.listContent}
            >
                <TouchableOpacity
                    style={[
                        styles.tab,
                        {
                            borderBottomWidth: tabOn == 0 ? 1 : 0,
                            paddingVertical: fSize + 1,
                        },
                    ]}
                    onPress={() => setTabOn(0)}
                >
                    <UIText
                        value="Đang phát hành"
                        fSize={fSize}
                        fWeight={tabOn == 0 ? weight.bold : "normal"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        {
                            borderBottomWidth: tabOn == 1 ? 1 : 0,
                            paddingVertical: fSize + 1,
                        },
                    ]}
                    onPress={() => setTabOn(1)}
                >
                    <UIText
                        value="Chờ phát hành"
                        fSize={fSize}
                        fWeight={tabOn == 1 ? weight.bold : "normal"}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    style={[
                        styles.tab,
                        {
                            borderBottomWidth: tabOn == 2 ? 1 : 0,
                            paddingVertical: fSize + 1,
                        },
                    ]}
                    onPress={() => setTabOn(2)}
                >
                    <UIText
                        value="Đã phát hành"
                        fSize={fSize}
                        fWeight={tabOn == 2 ? weight.bold : "normal"}
                    />
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
};

interface ButtonListProps {
    sortOptions: string;
    setSortOptions: (value: any) => void;
    reRender?: () => void;
}

const ButtonList = ({
    sortOptions,
    setSortOptions,
    reRender,
}: ButtonListProps) => {
    const bstyles = StyleSheet.create({
        container: {
            flexDirection: "row",
            gap: horizontalScale(10),
            paddingVertical: verticalScale(10),
        },
    });

    const [sortModal, setSortModal] = useState(false);
    const [filterModal, setFilterModal] = useState(false);

    const handleSortPress = () => {
        setSortModal((prev) => !prev);
        reRender && reRender();
    };

    return (
        <View style={[bstyles.container, {backgroundColor: sortModal? 'red' : 'white'}]}>
            <Button.Util
                title="Sort"
                icon="SORT"
                onPress={() => handleSortPress()}
            />
            <Sorting
                visible={sortModal}
                onPress={() => handleSortPress()}
                sortBy={setSortOptions}
            />
            <Button.Util title="Filter" icon="FILTER" />
        </View>
    );
};

export const Waitingrelease = () => {
    const [tabOn, setTabOn] = useState(0);
    const scrollRef = useRef(null);

    const Colors = useSelector((state: RootState) => state.theme.palette);
    const [ButtonListH, setButtonListH] = useState<number>(0);
    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setButtonListH(height);
    };
    const [initData, setInitData] = useState<REData[]>(DATA);
    const [renderData, setRenderData] = useState<REData[]>(initData);
    const [sortByOption, setSortByOption] = useState("name");
    const [loading, setLoading] = useState(false);
    const handleTab = () => {
        if (tabOn == 0) {
            setRenderData(initData.filter((item) => item.status == "ongoing"));
        } else if (tabOn == 1) {
            setRenderData(initData.filter((item) => item.status == "waiting"));
        } else if (tabOn == 2) {
            setRenderData(initData.filter((item) => item.status == "finished"));
        }
    };

    const handleSort = () => {
        if (sortByOption === "name") {
            initData.sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortByOption === "price") {
            initData.sort((a, b) => a.price - b.price);
        } else if (sortByOption === "investors") {
            initData.sort((a, b) => a.investors - b.investors);
        }
        else if (sortByOption === "totalTokens") {
            initData.sort((a, b) => a.investors - b.investors);
        }
    };
    useEffect(() => {
        handleSort(); //sort before filter
        handleTab();
        console.log('noHope')
    }, [tabOn, sortByOption, initData]);

    return (
        <View style={[styles.container, { backgroundColor: Colors.MAIN }]}>
            <SectionBar tabOn={tabOn} setTabOn={setTabOn} />
            <View style={styles.line} />
            <View style={styles.main}>
                <View onLayout={handleLayout}>
                    <ButtonList
                        sortOptions={sortByOption}
                        setSortOptions={setSortByOption}
                        reRender={() => handleSort()}
                    />
                </View>
                <FlatList
                    style={[
                        styles.reItems,
                        {
                            height:
                                HEIGHT_SCREEN - //Full screen height
                                heights.STATUS_BAR - //status bar height
                                verticalScale(50) - //<TabList />
                                heights.BOTNAV - //bottom navigator height
                                ButtonListH, //<ButtonList />
                        },
                    ]}
                    // showsVerticalScrollIndicator={false}
                    data={renderData}
                    renderItem={({ item, index }) => (
                        <LongCard
                            ratio={(index * 10) / 100}
                            containerStyle={{
                                marginBottom: horizontalScale(10),
                            }}
                            data={item}
                        />
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
    tabList: {
        height: verticalScale(50),
        paddingHorizontal: horizontalScale(10),
    },
    listContent: {
        gap: horizontalScale(10),
        alignItems: "center",
    },
    reItems: {
        gap: verticalScale(10),
        paddingRight: horizontalScale(10),
    },
    tab: {
        paddingHorizontal: 0,
        borderColor: "gray",
    },
    line: {
        height: 1,
        width: "auto",
        backgroundColor: "lightgray",
    },
    main: {
        paddingLeft: horizontalScale(10),
    },
});

const DATA: REData[] = [
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
        status: "finished",
        type: "lodge",
        name: "Pine Lodge",
        location: "456 Pine Road, Lakeside",
        totalTokens: 1000,
        boughtTokens: 723,
        price: 354.22,
        image: {
            uri: "https://example.com/images/pine_lodge.jpg",
        },
        investors: 23,
    },
    {
        status: "waiting",
        type: "cottage",
        name: "Oak Cottage",
        location: "789 Oak Lane, Greenfield",
        totalTokens: 200,
        boughtTokens: 85,
        price: 130.88,
        image: {
            uri: "https://example.com/images/oak_cottage.jpg",
        },
        investors: 8,
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
        status: "finished",
        type: "manor",
        name: "Willow Manor",
        location: "654 Willow Drive, Oldtown",
        totalTokens: 800,
        boughtTokens: 332,
        price: 242.67,
        image: {
            uri: "https://example.com/images/willow_manor.jpg",
        },
        investors: 10,
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
        status: "finished",
        type: "residence",
        name: "Elm Residence",
        location: "753 Elm Street, Maplewood",
        totalTokens: 900,
        boughtTokens: 294,
        price: 399.77,
        image: {
            uri: "https://example.com/images/elm_residence.jpg",
        },
        investors: 14,
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
];
