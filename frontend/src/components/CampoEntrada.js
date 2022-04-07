import React, { useState } from 'react'
import MapView from 'react-native-maps'
import { View, StyleSheet } from 'react-native'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

export default(props) => {
    const [destination, setDestination] = useState(null)

    return <>
        <View style={style.search}>
            <GooglePlacesAutocomplete
                placeholder='Digite seu destino'
                // onPress={(data, details = null) => {
                //     setDestination({

                //     })
                // }}
            />
        </View>
    </>
}

const style = StyleSheet.create({
    search: {
        height:40
    }
})