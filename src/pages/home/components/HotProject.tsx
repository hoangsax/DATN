import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import {
  fontSize,
  horizontalScale,
  // Icon
} from "@/utils";
import type { HotProjectDataProps } from '../utils/types';
import { images } from '@/constants';
import { UIText } from '@/components';

const width = horizontalScale(180)
const coverHeight = horizontalScale(120)
const infoHeight = horizontalScale(36)
// const icon_size = horizontalScale(8)

interface HotProjectProps {
  data?: HotProjectDataProps,
  source?: ImageSourcePropType,
  onPress?: () => void
}

const HotProject = (props: HotProjectProps) => {
  const { data, source, onPress } = props

  const defaultData: HotProjectDataProps = {
    title: 'Aquala City',
    address: 'Quận 5, Hồ Chí Minh',
    square: 5.23,
  }
  const [finalData, setFinalData] = useState<HotProjectDataProps>(defaultData)

  useEffect(() => {
    // Use data if provided, otherwise use the defaultData
    if (data !== undefined && data !== null) {
      setFinalData(data)
    }
    else {
      setFinalData(defaultData)
    }
  }, [data]);
  return (
    <TouchableOpacity style={[styles.container, styles.shadowBox]} onPress={onPress}>
      <View style={styles.imgContainer}>
        <Image style={styles.coverImg} source={source ? source : images.logo} />
      </View>
      <View style={styles.info}>
        <View>
          <UIText style={styles.textTitle} value={finalData.title} />
          <UIText style={styles.textDetail} value={finalData.address} />
        </View>
        <View>
          <UIText style={[styles.textDetail, styles.textDetailGray]} value={finalData.square + ' ha'} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default HotProject;

const detailPaddingHorizontal = horizontalScale(6)

const styles = StyleSheet.create(
  {
    container: {
      width: width,
      height: coverHeight + infoHeight,
      backgroundColor: 'white',
      borderRadius: 8,
    },

    imgContainer: {
      height: coverHeight
    },

    coverImg: {
      width: '100%',
      height: '100%',
      borderRadius: 8
    },

    info: {
      height: infoHeight,
      justifyContent: 'space-between',
      flexDirection: 'row',
      paddingVertical: horizontalScale(4),
      paddingHorizontal: detailPaddingHorizontal,
    },

    shadowBox: {
      borderRadius: 8,
      elevation: 5, // For Android
      shadowColor: 'black', // For iOS
      shadowOffset: { width: 0, height: 4 }, // For iOS
      shadowOpacity: 0.2, // For iOS
      shadowRadius: 0.2, // For iOS
    },

    textTitle: {
      fontSize: fontSize(10),
      fontWeight: '500',
      color: 'gray'
    },

    textDetail: {
      fontSize: fontSize(8),
    },

    textDetailGray: {
      fontWeight: '600',
      color: 'gray500'
    }
  }
)