import React from "react";
import { Dimensions, StatusBar, StyleSheet, Text, View } from "react-native";
import store from "@/store";
import client from "@/client";
import { Provider } from "react-redux";
import { AuthNav } from "@/navigations";
import { ApolloProvider } from "@apollo/react-hooks";
export default function App() {
    const { width, height } = Dimensions.get('window');
    console.log(width, ' + ' ,height);
    return (
        <Provider store={store}>
            <ApolloProvider client={client}>
                <AuthNav />
            </ApolloProvider>
        </Provider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
});
