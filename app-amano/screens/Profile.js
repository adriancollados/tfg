import { View, Text, StyleSheet, Image, TouchableOpacity,FlatList  } from 'react-native'
import React , { useState, useEffect } from 'react'
import { obtenerUsuario } from '../services/users';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Desplegable } from '../components/DesplegablesPerfil';
import { ScrollView } from 'react-native-web';

const Profile = ({handleLogout}) => {
  const [usuario, setUsuario] = useState(null);
  const [error, setError] = useState(null);
  const [reloadUserData, setReloadUserData] = useState(false);
  const userId = localStorage.getItem('user');



  useEffect(() => {
    console.log(userId);
    obtenerUsuario(userId)
      .then((data) => {
        setUsuario(data); 
      })
      .catch((error) => {
        setError(error);
      });
  }, [userId, reloadUserData]);

  const handleUpdateUserData =() => {
    setReloadUserData(true)
  }
  const handleLogoutPress = () => {
    // Limpiar variables de localStorage
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    // Cualquier otra variable que necesites limpiar
    // ...

    // Llamar a la función de logout del prop
    handleLogout();
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.containerLogo}>
        <View style={styles.iconoUsuario}>
          <MaterialCommunityIcons name="account" size={200} color="black" />
        </View>
        <Text style={styles.nombreUsuario}>{usuario?.NOMBRECLIENTE}</Text>
      </View>
      

      <Desplegable titulo="Datos personales" children={usuario} onUpdateUserData={handleUpdateUserData}></Desplegable>
      <Desplegable titulo="Historial de pedidos" children={usuario}></Desplegable>
      <Desplegable titulo="Mis puntos" children={usuario}></Desplegable>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogoutPress}>
          <Text style={styles.logoutButtonText}>Cerrar sesión</Text>
      </TouchableOpacity>
    </ScrollView>
    
  );


};
/*
<View style={styles.container}>
      {usuario ? (
        <>
          <View style={styles.iconoUsuario}>
            <MaterialCommunityIcons name="account" size={200} color="white" />
          </View>
          <Text style={styles.nombreUsuario}>{usuario.NOMBRECLIENTE}</Text>
          <TouchableOpacity onPress={() => setMostrarDatosPersonales(!mostrarDatosPersonales)}>
              <Text style={styles.seccionTitulo}>Datos personales</Text>
            </TouchableOpacity>
            {mostrarDatosPersonales && (
              <View style={styles.desplegableContenido}>
                <Text>{`Email: ${usuario.E_MAIL}`}</Text>
                <Text>{`Teléfono: ${usuario.TELEFONO1}`}</Text>
                <Text>{`DNI: ${usuario.CIF}`}</Text>
                <Text>{`Dirección: ${usuario.DIRECCION1}`}</Text>
                <Text>{`Población: ${usuario.POBLACION}`}</Text>
                <Text>{`Provincia: ${usuario.PROVINCIA}`}</Text>
                <Text>{`Código postal: ${usuario.CODPOSTAL}`}</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => setMostrarHistorialPedidos(!mostrarHistorialPedidos)}>
              <Text style={styles.seccionTitulo}>Historial de pedidos</Text>
            </TouchableOpacity>
            {mostrarHistorialPedidos && (
              <View style={styles.desplegableContenido}>
                {/* Aquí puedes mostrar la lista de historial de pedidos }
                <Text>Historial de pedidos...</Text>
              </View>
            )}
            <TouchableOpacity onPress={() => setMostrarMisPuntos(!mostrarMisPuntos)}>
              <Text style={styles.seccionTitulo}>Mis puntos</Text>
            </TouchableOpacity>
            {mostrarMisPuntos && (
              <View style={styles.desplegableContenido}>
                <Text>{`Tienes un total de: ${usuario.PUNTOS}`}</Text>
              </View>
            )}
          </>
        ) : (
          <Text>{error || 'Cargando...'}</Text>
        )}
    </View>
*/



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 7,
  },
  containerLogo: {
    marginTop: 10,
    flex: 1,
    paddingHorizontal: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconoUsuario: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 2,
    borderColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  nombreUsuario: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    backgroundColor: '#eee',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoTitulo: {
    fontWeight: 'bold',
    color: 'white',
  },
  seccionTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    marginTop: 10,
  },
  desplegableContenido: {
    marginLeft: 20,
    marginTop: 5,
  },
  logoutButton: {
    backgroundColor: '#C00A21',
    padding: 15,
    borderRadius: 30,
    marginTop: 50,
    alignSelf: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Profile