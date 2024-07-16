import React, { useEffect, useState } from "react";
import {
    Modal,
    TouchableHighlight,
    TouchableOpacity,
    View,
    StyleSheet,
    FlatList,
} from "react-native";
import { SelectableOptions } from "./type";
import { useAppSelector } from "@/store/hooks";
import { UIText } from "@/components";

interface SortingProps {
    name: string;
    options: SelectableOptions[];
    toggleVisible?: () => void;
    visible: boolean;
    setReturnValue: (options: any) => void;
}

export const SelectOptions = ({
    name,
    options,
    visible,
    toggleVisible,
    setReturnValue,
}: SortingProps) => {
    const Colors = useAppSelector((state) => state.theme.palette);
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={toggleVisible}
        >
            <View
                style={styles.centeredView}
            >
                <TouchableOpacity style={{height: '30%'}} onPress={toggleVisible} />
                <View
                    style={[styles.modalView, { backgroundColor: Colors.MAIN }]}
                >
                    <UIText style={styles.modalTitle} value={`${name} By:`} />
                    <FlatList
                        data={options}
                        renderItem={({ item, index }) => (
                            <TouchableHighlight
                            underlayColor={Colors.BG_CARD_MAIN}
                                key={item.key}
                                style={[
                                    styles.optionButton,
                                    {
                                        borderColor: Colors.BG_CARD_MAIN,
                                        borderTopWidth: index == 0 ? 1 : 0,
                                    },
                                ]}
                                onPress={() => {
                                    toggleVisible && toggleVisible();
                                    setReturnValue(item.key);
                                }}
                            >
                                <UIText
                                    style={styles.optionText}
                                    value={item.label}
                                />
                            </TouchableHighlight>
                        )}
                    />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    openButton: {
        backgroundColor: "#F194FF",
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 20,
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
    centeredView: {
        backgroundColor: 'rgba(139, 69, 19, 0.5)',
        flex: 1,
        justifyContent: "flex-end",
        height: "100%",
        marginTop: 22,
    },
    modalView: {
        paddingVertical: 25,
        height: "70%",
        backgroundColor: "#F194FF",
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        borderWidth: 0.5,
    },
    modalTitle: {
        alignSelf: "center",
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    optionButton: {
        paddingVertical: 15,
        width: "100%",
        borderBottomWidth: 1,
    },
    optionText: {
        paddingLeft: 25,
    },
    cancelButton: {
        backgroundColor: "#FF6347",
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: 200,
        alignItems: "center",
    },
    cancelText: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center",
    },
});
