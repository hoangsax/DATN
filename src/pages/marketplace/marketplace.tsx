import { Button, SearchBar, TradeCard, UIText } from "@/components";
import { LongCard } from "@/components/card/LongCard";
import {
    MarketPlaceItemData,
    RealEstateItemData,
    heights,
    images,
} from "@/constants";
import { useAppSelector } from "@/store/hooks";
import { fontSize, horizontalScale, SelectableOptions, SelectOptions, verticalScale, WIDTH_SCREEN } from "@/utils";
import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

const DATA: MarketPlaceItemData = {
    image: images.LOGO,
    name: "No 1",
    type: "villa",
    totalTokens: 2000,
    revenuePercents: 15,
    totalTradingValue: 3000,
    owners: 10,
    location: "lorem ipsum dolor sit amet",
    averageTradePerWeek: 720,
};

interface ButtonListProps {
    setSortOptions: (value: any) => void;
    setFilterOptions: (value: any) => void;
}

const ButtonList = React.memo(({
    setSortOptions,
    setFilterOptions
}: ButtonListProps) => {
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
        <View
            style={[
                bstyles.container,
            ]}
        >
            <Button.Util title="Sort" icon="SORT" onPress={handleSortPress} />
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
})

export const MarketPlace = () => {
    const fSize = fontSize(14);
    const Colors = useAppSelector((state) => state.theme.palette);
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingHorizontal: horizontalScale(10),
            backgroundColor: Colors.MAIN
        },
        header: {
            justifyContent: "center",
            alignItems: "center",
            height: heights.BOTNAV,
            paddingLeft: horizontalScale(10),
        },
        content: {
            alignItems: "center",

        }
    });

    const [sortOptions, setSortOptions] = useState('')
    const [filterOptions, setFilterOptions] = useState('')

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <UIText value="Giao Dịch" fWeight={"bold"} fSize={fSize + 6} />
            </View>
            <View>
                <SearchBar setWidth={'100%'} />
                <ButtonList setSortOptions={setSortOptions} setFilterOptions={setFilterOptions} />
            </View>
            <View style={styles.content}>
                <FlatList
                style={{paddingBottom: verticalScale(10)}}
                horizontal={true}
                    data={DEFAULT_DATA}
                    renderItem={({item}) => (<View style={{paddingHorizontal: (WIDTH_SCREEN * 7.5) / 80}}><TradeCard dataItem={item} /></View>)}
                />
            </View>
        </View>
    );
};

const DEFAULT_DATA: MarketPlaceItemData[] = [
    {
      image: { uri: "https://example.com/image1.jpg" },
      name: "Oceanfront Villa",
      type: "villa",
      totalTokens: 5000,
      revenuePercents: 7.5,
      totalTradingValue: 9875,
      averageTradePerWeek: 30000,
      owners: 120,
      location: "Malibu, CA"
    },
    {
      image: { uri: "https://example.com/image2.jpg" },
      name: "Mountain Estate",
      type: "estate",
      totalTokens: 10000,
      revenuePercents: 8.0,
      totalTradingValue: 9250,
      averageTradePerWeek: 50000,
      owners: 200,
      location: "Aspen, CO"
    },
    {
      image: { uri: "https://example.com/image3.jpg" },
      name: "Grand Hall",
      type: "hall",
      totalTokens: 3000,
      revenuePercents: 6.5,
      totalTradingValue: 8765,
      averageTradePerWeek: 25000,
      owners: 90,
      location: "New York, NY"
    },
    {
      image: { uri: "https://example.com/image4.jpg" },
      name: "Suburban House",
      type: "house",
      totalTokens: 1500,
      revenuePercents: 5.5,
      totalTradingValue: 7590,
      averageTradePerWeek: 15000,
      owners: 45,
      location: "San Francisco, CA"
    },
    {
      image: { uri: "https://example.com/image5.jpg" },
      name: "Beachside Villa",
      type: "villa",
      totalTokens: 6000,
      revenuePercents: 7.0,
      totalTradingValue: 9120,
      averageTradePerWeek: 35000,
      owners: 130,
      location: "Miami, FL"
    },
    {
      image: { uri: "https://example.com/image6.jpg" },
      name: "Historic Estate",
      type: "estate",
      totalTokens: 8000,
      revenuePercents: 8.5,
      totalTradingValue: 8530,
      averageTradePerWeek: 45000,
      owners: 180,
      location: "Charleston, SC"
    },
    {
      image: { uri: "https://example.com/image7.jpg" },
      name: "Event Hall",
      type: "hall",
      totalTokens: 3500,
      revenuePercents: 6.0,
      totalTradingValue: 7999,
      averageTradePerWeek: 28000,
      owners: 95,
      location: "Los Angeles, CA"
    },
    {
      image: { uri: "https://example.com/image8.jpg" },
      name: "Luxury House",
      type: "house",
      totalTokens: 1800,
      revenuePercents: 6.2,
      totalTradingValue: 6890,
      averageTradePerWeek: 18000,
      owners: 50,
      location: "Seattle, WA"
    },
    {
      image: { uri: "https://example.com/image9.jpg" },
      name: "Countryside Villa",
      type: "villa",
      totalTokens: 5500,
      revenuePercents: 7.8,
      totalTradingValue: 9520,
      averageTradePerWeek: 32000,
      owners: 125,
      location: "Napa Valley, CA"
    },
    {
      image: { uri: "https://example.com/image10.jpg" },
      name: "Rural Estate",
      type: "estate",
      totalTokens: 7000,
      revenuePercents: 8.3,
      totalTradingValue: 8999,
      averageTradePerWeek: 42000,
      owners: 170,
      location: "Vermont"
    },
    {
      image: { uri: "https://example.com/image11.jpg" },
      name: "Conference Hall",
      type: "hall",
      totalTokens: 4000,
      revenuePercents: 6.7,
      totalTradingValue: 8390,
      averageTradePerWeek: 30000,
      owners: 100,
      location: "Chicago, IL"
    },
    {
      image: { uri: "https://example.com/image12.jpg" },
      name: "Modern House",
      type: "house",
      totalTokens: 2000,
      revenuePercents: 6.0,
      totalTradingValue: 7790,
      averageTradePerWeek: 20000,
      owners: 55,
      location: "Austin, TX"
    }
  ]
  
  
  