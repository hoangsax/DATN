import { horizontalScale, verticalScale } from "@/utils";
import { getStatusBarHeight } from "react-native-status-bar-height";

const Bheight = getStatusBarHeight();
export const heights = {
    BOTNAV: verticalScale(50),
    BUTTON_ICON: 30,
    STATUS_BAR: Bheight,
    HEADER_HEIGHT: verticalScale(50) * 1.5,
    ICONSMALL: horizontalScale(20),
}