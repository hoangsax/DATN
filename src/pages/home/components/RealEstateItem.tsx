import React, { useState, useEffect } from 'react'
import {
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  ImageSourcePropType
} from 'react-native'
import {
  fontSize,
  horizontalScale,
} from "@/utils";
import type { RealEstateItemData } from '../utils/types';
import { SvgXml } from 'react-native-svg';
import { UIText } from '@/components';
import { images } from '@/constants';

const width = horizontalScale(180)
const coverHeight = horizontalScale(92)
const infoHeight = horizontalScale(64)
const icon_size = horizontalScale(8)

interface RealEstateItemProps {
  data?: RealEstateItemData,
  source?: ImageSourcePropType,
  onPress?: () => void,
  iconPress?: () => {},
}

const RealEstateItem = (props: RealEstateItemProps) => {
  const { data, source, onPress, iconPress } = props

  const defaultData: RealEstateItemData = {
    price: 23000000,
    detail: {
      livingroom: 4,
      bedroom: 4,
      toilet: 4,
      floor: 4,
    },
    address: '234 Phạm Văn Đồng, P2, Q5, HCM',
  }
  const [finalData, setFinalData] = useState<RealEstateItemData>(defaultData)

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
      <View style={styles.coverImg}>
        <ImageBackground style={styles.imgBackground} source={source ? source : images.logo} resizeMode='stretch'>
          <TouchableOpacity onPress={iconPress}>
            <SvgXml xml='IC_FAVOURITE' height={horizontalScale(14)} width={horizontalScale(14)} style={styles.iconFav} />
          </TouchableOpacity>
        </ImageBackground>
      </View>
      <View style={styles.info}>
        <View style={styles.price}>
        <SvgXml xml='IC_FAVOURITE' height={horizontalScale(10)} width={horizontalScale(10)} style={styles.iconFav} />
          <UIText style={styles.textPrice} value={finalData.price.toLocaleString()} />
        </View>
        <View style={styles.detail}>
          <View style={styles.detailCol}>
            <UIText style={styles.textLabel} value={'floor'} />
            <View style={styles.detailData}>
            <SvgXml xml='IC_FAVOURITE' height={icon_size} />
              <UIText style={styles.textLabelData} value={finalData.detail.floor.toString()} />
            </View>
          </View>
          <View style={styles.seperator}></View>
          <View style={styles.detailCol}>
            <UIText style={styles.textLabel} value={'living_room'} />
            <View style={styles.detailData}>
            <SvgXml xml='IC_FAVOURITE' height={horizontalScale(14)} width={horizontalScale(14)} style={styles.iconFav} />
              <UIText style={styles.textLabelData} value={finalData.detail.livingroom.toString()} />
            </View>
          </View>
          <View style={styles.seperator}></View>
          <View style={styles.detailCol}>
            <UIText style={styles.textLabel} value={'bedroom'} />
            <View style={styles.detailData}>
              <SvgXml xml={'IC_RE_BED'} height={icon_size} width={icon_size} />
              <UIText style={styles.textLabelData} value={finalData.detail.bedroom.toString()} />
            </View>
          </View>
          <View style={styles.seperator}></View>
          <View style={styles.detailCol}>
            <UIText style={styles.textLabel} value={'toilet'} />
            <View style={styles.detailData}>
              <SvgXml xml={'IC_RE_TOILET'} height={icon_size} />
              <UIText style={styles.textLabelData} value={finalData.detail.toilet.toString()} />
            </View>
          </View>
        </View>
        <View style={styles.address}>
          <UIText style={styles.textAddress} value={finalData.address} />
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default RealEstateItem;

const detailPaddingHorizontal = horizontalScale(6)
const seperatorWidth = horizontalScale(1)
const seperatorMarginHorizontal = horizontalScale(10)

const styles = StyleSheet.create(
  {
    container: {
      width: width,
      height: coverHeight + infoHeight,
      backgroundColor: 'white',
      borderRadius: 8,
    },

    coverImg: {
      height: coverHeight,
      borderRadius: 8,
    },

    imgBackground: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },

    iconFav: {
      alignSelf: 'flex-end',
      marginRight: horizontalScale(6),
      marginTop: horizontalScale(3)
    },

    info: {
      height: infoHeight,
      justifyContent: 'space-between',
      paddingVertical: horizontalScale(4),
      paddingHorizontal: detailPaddingHorizontal,
    },

    //1st row
    price: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    textPrice: {
      fontSize: fontSize(12)
    },

    //2nd row
    seperator: {
      backgroundColor: 'gray',
      width: seperatorWidth,
      marginHorizontal: seperatorMarginHorizontal,
    },

    detail: {
      flexDirection: 'row',
      width: width,
    },

    detailCol: {
      alignItems: 'center',
      width: 0.25 *
        (width -                                     //component's width
          detailPaddingHorizontal * 2 -            //detail's paddingHorizontal (x2)
          (seperatorWidth +                       //seperator's width
            2 * seperatorMarginHorizontal) * 3), //seperator's maringHorizontal (x2) (3 seperators)
    },

    detailData: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '70%',
    },

    //3rd row
    address: {

    },

    shadowBox: {
      borderRadius: 8,
      elevation: 5, // For Android
      shadowColor: 'black', // For iOS
      shadowOffset: { width: 0, height: 4 }, // For iOS
      shadowOpacity: 0.2, // For iOS
      shadowRadius: 0.2, // For iOS
    },

    //Text

    textLabel: {
      fontSize: fontSize(4),
      color: 'gray',
      fontWeight: '600',
    },

    textLabelData: {
      fontSize: fontSize(10),
    },

    textAddress: {
      fontSize: fontSize(8),
    }
  }
)