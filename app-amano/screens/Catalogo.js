import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchArticulos } from '../services/articulos';

const ArticuloItem = ({ articulo, onPressArticulo }) => {
  // Convertir los datos de la imagen a un URI de imagen
  const uriImagen = `data:image/jpeg;base64,${Buffer.from(articulo.IMAGEN.data).toString('base64')}`;

  return (
    <TouchableOpacity onPress={onPressArticulo} style={styles.articuloContainer}>
      <View style={styles.imagenContainer}>
        <Image source={{ uri: uriImagen }} style={styles.imagen} />
      </View>
      <View style={styles.detalleContainer}>
        <Text style={styles.descripcion}>{articulo.DESCRIPCION}</Text>
        <Text style={styles.precio}>Precio: ${articulo.PVPNETO}</Text>
        <TouchableOpacity style={styles.botonAgregar}>
          <Text style={styles.textoBoton}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

const Catalogo = ({navigation, codigoDepartamento}) => {
  const [articulos, setArticulos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() =>{
    const obtenerArticulos = async () => {
      try {
        const data = await fetchArticulos();

        data.forEach(articulo => {
          articulos.push(articulo)
        });
        console.log(articulos.length);
      } catch (error) {
        console.error('Error al obtener los articulos:', error);
        setError('Error al obtener las articulos. Inténtalo de nuevo más tarde.');
      }
    };
    obtenerArticulos();
  }, []);
    

  const onPressArticulo = (id) => {
    // Aquí iría la lógica para redirigir a la pantalla de detalles del artículo
    navigation.navigate('DetallesArticulo', { id: articulos.id });
  };

  const renderArticulos = (articulos) => {
    return articulos.map(articulo => (
    <TouchableOpacity onPress={onPressArticulo} style={styles.articuloContainer}>
      <View style={styles.imagenContainer}>
        <Image  style={styles.imagen} />
      </View>
      <View style={styles.detalleContainer}>
        <Text style={styles.descripcion}>{articulo.DESCRIPCION}</Text>
        <Text style={styles.precio}>Precio: ${}</Text>
        <TouchableOpacity style={styles.botonAgregar}>
          <Text style={styles.textoBoton}>Añadir al carrito</Text>
        </TouchableOpacity>
      </View>
  </TouchableOpacity>))
  }

  return (
    <ScrollView>
        {renderArticulos(articulos)}
    </ScrollView>
    
  );
};

const styles = StyleSheet.create({
  articuloContainer: {
    width: '50%', // Esto hará que cada artículo ocupe la mitad del ancho del contenedor padre
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
    width: '100%', // Haz que la imagen ocupe el 100% del contenedor padre
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
