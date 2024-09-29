import { Button, UIText } from "@/components";
import { horizontalScale, verticalScale } from "@/utils";
import React, { useState } from "react";
import { Modal, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { REinfo_modal } from "../waitingrelease";

interface ManageModalProps {
    visible: boolean;
    setVisible: () => void;
    data: any;
    // other props...
    //...
}

export const ManageModal = ({ visible, setVisible, data }: ManageModalProps) => {
    const [detail, setDetail] = useState(false)
    const toggleVisible = () => {
    setDetail((prev) => !prev)
    }
    return (
        <Modal transparent={true} visible={visible} onRequestClose={setVisible} animationType="slide">
            <TouchableOpacity activeOpacity={0.9} style={{ alignItems: "center", justifyContent: "center" ,height: '100%', width: '100%'}} onPress={setVisible}>
                <View
                    style={{
                        width: "50%",
                        backgroundColor: "white",
                        paddingHorizontal: horizontalScale(10),
                        paddingVertical: verticalScale(10),
                        gap: verticalScale(5)
                    }}
                >
                    <Button.Util align="center" title="Thông tin" onPress={toggleVisible} />
                    <Button.Util align="center" title="Bán" onPress={() => {}} />
                </View>
                {detail && <REinfo_modal data={data} visible={detail} setVisible={toggleVisible} />}
            </TouchableOpacity>
        </Modal>
    );
};
