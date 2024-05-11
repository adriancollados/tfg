import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

const CustomButton = ({children, onPress}) =>(
    <TouchableOpacity
        style={{
            top: -30,
            justifyContent: 'center',
            alignItems: 'center',
            ... styles.shadow,
            ... styles.circle
        }}
        onPress={onPress}
    >
        <View style={{
            with: 70,
            height: 70,
            borderRadius: 35,
            backgroundColor: 'white',
            ... styles.circle
        }}
        >
         {children}
        </View>
    </TouchableOpacity>
);

export default CustomButton

const styles = StyleSheet.create({
    shadow: {
        shadowColor: '#ffffff',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 2.62,
        elevation: 10,
    },
    circle: {
        width: 70,
        height: 70,
        borderRadius: 40,
        backgroundColor: '#C00A21', // Puedes ajustar el color del círculo aquí
        justifyContent: 'center',
        alignItems: 'center',
      },
})