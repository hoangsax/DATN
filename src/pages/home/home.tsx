// src/screens/SettingsScreen.tsx
import { GET_USER } from '@/client';
import { ReCard } from '@/components/card/ReCard';
import { SearchBar } from '@/components/input';
import { RootState } from '@/store';
import { useQuery } from '@apollo/react-hooks';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fontSize, horizontalScale, verticalScale } from "@/utils";
import Button from "../../components/button/Button";
import { icons } from "@/constants";
import { LongCard } from '@/components/card/LongCard';
import { RealEstateItemData } from "@/constants"; 

const fakeRealEstateData: RealEstateItemData[] = [
  {
    status: 'ongoing',
    type: 'Apartment',
    name: 'Luxury Sky Tower',
    location: 'District 1, Ho Chi Minh City',
    totalTokens: 1000,
    boughtTokens: 750,
    price: 2500000000,
    image: require("@/assets/images/recard_default.jpg"),  // Đảm bảo hình ảnh này tồn tại
    investors: 120
  },
  {
    status: 'waiting',
    type: 'Villa',
    name: 'Seaside Paradise Villa',
    location: 'Nha Trang, Khanh Hoa',
    totalTokens: 500,
    boughtTokens: 0,
    price: 5000000000,
    image: require("@/assets/images/recard_default.jpg"),  // Đảm bảo hình ảnh này tồn tại
    investors: 0
  },
  {
    status: 'waiting',
    type: 'Office',
    name: 'Central Business Hub',
    location: 'District 3, Ho Chi Minh City',
    totalTokens: 2000,
    boughtTokens: 1500,
    price: 3000000000,
    image: require("@/assets/images/recard_default.jpg"),  // Đảm bảo hình ảnh này tồn tại
    investors: 80
  }
];

export interface userData {
  avatar: any,
}

interface HomeScreenProps {
  onPress?: () => void;
  onSort?: () => void;
  data?: userData;
}

const userData = {
  avatar: require("@/assets/images/avatar_user.png"),
}

export const HomeScreen = ({  onPress, onSort }: HomeScreenProps) => {
    const colors = useSelector((state: RootState) => state.theme.palette)
    const dispatch = useDispatch()
    const user = useQuery(GET_USER, {variables: {id: 1}})
    console.log(user.data)

    const numberOfReCards = 5;
    const numberOfLongCards = 3;
    const Recards = Array.from({ length: numberOfReCards }, (_, index) => index + 1);
    const Longcards = Array.from({ length: numberOfLongCards }, (_, index) => index + 1);

    const [selectedButton, setSelectedButton] = useState<string | null>(null);

    const handleButtonPress = (buttonTitle: string) => {
        if (selectedButton === buttonTitle) {
            setSelectedButton(null); 
        } else {
            setSelectedButton(buttonTitle); 
        }
    };

    const buttonTitles = ['Recommended', 'Top Rates', 'Best Offers', 'Most View'];

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[styles.container, {backgroundColor: colors.MAIN}]}>
          
          <View style={styles.title}>
            <View>
              <Text style={styles.titlel1}>Let's Find Your </Text>
              <Text style={styles.titlel2}>Ideal Investment </Text>
            </View>
            <Image
                    resizeMode="cover"
                    style={styles.img}
                    source={userData.avatar}
                />
          </View>

          <View style={styles.search}>
          <SearchBar/>
          <View style={styles.button}>
            <Button.Icon
                        icon={icons.SORT}
                        size="small"
                        radius={20}
                        onPress={onSort}
                    />
          </View>
          </View>

          <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={styles.buttonSort}>
                {buttonTitles.map((title, index) => (
                    <Button.Primary
                        key={index}
                        title={title}
                        fill={false} 
                        fontSize={10}   
                        style={{ 
                            marginRight: horizontalScale(10)
                        }}
                        backgroundColor={selectedButton === title ? colors.BG_TAB_ON : colors.BG_CARD}
                        color={selectedButton === title ? colors.BG_BT_MAIN : colors.TEXT_STD_MAIN}
                        onPress={() => handleButtonPress(title)}
                    />
                ))}
            </ScrollView>

          <ScrollView horizontal={true} style={styles.scrollView} showsHorizontalScrollIndicator={false}>
              {Recards.map((Recard, index) => (
                <View key={index} style={styles.cardContainer}>
                  <ReCard />
                </View>
              ))}
            </ScrollView>
            <View style={styles.subtitle}>
              <Text style={styles.titlel2}>Near You</Text>
              <TouchableOpacity>
                <Text style={styles.buttonmore}>More</Text>
              </TouchableOpacity>
              </View>
              {fakeRealEstateData.map((item, index) => (
                <View key={index} style={styles.VecardContainer}>
                    <LongCard data={item} />
                </View>
            ))}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    paddingHorizontal: horizontalScale(25),
    paddingTop: verticalScale(25),
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
  },
  subtitle: {
    paddingHorizontal: horizontalScale(25),
    flexDirection: "row", 
    justifyContent: "space-between",
    alignItems: "center", 
  },
  titlel1: {
    fontSize: fontSize(18),
    fontWeight: "400",
    color: "#8997A9"
  },
  titlel2: {
    fontSize: fontSize(20),
    fontWeight: "bold",
    paddingVertical: verticalScale(5)
  },
  img: {
    height: verticalScale(60),
    width: horizontalScale(60),
  },
  scrollView: {
    padding: verticalScale(25),
  },
  cardContainer: {
    marginRight: horizontalScale(25), 
  },
  VecardContainer: {
    paddingTop: verticalScale(25), 
    paddingHorizontal: horizontalScale(25)
  },
  search: {
    padding: horizontalScale(25),
    flexDirection: "row",
    paddingTop: verticalScale(25),
    alignItems: "center",
  },
  button: {
    paddingLeft: horizontalScale(10)
  },
  buttonSort: {  
    flexDirection: "row",
    paddingHorizontal: horizontalScale(25),
    paddingBottom: verticalScale(5)
  },
  buttonmore: {
    fontSize: fontSize(14),
    fontWeight:"600",
    color: "#989898",
  }
});

export default HomeScreen;
