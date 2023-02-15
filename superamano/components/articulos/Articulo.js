import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen'

const Articulo = ({articulo}) => {
  return (
    <View style={styles.container}>
      <Text>{articulo.DESCRIPCION}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        padding: 50,
        marginVertical: 8,
        borderRadius: 10,
        backgroundColor: '#FFFFFF'
    }

})

export default Articulo