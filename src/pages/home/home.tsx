// src/screens/SettingsScreen.tsx
import { GET_USER } from '@/client';
import { ReCard } from '@/components/card/ReCard';
import { RootState } from '@/store';
import { logout } from '@/store/auth';
import { useQuery } from '@apollo/react-hooks';
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

const HomeScreen = () => {
    const colors = useSelector((state: RootState) => state.theme.palette)
    const dispatch = useDispatch()
    const user = useQuery(GET_USER, {variables: {id: 1}})
    console.log(user.data)
    return (
        <View style={[styles.container, {backgroundColor: colors.MAIN}]}>
            <Text style={styles.text}>Home Screen</Text>
            <Button title='Logout' onPress={() => dispatch(logout())} />
              <ReCard />
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

export default HomeScreen;
