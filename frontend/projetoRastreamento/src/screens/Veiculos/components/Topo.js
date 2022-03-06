import React from 'react';
import { StyleSheet, Text, Dimensions, Image } from 'react-native';

import Mapa from '../../Mapa'

export default function Topo(){
    return <>
        <Mapa/>
        <Text style={estilos.titulo}>Lista de veículos cadastrados</Text>
    </>
}

const estilos = StyleSheet.create({
    titulo: {
        width: "100%",
        position: "absolute",
        textAlign: "center",
        fontSize: 16,
        lineHeight: 26,
        color: "white",
        fontWeight: "bold",
        padding: 16
    }
})