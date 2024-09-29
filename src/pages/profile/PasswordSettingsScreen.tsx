import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Header } from './header';
import { horizontalScale } from '@/utils';
import { spaces } from '@/constants/space.const';

const PasswordSettingsScreen: React.FC = () => {
    const [password, setPassword] = useState('');

    const handleSave = (): void => {
        // Placeholder for actual save logic
        alert('Password change functionality not implemented.');
    };

    return (
        <View style={styles.container}>
          <Text style={styles.title}>Nhập mật khẩu hiện tại</Text>
          <TextInput
            style={styles.input}
            value={password}
            secureTextEntry
            editable={false} // Make the TextInput non-editable
          />
          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Quên mật khẩu?</Text>
          </TouchableOpacity>
        </View>
    );
};

export default PasswordSettingsScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      padding: 20,
      backgroundColor: '#fff'
    },
    title: {
      fontSize: 18,
      marginBottom: 20
    },
    input: {
      fontSize: 20,
      width: '80%',
      borderBottomWidth: 2,
      borderColor: '#6200ee',
      marginBottom: 20,
      textAlign: 'center'
    },
    forgotPassword: {
      marginBottom: 20
    },
    forgotPasswordText: {
      color: '#6200ee',
      textDecorationLine: 'underline'
    }
  });