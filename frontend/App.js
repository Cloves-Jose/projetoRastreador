import { StatusBar, SafeAreaView } from 'react-native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Mapa from './src/screens/Map';

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar/>
      <Mapa/>  
    </SafeAreaView>
  )
}
