import React, { useState, useEffect } from 'react'
import {
  View,
  ImageBackground,
  TouchableOpacity,
  StyleSheet
} from 'react-native'
import {
  fontSize,
  horizontalScale,
  verticalScale
} from "@/utils";
import { RecommendItemDataProps } from '../utils/types';
import { UIText } from '@/components';

const width = horizontalScale(140)
const height = horizontalScale(95)

interface RecommendItemProps {
  data?: RecommendItemDataProps,
  onPress?: () => void
}

const RecommendItem = (props: RecommendItemProps) => {

  const { data, onPress } = props

  const defaultProps = {
    title: 'Đã đề xuất',
    count: 45,
  }

  const [finalProps, setFinalProps] = useState<RecommendItemDataProps>(defaultProps)

  useEffect(() => {
    if (data !== undefined && data !== null) {
      setFinalProps(data)
    }
    else {
      setFinalProps(defaultProps)
    }
  }, [data]);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <ImageBackground
        resizeMode='stretch'
        source={require('@/assets/images/psuedo_data/img_001.jpeg')}
        style={styles.imgBackground}>
        <View
          style={styles.containerTitle}>
          <UIText
            style={styles.textTitle}
            value={
              finalProps.title  //Title
            }
            />
          <View
            style={styles.containerDetail}>
            <UIText style={styles.textDetail}
              value={
                finalProps.count.toString() //Count
              }
            />
          </View>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default RecommendItem;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    borderRadius: 10
  },

  imgBackground: {
    paddingHorizontal: horizontalScale(7),
    paddingTop: horizontalScale(6),
    height: '100%'
  },

  containerTitle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },

  textTitle: {
    fontSize: fontSize(10),
    color: 'white',
    fontWeight: '500'
  },

  containerDetail: {
    width: horizontalScale(25),
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8
  },

  textDetail: { 
    fontSize: fontSize(10), 
    fontWeight: '500', 
    paddingVertical: verticalScale(1.5) 
  },
})