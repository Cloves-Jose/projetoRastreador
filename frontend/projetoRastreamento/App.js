import { StatusBar, SafeAreaView } from "react-native";


import Veiculos from './src/screens/Veiculos';

export default function App(){
  return(
    <SafeAreaView>
      <StatusBar/>
      <Veiculos/>
    </SafeAreaView>
  )
}