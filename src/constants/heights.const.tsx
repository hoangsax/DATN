import { verticalScale } from "@/utils";
import { getStatusBarHeight } from "react-native-status-bar-height";

const Bheight = getStatusBarHeight();
export const heights = {
    BOTNAV: verticalScale(50),
    BUTTON_ICON: 20,
    STATUS_BAR: Bheight,
}