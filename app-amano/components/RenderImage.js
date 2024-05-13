import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { useRoute } from '@react-navigation/native';


const RenderImagen = ({codigoArticulo}) => {
    try {
      return (
        <Image
          source={require(`../ECOMMERCE/${codigoArticulo}.jpg`)}
          style={styles.image}
        />
      );
    } catch (error) {
      return <Image uri ={''} style={styles.image}/>; // Retorna null si la imagen no puede ser encontrada
    }
  };



  const styles = StyleSheet.create({

    image: {
        alignItems: 'center',
        width: 300,
        height: 300,
        marginTop: 20,
    },
})

export default RenderImagen;