import { Button, ReCard, SearchBar, UIText } from "@/components";
import { heights, RealEstateItemData } from "@/constants";
import { useAppSelector } from "@/store/hooks";
import {
    fontSize,
    HEIGHT_SCREEN,
    horizontalScale,
    SelectableOptions,
    SelectOptions,
    verticalScale,
    WIDTH_SCREEN,
} from "@/utils";
import React, { useEffect, useState } from "react";
import { FlatList, LayoutChangeEvent, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

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

interface ListItemRenderProps {
    renderData: RealEstateItemData[];
    height: number;
}

const ListItemRender = React.memo(
    ({ renderData, height }: ListItemRenderProps) => {
        return (
            <FlatList
                contentContainerStyle={{
                    paddingBottom: verticalScale(10),
                }}
                style={{
                    paddingRight: horizontalScale(10),
                    height: height,
                }}
                data={renderData}
                numColumns={2}
                columnWrapperStyle={styles.column}
                renderItem={({ item, index }) => (
                    <React.Fragment key={index}>
                        <ReCard small={true} data={item} />
                    </React.Fragment>
                )}
            />
        );
    }
);

export const Lease = () => {
    const fSize = fontSize(14);
    const Colors = useAppSelector((state) => state.theme.palette);
    const [ButtonListH, setButtonListH] = useState<number>(0);
    const handleLayout = (event: LayoutChangeEvent) => {
        const { height } = event.nativeEvent.layout;
        setButtonListH(height);
    };

    const [initData, setInitData] = useState<RealEstateItemData[]>(DATA);
    const [renderData, setRenderData] =
        useState<RealEstateItemData[]>(initData);
    const [sortOptions, setSortOptions] = useState("");
    const [filterOptions, setFilterOptions] = useState("");
    const handleSort = (data: RealEstateItemData[]) => {
        if (sortOptions === "name") {
            return [...data].sort((a, b) => a.name.localeCompare(b.name));
        } else if (sortOptions === "price") {
            return [...data].sort((a, b) => a.price - b.price);
        } else if (sortOptions === "investors") {
            return [...data].sort((a, b) => a.investors - b.investors);
        } else if (sortOptions === "totalTokens") {
            return [...data].sort((a, b) => a.totalTokens - b.totalTokens);
        }
        return data;
    };

    const handleFilter = () => {
        if (filterOptions) {
            return DATA.filter((item) => item.type === filterOptions);
        } else {
            return DATA;
        }
    };

    const FLATLIST_HEIGHT =
        HEIGHT_SCREEN -
        heights.STATUS_BAR -
        heights.BOTNAV * 2.5 -
        verticalScale(10) -
        verticalScale(51) -
        ButtonListH;

    useEffect(() => {
        let filteredData = handleFilter();
        let sortedData = handleSort(filteredData);
        setInitData(sortedData);
    }, [sortOptions, filterOptions]);

    useEffect(() => {
        setRenderData(initData);
    }, [initData]);

    return (
        <View>
            <View style={[styles.header, { backgroundColor: Colors.BG_MAIN }]}>
                <UIText value="Thuê" fWeight={"bold"} fSize={fSize + 10} />
            </View>
            <View style={styles.util}>
                <SearchBar setWidth={"100%"} />
                <View onLayout={handleLayout}>
                    <ButtonList
                        setSortOptions={setSortOptions}
                        setFilterOptions={setFilterOptions}
                    />
                </View>
            </View>
            <View style={styles.content}>
                <ListItemRender renderData={renderData} height={FLATLIST_HEIGHT} />
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
    util: {
        paddingHorizontal: horizontalScale(10),
    },
    content: {
        paddingLeft: horizontalScale(10),
    },
    column: {
        gap: 10,
        paddingVertical: verticalScale(5),
    },
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
