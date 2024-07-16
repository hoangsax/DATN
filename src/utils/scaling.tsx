import { Dimensions, Platform, PixelRatio } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height';

const { width, height } = Dimensions.get('window')
const [shortDimension, longDimension] = width < height ? [width, height] : [height, width]
const Bheight = getStatusBarHeight();
const WIDTH_SCREEN = width
const HEIGHT_SCREEN = height

const guidelineBaseWidth = 375
const guidelineBaseHeight = 686 + Bheight

const horizontalScale = (size: number) => (shortDimension / guidelineBaseWidth) * size

const verticalScale = (size: number) => (longDimension / guidelineBaseHeight) * size

const moderateScale = (size: number, factor = 0.5) => size + (horizontalScale(size) - size) * factor

const fontSize = (size: number) => {
    const newSize = size * (width / guidelineBaseWidth)
    if (Platform.OS === 'ios') {
        return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
}

const lineHeight = (size: number) => {
    const newSize = size * 1.5;
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
}



const isIphoneXorAbove = () => {
    const dimen = Dimensions.get('window')
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTV &&
        (dimen.height === 780 ||
            dimen.width === 780 ||
            dimen.height === 812 ||
            dimen.width === 812 ||
            dimen.height === 844 ||
            dimen.width === 844 ||
            dimen.height === 896 ||
            dimen.width === 896 ||
            dimen.height === 926 ||
            dimen.width === 926)
    )
}

export { horizontalScale, verticalScale, moderateScale, fontSize, isIphoneXorAbove, WIDTH_SCREEN, HEIGHT_SCREEN, lineHeight }
