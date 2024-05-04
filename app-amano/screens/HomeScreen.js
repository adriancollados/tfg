import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity, StyleSheet, FlatList} from 'react-native'



const Homescreen = ({navigation}) => {

    return ( 
        <View style={styles.container}> 
             <View style={styles.image}>
                <Image source={ require('../assets/amano-supermercados-logo.jpg')} style={{width: 300, height: 60, marginBottom: 80}}/>
            </View>
            <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
            <TouchableOpacity style={styles.buttonRegister} onPress={() => navigation.navigate("Register")}> 
                <Text style={styles.text_button}>REGISTRARSE</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonLogin} onPress={() => navigation.navigate("Login")}>
                <Text style={styles.text_button}>INICIAR SESIÓN</Text>
            </TouchableOpacity>
        </View>
  )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#C00A21',
        alignItems: 'center',
        marginTop: 0
      },
    text_button: {
        color: "#C00A21",
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold',
    },
    buttonRegister: {
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        width: "90%",
        top: 10,
        shadowOffset: {
            width: 0,
            height: 20,
        },
        shadowOpacity: 0.53,
        shadowRadius: 2.62,
        elevation: 10,
    },
    buttonLogin: {
        paddingTop: 20,
        paddingBottom: 20,
        borderRadius: 20,
        backgroundColor: "#ffffff",
        width: "90%",
        top: 50,
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.53,
        shadowRadius: 2.62,
        elevation: 10,
    },
    image: {
        display: 'flex',
        justifyContent: "center",
        alignItems: 'center',
        marginTop: 100
      },
      title: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 50,
      },
  });

export default Homescreen

