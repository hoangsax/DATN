// src/screens/SettingsScreen.tsx
import { GET_USER } from "@/client";
import { ReCard } from "@/components/card/ReCard";
import { SearchBar } from "@/components/input";
import { RootState } from "@/store";
import { useQuery } from "@apollo/react-hooks";
import React, { useState } from "react";
import {
    View,
    Text,
    StyleSheet,
    Image,
    ScrollView,
    TouchableOpacity,
    FlatList,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import {
    fontSize,
    horizontalScale,
    verticalScale,
    WIDTH_SCREEN,
} from "@/utils";
import Button from "../../components/button/Button";
import { defStyles, heights, icons } from "@/constants";
import { LongCard } from "@/components/card/LongCard";
import { RealEstateItemData } from "@/constants";
import { ReItem, Tab } from "@/components";
import { spaces } from "@/constants/space.const";

const globalPadding = spaces.globalPadding

const fakeRealEstateData: RealEstateItemData[] = [
    {
        status: "ongoing",
        type: "Apartment",
        name: "Luxury Sky Tower",
        location: "District 1, Ho Chi Minh City",
        totalTokens: 1000,
        boughtTokens: 750,
        price: 2500000000,
        image: require("@/assets/images/recard_default.jpg"), // Đảm bảo hình ảnh này tồn tại
        investors: 120,
    },
    {
        status: "waiting",
        type: "Villa",
        name: "Seaside Paradise Villa",
        location: "Nha Trang, Khanh Hoa",
        totalTokens: 500,
        boughtTokens: 0,
        price: 5000000000,
        image: require("@/assets/images/recard_default.jpg"), // Đảm bảo hình ảnh này tồn tại
        investors: 0,
    },
    {
        status: "waiting",
        type: "Office",
        name: "Central Business Hub",
        location: "District 3, Ho Chi Minh City",
        totalTokens: 2000,
        boughtTokens: 1500,
        price: 3000000000,
        image: require("@/assets/images/recard_default.jpg"), // Đảm bảo hình ảnh này tồn tại
        investors: 80,
    },
];

export interface userData {
    avatar: any;
}

interface HomeScreenProps {
    onPress?: () => void;
    onSort?: () => void;
    data?: userData;
}

const userData = {
    avatar: require("@/assets/images/avatar_user.png"),
};

export const HomeScreen = ({ onPress, onSort }: HomeScreenProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette);
    const user = useSelector((state: RootState) => state.auth.user);
    const reData: [] = useSelector((state: RootState) => state.data.returnData).slice(0,3);
    const dispatch = useDispatch();

    const numberOfReCards = 5;
    const numberOfLongCards = 3;
    const Recards = Array.from(
        { length: numberOfReCards },
        (_, index) => index + 1
    );
    const Longcards = Array.from(
        { length: numberOfLongCards },
        (_, index) => index + 1
    );

    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleButtonPress = (buttonTitle: string) => {
        if (selectedButton === buttonTitle) {
            setSelectedButton(null);
        } else {
            setSelectedButton(buttonTitle);
        }
    };

    const buttonTitles = [
        "Recommended",
        "Top Rates",
        "Best Offers",
        "Most View",
    ];
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            style={[styles.container, { backgroundColor: colors.MAIN }]}
        >
            <View style={[styles.title]}>
                <View>
                    <Text style={[styles.titlel1, defStyles.shadowBox]}>Let's Find Your </Text>
                    <Text style={[styles.titlel2, defStyles.shadowBox]}>Ideal Investment </Text>
                </View>
                <Image
                    resizeMode="contain"
                    style={styles.img}
                    source={user? {uri: user.avatar} : userData.avatar}
                />
            </View>

            <View style={styles.search}>
                <View
                    style={{
                        width:
                            WIDTH_SCREEN -
                            globalPadding * 2 - // Padding screen width
                            heights.ICONSMALL - //icon size
                            horizontalScale(10) * 3, // icon padding + gap between icon and search bar,
                    }}
                >
                    <SearchBar setWidth={"100%"} />
                </View>
                <View style={styles.button}>
                    <Button.Icon
                        icon={icons.SORT}
                        size="small"
                        radius={10}
                        onPress={onSort}
                    />
                </View>
            </View>

            <FlatList
            contentContainerStyle={{paddingLeft: globalPadding}}
                style={styles.buttonSort}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={buttonTitles}
                renderItem={({ item, index }) => (
                    <React.Fragment>
                        <Tab
                            key={index}
                            title={item}
                            onPress={() => handleButtonPress(item)}
                            active={false}
                        />
                        <View style={{ width: horizontalScale(10) }} />
                    </React.Fragment>
                )}
            />
            <FlatList
            contentContainerStyle={{
                paddingLeft: globalPadding,}}
                style={styles.scrollView}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                data={Recards}
                renderItem={({ item, index }) => (
                    <View key={index} style={styles.cardContainer}>
                        <ReCard />
                    </View>
                )}
            />
            <View style={styles.reItems}>
                <View style={styles.subtitle}>
                    <Text style={styles.titlel2}>Gần bạn</Text>
                    <TouchableOpacity>
                        <Text style={styles.buttonmore}>Thêm</Text>
                    </TouchableOpacity>
                </View>
                {reData.map((item, index) => (
                    <React.Fragment key={index}>
                        <ReItem data={item} onPress={() => {}} />
                        <View style={{ height: verticalScale(10) }} />
                    </React.Fragment>
                ))}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        paddingHorizontal: globalPadding,
        paddingTop: verticalScale(25),
        paddingBottom: verticalScale(10),
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    subtitle: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    titlel1: {
        fontSize: fontSize(18),
        fontWeight: "400",
        color: "#8997A9",
    },
    titlel2: {
        fontSize: fontSize(20),
        fontWeight: "bold",
        paddingVertical: verticalScale(5),
    },
    img: {
        height: verticalScale(60),
        width: horizontalScale(60),
        borderWidth: 0.5,
        borderRadius: 99,
    },
    scrollView: {
        paddingBottom: verticalScale(10),
    },
    cardContainer: {
        marginRight: horizontalScale(10),
    },
    VecardContainer: {
        // paddingTop: verticalScale(25),
        paddingHorizontal: horizontalScale(10),
    },
    search: {
        padding: globalPadding,
        flexDirection: "row",
        paddingTop: verticalScale(25),
        alignItems: "center",
    },
    button: {
        paddingLeft: horizontalScale(10),
    },
    buttonSort: {
        flexDirection: "row",
        paddingBottom: verticalScale(10),
    },
    buttonmore: {
        fontSize: fontSize(14),
        fontWeight: "600",
        color: "#989898",
    },
    reItems: { paddingHorizontal: globalPadding },
});

export default HomeScreen;
