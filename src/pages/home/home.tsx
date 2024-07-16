import {
  StyleSheet,
  View,
  ScrollView,
  Text,
} from "react-native";
import React from "react";
import {
  fontSize,
  horizontalScale,
  verticalScale,
} from "@/utils";
import {FuntionList} from "./components";
import { TouchableOpacity } from "react-native";
import { HotProject, PromotionBanner, RealEstateItem, RecommendItem } from "./components";
import { NavigationProp} from "@react-navigation/native";
import { icons, screens } from "@/constants";
import { SvgXml } from "react-native-svg";
import { UIText } from "@/components";
import HeaderSearch from "@/components/input/HeaderSearch";

type HomenPageProps = {
  navigation: NavigationProp<any>;
};

const RealEstateForYou = () => {
  const data =
    [
      { id: 1, value: { price: 23000000, detail: { floor: 4, livingroom: 4, bedroom: 4, toilet: 4 }, address: '234 Phạm Văn Đồng, P2, Q5, HCM' } },
      { id: 2, value: { price: 24000000, detail: { floor: 3, livingroom: 3, bedroom: 3, toilet: 3 }, address: '240 Phạm Văn Đồng, P2, Q5, HCM' } },
      { id: 3, value: { price: 24000000, detail: { floor: 3, livingroom: 3, bedroom: 3, toilet: 3 }, address: '240 Phạm Văn Đồng, P2, Q5, HCM' } },
    ]
  return (
    <View>
      <TouchableOpacity style={styles.containerLabel}>
        <Text style={styles.textLabel}>{'re_for_you'}</Text>
        <SvgXml xml={icons.FORWARD} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.containerItemList}
      >
        {
          data.map((item) => (
            <View key={item.id} style={styles.containerItem}>
              <RealEstateItem data={item.value} />
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

const HotRealEstateList = () => {
  const data =
    [
      { id: 1, value: { price: 23000000, detail: { floor: 4, livingroom: 4, bedroom: 4, toilet: 4 }, address: '234 Phạm Văn Đồng, P2, Q5, HCM' } },
      { id: 2, value: { price: 24000000, detail: { floor: 3, livingroom: 3, bedroom: 3, toilet: 3 }, address: '240 Phạm Văn Đồng, P2, Q5, HCM' } },
      { id: 3, value: { price: 24000000, detail: { floor: 3, livingroom: 3, bedroom: 3, toilet: 3 }, address: '240 Phạm Văn Đồng, P2, Q5, HCM' } },
    ]
  return (
    <View>
      <TouchableOpacity style={styles.containerLabel}>
        <UIText value={'re_hot'} style={styles.textLabel} />
        <SvgXml xml={icons.FORWARD} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.containerItemList}
      >
        {
          data.map((item) => (
            <View key={item.id} style={styles.containerItem}>
              <RealEstateItem data={item.value} />
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

const NearbyRealEstateList = () => {
  const currentLocation = 'Hồ Chí Minh'

  const data = [
    { id: 1, value: { title: 'recommended', count: 45 } },
    { id: 2, value: { title: 'new_list', count: 40 } },
    { id: 3, value: { title: 'recently_sold', count: 40 } },
  ]

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
        {
          data.map((item) => (
            <View key={item.id} style={styles.containerItem}>
              <RecommendItem data={item.value} />
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

const HotProjectList = () => {
  const data = [
    { id: 1, value: { title: 'Aquala City', address: 'Quận 5, Hồ Chí Minh', square: 10.3 } },
    { id: 2, value: { title: 'Aquala City', address: 'Quận 5, Hồ Chí Minh', square: 5.23 } },
    { id: 3, value: { title: 'Aquala City', address: 'Quận 5, Hồ Chí Minh', square: 3.2 } },
  ]
  return (
    <View>
      <TouchableOpacity style={styles.containerLabel}>
        <UIText style={styles.textLabel} value={'re_hot'} />
        <SvgXml xml={icons.FORWARD} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.containerItemList}
      >
        {
          data.map((item) => (
            <View key={item.id} style={styles.containerItem}>
              <HotProject data={item.value} />
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

const PromotionBannerList = () => {
  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
  ]
  return (
    <View>
      <TouchableOpacity style={styles.containerLabel}>
        <UIText style={styles.textLabel} value={'now_promotion'} />
        <SvgXml xml={icons.FORWARD} />
      </TouchableOpacity>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.containerItemList}
      >
        {
          data.map((item) => (
            <View key={item.id} style={styles.containerItem}>
              <PromotionBanner />
            </View>
          ))
        }
      </ScrollView>
    </View>
  )
}

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
          <FuntionList icon='GOOGLE' title='buy_home' onPress={() => { }} />
          <FuntionList icon='GOOGLE' title='sell_home'  onPress={onPressSell} />
          <FuntionList icon='GOOGLE' title='rent_home' onPress={() => { }} />
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
    flex: 1
  },
  containerFuntion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: horizontalScale(40),
    paddingTop: verticalScale(23),
  },
  containerLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: verticalScale(22),
    paddingLeft: horizontalScale(16),
    paddingRight: horizontalScale(10)
  },
  containerItemList: {
    marginTop: verticalScale(14),
    paddingLeft: horizontalScale(12),
  },
  containerItem: {
    marginRight: horizontalScale(10),
    paddingBottom: horizontalScale(5)
  },
  textLabel: {
    fontSize: fontSize(16),
    color: 'gray900',
    fontWeight: '500'
  }
});
