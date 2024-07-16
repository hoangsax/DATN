import { UIText } from "@/components";
import { IconType } from "@/constants";
import {horizontalScale, verticalScale } from "@/utils";
import React from "react"
import { StyleSheet, View, TouchableOpacity } from "react-native"
import { SvgXml } from "react-native-svg";

interface FuntionListProps {
  title: string,
  icon: IconType,
  onPress: () => void,
}

const FuntionList = (props: FuntionListProps) => {

  const { title, icon, onPress } = props

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.containerIcon}>
        <SvgXml xml={icon} height={horizontalScale(50)} width={horizontalScale(50)} />
      </View>
      <View style={styles.containerTitle}>
        <UIText value={title} />
      </View>
    </TouchableOpacity>
  )
}

export {FuntionList};

const styles = StyleSheet.create(
  {
    container: {
      justifyContent: 'center',
      alignItems:'center',
      height: horizontalScale(72),
    },
    containerIcon: {
      width: horizontalScale(50),
      height: horizontalScale(50),
    },
    containerTitle: {
      height: horizontalScale(22),
      paddingTop: verticalScale(7),
    },
    textTitle: {

    },
  }
)