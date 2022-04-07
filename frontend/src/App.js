import React from 'react'
import { StatusBar, SafeAreaView } from 'react-native';

import Mapa from './components/Mapa'
// import Notifications from './components/Notifications';
// import ScreenShot from './components/ScreenShot'

export default () => {
    return <>
        <SafeAreaView style={{flex: 1}}>
            <StatusBar/>
            <Mapa/>
            {/* <Notifications/> */}
        </SafeAreaView>
    </>
}