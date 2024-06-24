import { RootState } from "@/store";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";

export const PercentBar = () => {

    const Colors = useSelector((state: RootState) => state.theme.palette)

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            flexDirection: 'row',
            backgroundColor: Colors.BG_TAB_OFF,
        },
        bar: {
            
        }
    })

    return (
        <View>
            <View></View>
        </View>
    );
};

