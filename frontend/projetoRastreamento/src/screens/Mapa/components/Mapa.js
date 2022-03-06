import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';


export default function mapa() {
    return <>
        <View style={estilos.container}>
            <MapView 
                mapType='none'
                // userInterfaceStyle='dark'
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
                style={estilos.mapa}
            />
        </View>
    </>
}

const estilos = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
        justifyContent: "center",
    },
    mapa: {
        width: Dimensions.get('window').width,
        height: 600,
    }
})


function getInitialState(){
    return {
        region: {
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
        },
    };
}

function onRegionChanges(region) {
    this.setState({ region });
}


