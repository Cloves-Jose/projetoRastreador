import { StatusBar, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Mapa from './src/screens/Map';

export default function App() {

  useEffect(() => {
    async function sendServer(){
      let response = await fetch('http://localhost:3000')
    }
  },[])

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar/>
      <Mapa/>  
    </SafeAreaView>
  )
}
