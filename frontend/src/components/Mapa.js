import React, { useState, useEffect, useRef } from 'react';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { StyleSheet, View, Text } from 'react-native';
import { Constants } from 'expo-constants';
import * as Notifications from 'expo-notifications';

import config from '../../config'

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false
  })
})


export default () => {

  const mapEl=useRef(null)
  const [location, setLocation] = useState(null);
  const [destination, setDestination] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [distance, setDistance] = useState(null);
  const [notifications, setNotification] = useState(false)
  const notificationsListener = useRef();
  const responseListener = useRef()

  useEffect(() => {
    notificationsListener.current = Notifications.addNotificationReceivedListener(notifications => {
      setNotification(notifications)
    });

    responseListener.current = Notifications.addNotificationReceivedListener(response => {
      console.log(response)
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationsListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    }
  }, [])



  useEffect(() => {
      (async () => {
          let { status } = await Location.requestBackgroundPermissionsAsync();
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
                      schedulePushNotification()
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

async function schedulePushNotification(data) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: `Você criou uma nova viagem para ${data}`,
      body: `Aqui está a rota definida`,
      data: {
        setDestination: data
      }
    },
    trigger: { seconds: 2}
  })
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