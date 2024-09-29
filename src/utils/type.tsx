import { NavigatorScreenParams } from "@react-navigation/native";

export interface SelectableOptions {
    key: string | null;
    label: string;
}

export type ProfileStackParamList = {
    ProfileBotNav: undefined;
    Info: undefined;
    EditContact: undefined;
    SecuritySettings: undefined;
    PasswordSettings: undefined;
};

export type AuthParamList = {
    Login: undefined;
    BotNav: undefined; // Assuming 'BotNav' manages a HomeStack
    Project: undefined; // If 'Project' is a specific route managed by 'BotNav'
    Register: undefined; // If 'Register' is a specific route managed by 'BotNav
};

export type BottomTabParamList = {
    Home: undefined;
    Project: undefined;
    Invest: undefined;
    ProfileStack: undefined;
};
