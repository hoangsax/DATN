// src/screens/SettingsScreen.tsx
import { Button } from '@/components/button';
import { RootState } from '@/store';
import { logout } from '@/store/auth';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const ProfileScreen = () => {
    const auth = useSelector((state: RootState) => state.auth)
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Profile Screen</Text>
            <Button.Primary title='Logout' onPress={() => dispatch(logout())} />
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
  },
});

export default ProfileScreen;
