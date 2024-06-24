import { heights } from "@/constants/heights.const";
import React, { useEffect, useState } from "react";
import { Modal, TouchableHighlight, TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { HEIGHT_SCREEN } from "./scaling";
import { REData } from "@/components/card/LongCard";

interface SortingProps {
    onPress?: () => void;
    visible: boolean;
    sortBy: (options: any) => void;
}

export const Sorting = ({visible, onPress, sortBy } : SortingProps) => {

    const [sortOptions] = useState([
        { key: 'name', label: 'Name' },
        { key: 'totalTokens', label: 'Total Tokens' },
        { key: 'price', label: 'Price' },
        { key: 'investors', label: 'Investors' },
      ]);

    return (
        <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        onRequestClose={onPress}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalTitle}>Sort By:</Text>
            {sortOptions.map(option => (
              <TouchableHighlight
                key={option.key}
                style={styles.optionButton}
                onPress={() => {
                  onPress && onPress()
                  sortBy(option.key);
                }}
              >
                <Text style={styles.optionText}>{option.label}</Text>
              </TouchableHighlight>
            ))}
            <TouchableHighlight
              style={styles.cancelButton}
              onPress={onPress}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    openButton: {
      backgroundColor: '#F194FF',
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginBottom: 20,
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    optionButton: {
      backgroundColor: '#2196F3',
      borderRadius: 10,
      padding: 10,
      marginBottom: 10,
      width: 200,
      alignItems: 'center',
    },
    optionText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    cancelButton: {
      backgroundColor: '#FF6347',
      borderRadius: 10,
      padding: 10,
      marginTop: 10,
      width: 200,
      alignItems: 'center',
    },
    cancelText: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });