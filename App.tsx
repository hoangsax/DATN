import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import store from '@/store'
import { Provider } from 'react-redux'
import { AuthNav } from '@/navigations';


export default function App() {

  return (
    <View style={styles.container}>
      <Text>
        Change code in the editor and watch it change on your phone! Save to get a shareable url.
      </Text>
    </View>
    // <Provider store={store}>
    //   <AuthNav />
    // </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
