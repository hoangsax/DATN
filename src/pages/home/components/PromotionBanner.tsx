import React from 'react'
import { StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import {
  horizontalScale,
  // Icon
} from "@/utils";
import { images } from '@/constants';

const width = horizontalScale(140)
const height = horizontalScale(90)
// const icon_size = horizontalScale(8)

interface PromotionBannerProps { 
  source?: ImageSourcePropType, 
  onPress?: () => void
}

const PromotionBanner = (props: PromotionBannerProps) => {

  const { source, onPress } = props

  return (
    <TouchableOpacity style={[styles.container, styles.shadowBox]} onPress={onPress}>
      <Image source={source ? source : images.logo} style={styles.img} />
    </TouchableOpacity>
  )
}

export default PromotionBanner;

const styles = StyleSheet.create(
  {
    container: {
      width: width,
      height: height,
      backgroundColor: 'white',
      borderRadius: 8,
    },

    img: { 
      width: width, 
      height: height 
    },

    shadowBox: {
      borderRadius: 8,
      elevation: 5, // For Android
      shadowColor: 'black', // For iOS
      shadowOffset: { width: 0, height: 4 }, // For iOS
      shadowOpacity: 0.2, // For iOS
      shadowRadius: 0.2, // For iOS
    },
  }
)