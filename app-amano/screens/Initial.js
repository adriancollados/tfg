import React from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements'

const Initial = () => {

  
    

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Bienvenido</Text>
          <Image
            source={require('../assets/Envios.jpg')}
            style={styles.headerImage}
          />
        </View>
        <View style={styles.logoContainer}>
            <View style={styles.logoItem}>
              <MaterialCommunityIcons name="assistant" size={50} color="red" />  
              <View style={styles.textContainer}>
                <Text style={styles.logoText}>CONTACTO 24/7</Text>
                <Text style={styles.description}>Contacta con nosotros en cualquier momento</Text>
              </View>
            </View>
            <View style={styles.logoItem}>
              <MaterialCommunityIcons name="car-estate" size={50} color="red" />  
              <View style={styles.textContainer}>
                <Text style={styles.logoText}>ENVÍO GRATIS</Text>
                <Text style={styles.description}>Envío gratuíto a partir de 60€</Text>
              </View>
            </View>
            <View style={styles.logoItem}>
              <MaterialCommunityIcons name="credit-card-check-outline" size={50} color="red" />  
              <View style={styles.textContainer}>
                <Text style={styles.logoText}>100% PAGO SEGURO</Text>
                <Text style={styles.description}>Aseguramos tu pago</Text>
              </View>
            </View>
            <View style={styles.logoItem}>
              <MaterialCommunityIcons name="progress-star" size={50} color="red" />  
              <View style={styles.textContainer}>
                <Text style={styles.logoText}>PRODUCTOS DE CALIDAD</Text>
                <Text style={styles.description}>Las mejores marcas del mercado</Text>
              </View>
            </View>
        </View>

        <View style={styles.header}>
          <Image
            source={require('../assets/2_2.jpg')}
            style={{
              width: '100%',
              height: 400,
              resizeMode: 'cover',
              marginTop: 10}}
            resizeMode="contain"
          />
        </View>

        <View style={styles.header}>
          <Image
            source={require('../assets/3_2.jpg')}
            style={{
              width: '100%',
              height: 300,
              resizeMode: 'cover',
              marginTop: 5}}
            resizeMode="contain"
          />
        </View>

        <View style={styles.header}>
          <Image
            source={require('../assets/4_2.jpg')}
            style={{
              width: '100%',
              height: 300,
              resizeMode: 'cover',
              marginTop: 5}}
            resizeMode="contain"
          />
        </View>
        <View style={styles.contactInfo}>
          <Image
            source={require('../assets/amano-supermercados-logo.jpg')}
            style={{
              width: '70%',
              height: 80,
              resizeMode: 'cover',
              marginTop: 10}}
            resizeMode="contain"
          />
          <Text style={styles.infoText}> Tu supermercado de confianza y calidad</Text>
          <Text style={styles.infoText}> Dirección: </Text>
          <Text style={styles.infoDetalle}> San Vicente del Raspeig, Alicante C/ Lillo Juan, 108</Text>
          <Text style={styles.infoText}> Email: </Text>
          <Text style={styles.infoDetalle}> contacto@amano.com</Text>
          <Text style={styles.infoText}> Telefono: </Text>
          <Text style={styles.infoDetalle}> 987 65 43 21</Text>
        </View>
      </ScrollView>
    </View>
);
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Fondo blanco
    paddingHorizontal: '7.5%', // Contenedor ocupa 85% del ancho total
  },
  contentContainer: {
    flexGrow: 1,
  },
  header: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  headerImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginTop: 10,
  },
  logoContainer: {
    marginTop: 20,
  },
  logoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20, // Separación entre íconos
  },
  textContainer: {
    marginLeft: 10,
  },
  logoText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
  },
  contactInfo: {
    marginTop: 20,
    marginBottom: 50, // Espacio para evitar que el contenido se oculte debajo del botón de desplazamiento en iOS
  },
  infoText: {
    fontSize: 13,
    fontWeight: 'bold',
    marginTop: 5,
  },
  infoDetalle:{
    fontSize: 13,
    fontWeight: 'normal',
  }
});
export default Initial