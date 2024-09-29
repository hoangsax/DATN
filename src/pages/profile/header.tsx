import { Button, UIText } from "@/components";
import { heights, icons } from "@/constants";
import { RootState } from "@/store";
import { horizontalScale } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { View } from "react-native";
import { useSelector } from "react-redux";

interface HeaderProps {
    title: string;
  }

export const Header = ({ title } : HeaderProps) => {
    const Colors = useSelector((state: RootState) => state.theme.palette);
    const navigation = useNavigation<StackNavigationProp<any>>();
    return (
        <>
            <View
                style={{
                    height: heights.BOTNAV,
                    flexDirection: "row",
                    gap: horizontalScale(5),
                    alignItems: "center",
                }}
            >
                <Button.Icon
                    backgroundColor={Colors.MAIN}
                    icon={icons.BACK}
                    onPress={() => navigation.goBack()}
                />
                <UIText value={title} fWeight={"bold"} fSize={18} />
            </View>
            <View
                style={{
                    height: 0.5,
                    backgroundColor: Colors.BORDER_FORM_MAIN,
                }}
            />
        </>
    );
};
