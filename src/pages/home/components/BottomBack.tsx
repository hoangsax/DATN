import {
  horizontalScale,
  verticalScale
} from "@/utils";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Button } from "@/components/button";
import { useNavigation } from "@react-navigation/native";


const screenWidth = Dimensions.get('window').width;

type BottomBackProps =  {
  count?: number,
  totalSteps?: number
  OnPressContinue?: () => void;
}

const BottomBack =  (props: BottomBackProps)  => {
  const { count = 0 ,  totalSteps = 5, OnPressContinue} = props
  const navigation = useNavigation();
  const onPressButtonBack = () => {
    navigation.goBack();
  };
  
  return (
    <View style={styles.container}>
      <View style={[styles.greenLine, { width: screenWidth * count / totalSteps}]} />
      <Button.Primary
      title={"back"}
      onPress={onPressButtonBack}
      />
      <Button.Primary
      title={"back"}
      onPress={onPressButtonBack}
      />
    </View>
  );
};

export default BottomBack;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 6,
    borderColor: 'gray100',
    backgroundColor: 'white',
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignContent: "center",
    paddingTop: horizontalScale(10),
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(32),
    position: "absolute",
    bottom: 0,
  },
  greenLine: { // Add this style
    position: 'absolute',
    top: -6, 
    height: 6, 
    backgroundColor: 'green', 
  },
});
