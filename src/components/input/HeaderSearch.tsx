import {
    StyleSheet,
    View,
    TouchableOpacity,
    SafeAreaView,
    Text
  } from "react-native";
  import {
    fontSize,
    horizontalScale,
    verticalScale
  } from "@/utils";
  import React from "react";
  import { icons, screens } from "@/constants";
  import { NavigationProp } from "@react-navigation/native";
import { SvgXml } from "react-native-svg";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { UIText } from "../text";
  
  type HeaderSearchScreenProps = {
    navigation: NavigationProp<any>;
  };
  
  const HeaderSearch = ({ navigation }: HeaderSearchScreenProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette)
    const onPressSearch = () => {
      navigation.navigate(screens.SEARCH);
    };
  
    return (
      <SafeAreaView style={[styles.container, {backgroundColor: Colors.BG_MAIN}]}>
        <View style={[styles.outerView, {backgroundColor: Colors.BG_MAIN}]}>
          <View style={styles.innerView}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.touchableOpacity}
              onPress={onPressSearch}
            >
              <SvgXml height={horizontalScale(20)} width={horizontalScale(20)} xml={icons.SEARCH} />
              <UIText style={styles.placeholder} value={"input_address_and_neighborhood"}
              />
            </TouchableOpacity>
  
            <TouchableOpacity activeOpacity={0.7} onPress={() => {}}>
            <SvgXml height={horizontalScale(20)} width={horizontalScale(20)} xml={icons.SEARCH} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
    },
  
    outerView: {
      height: verticalScale(73),
    },
  
    innerView: {
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: verticalScale(21),
      paddingHorizontal: horizontalScale(16)
    },
  
    touchableOpacity: {
      flexDirection: "row",
      alignItems: "center",
      width: horizontalScale(305),
      backgroundColor: 'white',
      height: verticalScale(40),
      borderRadius: 8,
      paddingHorizontal: horizontalScale(8)
    },
  
    placeholder: {
      color: 'gray500',
      fontSize: fontSize(14),
      fontWeight: "400",
      marginLeft: horizontalScale(8)
    },
    image1: {
      width: horizontalScale(21),
      height: verticalScale(23)
    }
  });
  
  export default HeaderSearch;
  