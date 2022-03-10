import React, { useState, useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, Text } from 'react-native';

import config from '../../../../config'

const mapStyle = [
    {
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#212121"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#9e9e9e"
        }
      ]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#bdbdbd"
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#181818"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "color": "#1b1b1b"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#2c2c2c"
        }
      ]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#8a8a8a"
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#373737"
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#3c3c3c"
        }
      ]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#4e4e4e"
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#616161"
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#757575"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "color": "#3d3d3d"
        }
      ]
    }
  ]

  export default function Mapa() {

    const mapEl=useRef(null)
    const [location, setLocation] = useState(null);
    const [destination, setDestination] = useState(null);
    const [errorMsg, setErrorMsg] = useState(null);
    const [distance, setDistance] = useState(null)

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if(status !== 'granted') {
                setErrorMsg('A permissão para acessar a localização foi negada');
                return;
            }

            let location = await Location.getCurrentPositionAsync({enableHighAccuracy: true});
            setLocation({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta:0.000922,
                longitudeDelta:0.000421,
            })
        }) ();
    }, []);

    let text = 'Carregando..';
    if(errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = JSON.stringify(location)
    }
    
    
    return (
        <View style={css.container}>
            <MapView 
                customMapStyle={mapStyle} 
                style={css.map}
                initialRegion={location}
                showsUserLocation={true}
                ref={mapEl}
            >
                {destination &&
                    <MapViewDirections
                        precision='high'
                        strokeWidth={7}
                        strokeColor="orange"
                        origin={location}
                        destination={destination}
                        apikey={config.googleApi}
                        onReady={result=>{
                            setDistance(result.distance);
                            mapEl.current.fitToCoordinates(
                                result.coordinates,{
                                    edgePadding:{
                                        top:50,
                                        bottom:50,
                                        left:50,
                                        right:50
                                    }
                                }
                            )
                        }}
                    />
                }
            </MapView>
            <View style={css.search}>
                <GooglePlacesAutocomplete
                    placeholder='Digite seu destino'
                    onPress={(data, details = null) => {
                        setDestination({
                            latitude: details.geometry.location.lat,
                            longitude: details.geometry.location.lng,
                            latitudeDelta:0.000922,
                            longitudeDelta:0.000421,
                        });
                    }}
                    query={{
                        key: config.googleApi,
                        language: 'pt-BR'
                    }}
                    enablePoweredByContainer={false}
                    fetchDetails={true}
                    styles={{listView:{height:50}}}
                />

                <View>
                    {distance &&
                        <Text>Distância: {distance} m</Text>
                    }
                </View>
            </View>
        </View>
    )
}

const css = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  map:{
      height: '60%',
  },
  search:{
      height: '40%',
  }
});