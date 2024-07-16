import { StyleSheet, View, ScrollView, Text, FlatList } from "react-native";
import React, { useRef } from "react";
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import { FuntionList } from "./components";
import { TouchableOpacity } from "react-native";
import {
    HotProject,
    PromotionBanner,
    RealEstateItem,
    RecommendItem,
} from "./components";
import { NavigationProp } from "@react-navigation/native";
import { icons, screens } from "@/constants";
import { SvgXml } from "react-native-svg";
import { UIText } from "@/components";
import HeaderSearch from "@/components/input/HeaderSearch";
import { RealEstateItemData } from "../../constants/types";

type HomenPageProps = {
    navigation: NavigationProp<any>;
};

const RealEstateForYou = () => {
    const data: RealEstateItemData[] = [
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
    ];
    return (
        <View>
            <TouchableOpacity style={styles.containerLabel}>
                <UIText value="Dành cho bạn" style={styles.textLabel} />
                <SvgXml xml={icons.FORWARD} />
            </TouchableOpacity>
            <FlatList
                contentContainerStyle={styles.containerItemList}
                horizontal={true}
                data={data}
                renderItem={({ item }) => <RealEstateItem data={item} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const HotRealEstateList = () => {
    const data: RealEstateItemData[] = [
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
    ];
    return (
        <View>
            <TouchableOpacity style={styles.containerLabel}>
                <UIText value={"re_hot"} style={styles.textLabel} />
                <SvgXml xml={icons.FORWARD} />
            </TouchableOpacity>
            <FlatList
                contentContainerStyle={styles.containerItemList}
                horizontal={true}
                data={data}
                renderItem={({ item }) => <RealEstateItem data={item} />}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );
};

const NearbyRealEstateList = () => {
    const currentLocation = "Hồ Chí Minh";

    const data = [
        { id: 1, value: { title: "recommended", count: 45 } },
        { id: 2, value: { title: "new_list", count: 40 } },
        { id: 3, value: { title: "recently_sold", count: 40 } },
    ];

    return (
        <View>
            <TouchableOpacity style={styles.containerLabel}>
                <UIText style={styles.textLabel} value={currentLocation} />
                <SvgXml xml={icons.FORWARD} />
            </TouchableOpacity>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.containerItemList}
            >
                {data.map((item) => (
                    <View key={item.id} style={styles.containerItem}>
                        <RecommendItem data={item.value} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const HotProjectList = () => {
    const data = [
        {
            id: 1,
            value: {
                title: "Aquala City",
                address: "Quận 5, Hồ Chí Minh",
                square: 10.3,
            },
        },
        {
            id: 2,
            value: {
                title: "Aquala City",
                address: "Quận 5, Hồ Chí Minh",
                square: 5.23,
            },
        },
        {
            id: 3,
            value: {
                title: "Aquala City",
                address: "Quận 5, Hồ Chí Minh",
                square: 3.2,
            },
        },
    ];
    return (
        <View>
            <TouchableOpacity style={styles.containerLabel}>
                <UIText style={styles.textLabel} value={"re_hot"} />
                <SvgXml xml={icons.FORWARD} />
            </TouchableOpacity>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.containerItemList}
            >
                {data.map((item) => (
                    <View key={item.id} style={styles.containerItem}>
                        <HotProject data={item.value} />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

const PromotionBannerList = () => {
    const data = [{ id: 1 }, { id: 2 }, { id: 3 }];
    return (
        <View>
            <TouchableOpacity style={styles.containerLabel}>
                <UIText style={styles.textLabel} value={"now_promotion"} />
                <SvgXml xml={icons.FORWARD} />
            </TouchableOpacity>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.containerItemList}
            >
                {data.map((item) => (
                    <View key={item.id} style={styles.containerItem}>
                        <PromotionBanner />
                    </View>
                ))}
            </ScrollView>
        </View>
    );
};

export const HomeScreen = ({ navigation }: HomenPageProps) => {
    const onPressSell = () => {
        navigation.navigate(screens.PROJECT);
    };

    return (
        <View style={styles.container}>
            <HeaderSearch navigation={navigation} />
            <ScrollView
                style={styles.body}
                showsVerticalScrollIndicator={false}
            >
                <View style={styles.containerFuntion}>
                    <FuntionList
                        icon={icons.GOOGLE}
                        title="Mua"
                        onPress={() => {}}
                    />
                    <FuntionList
                        icon={icons.GOOGLE}
                        title="Bán"
                        onPress={() => {}}
                    />
                    <FuntionList
                        icon={icons.GOOGLE}
                        title="Thuê"
                        onPress={() => {}}
                    />
                </View>
                <RealEstateForYou />
                <HotRealEstateList />
                <NearbyRealEstateList />
                <HotProjectList />
                <PromotionBannerList />
            </ScrollView>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    body: {
        flex: 1,
    },
    containerFuntion: {
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: horizontalScale(40),
        paddingTop: verticalScale(23),
    },
    containerLabel: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: verticalScale(22),
        paddingLeft: horizontalScale(16),
        paddingRight: horizontalScale(10),
    },
    containerItemList: {
        marginTop: verticalScale(14),
        paddingHorizontal: horizontalScale(12),
        paddingBottom: verticalScale(5),
        gap: horizontalScale(10),
    },
    containerItem: {
        marginRight: horizontalScale(10),
        paddingBottom: horizontalScale(5),
    },
    textLabel: {
        fontSize: fontSize(16),
        color: "gray900",
        fontWeight: "500",
    },
});
