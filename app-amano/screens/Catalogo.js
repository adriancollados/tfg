import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchArticulos } from '../services/articulos';

const Catalogo = ({navigation}) => {
  const [articulos, setArticulos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const obtenerArticulos = async () => {
        try {
          const data = await fetchArticulos();
          setArticulos(data);
        } catch (error) {
          console.error('Error al obtener los articulos:', error);
          setError('Error al obtener las articulos. Inténtalo de nuevo más tarde.');
        }
      };
  
      obtenerArticulos();
    }, []);

    

  /*const onPressArticulo = () => {
    // Aquí iría la lógica para redirigir a la pantalla de detalles del artículo
    navigation.navigate('DetallesArticulo', { id: articulos.id });
  };*/

  return (
    <ScrollView >
      <View>
        <Text>Estoy en articulos </Text>
      </View>
        {/*{articulos.filter(articulo => articulo.CODDEPARTAMENT === coddepartamento).map(articulo => (
            <TouchableOpacity onPress={onPressArticulo} style={styles.articuloContainer}>
                <View style={styles.imagenContainer}>
                    <Image source={{ uri: articulo.imagen }} style={styles.imagen} />
                </View>
                <View style={styles.detalleContainer}>
                    <Text style={styles.descripcion}>{articulo.descripcion}</Text>
                    <Text style={styles.precio}>Precio: ${articulo.precio}</Text>
                    <TouchableOpacity style={styles.botonAgregar}>
                        <Text style={styles.textoBoton}>Añadir al carrito</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        ))}*/}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  articuloContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginBottom: 10,
    padding: 10,
    elevation: 3,
  },
  imagenContainer: {
    marginRight: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  detalleContainer: {
    flex: 1,
  },
  descripcion: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  precio: {
    fontSize: 14,
    marginBottom: 5,
  },
  botonAgregar: {
    backgroundColor: '#FF5733',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});

export default Catalogo;
