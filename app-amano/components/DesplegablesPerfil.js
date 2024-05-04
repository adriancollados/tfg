import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importa el icono de MaterialIcons

export const Desplegable = ({ titulo, children }) => {
  const [abierto, setAbierto] = useState(false);
  // Verificar si hay datos de usuario
  const esDatosPersonales = titulo === "Datos personales" && children !== undefined;
  // Verificar si se trata de historial de pedidos
  const esHistorialPedidos = titulo === "Historial de pedidos";
  // Verificar si se trata de los puntos del usuario
  const esMisPuntos = titulo === "Mis puntos";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.cabecera}
        onPress={() => setAbierto(!abierto)}
      >
        <Text style={styles.titulo}>{titulo}</Text>
        <MaterialIcons
          name={abierto ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
          size={24}
          color="black"
        />
      </TouchableOpacity>
      {abierto && (
        <View style={styles.contenido}>
          {esDatosPersonales && (
            <View>
              <Text>{`Email: ${children.E_MAIL}`}</Text>
              <Text>{`Teléfono: ${children.TELEFONO1}`}</Text>
              <Text>{`DNI: ${children.CIF}`}</Text>
              <Text>{`Dirección: ${children.DIRECCION1}`}</Text>
              <Text>{`Población: ${children.POBLACION}`}</Text>
              <Text>{`Provincia: ${children.PROVINCIA}`}</Text>
              <Text>{`Código postal: ${children.CODPOSTAL}`}</Text>
            </View>
          )}
          {esHistorialPedidos && (
            <View>
              {/* Mostrar historial de pedidos */}
              <Text>Historial de pedidos...</Text>
            </View>
          )}
          {esMisPuntos && (
            <View>
              {/* Mostrar puntos del usuario */}
              <Text>{`Tienes un total de: ${children} puntos`}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    backgroundColor: '#C00A21'
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  titulo: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contenido: {
    padding: 10,
    backgroundColor: 'white',
  },
});

