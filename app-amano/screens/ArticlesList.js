import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView , ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchArticulos } from '../services/articulos';
import { useRoute } from '@react-navigation/native';

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

const Catalogo = ({navigation}) => {
  const [articulos, setArticulos] = useState([]);
  const [error, setError] = useState(null);
  const route = useRoute();
  const codigoDepartamento = route.params.codigoDepartamento;
  const cod_padre = route.params.cod_padre

  useEffect(() =>{
    const obtenerArticulos = async () => {
      try {
        const data = await fetchArticulos();
        setArticulos([...data]); 
      } catch (error) {
        console.error('Error al obtener los articulos:', error);
        setError('Error al obtener las articulos. Inténtalo de nuevo más tarde.');

      }
    };
    obtenerArticulos();
    setInterval(1000)
  }, [codigoDepartamento, cod_padre]);


  const arrayBufferToBase64 = (arrayBuffer) => {
    const bytes = new Uint8Array(arrayBuffer);
    const binary = bytes.reduce((acc, byte) => acc + String.fromCharCode(byte), '');
    return btoa(binary);
  };

  const obtenerRelacionados = (articulos) => {
    return articulos.filter(articulo => {
      if (cod_padre === 0) {
        return articulo.CODDEPARTAMENTO === codigoDepartamento
      } else {
        // Verificar si el código del artículo es igual al código del padre y si el DEP_PADRE es igual al código del departamento
        return articulo.CODDEPARTAMENTO === cod_padre && articulo.DEP_PADRE === codigoDepartamento;
      }})
  }
    

  const onPressArticulo = (articulo, articulos) => {
    const articulosRelacionados = obtenerRelacionados(articulos);
    // Aquí iría la lógica para redirigir a la pantalla de detalles del artículo
    return navigation.navigate('DetallesArticulo', { articulo,  articulosRelacionados});
  };

  const renderArticulos = (articulos) => {

    return articulos.filter(articulo => {
      if (cod_padre === 0) {
        return articulo.CODDEPARTAMENTO === codigoDepartamento
      } else {
        // Verificar si el código del artículo es igual al código del padre y si el DEP_PADRE es igual al código del departamento
        return articulo.CODDEPARTAMENTO === cod_padre && articulo.DEP_PADRE === codigoDepartamento;
      }
    }).map(articulo => (
        <TouchableOpacity onPress={() => onPressArticulo(articulo, articulos)} style={styles.articuloContainer} key={articulo.CODARTICULO}>
          <View style={styles.imagenContainer}>
            <Image src={{ uri: ''}} style={styles.imagen} />
          </View>
          <View style={styles.detalleContainer}>
            <Text style={styles.descripcion}>{articulo.DESCRIPCION}</Text>
            <Text style={styles.precio}>Precio: {articulo.PVPNETO}€</Text>
            <TouchableOpacity style={styles.botonAgregar}>
              <Text style={styles.textoBoton}>Añadir al carrito</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>))
  }


  return (
    <View style={styles.contenedorPrincipal}>
      <ScrollView contentContainerStyle={styles.contenedorArticulos}>
          {renderArticulos(articulos)}
      </ScrollView>
    </View>
    
  );
};

const styles = StyleSheet.create({
  contenedorPrincipal: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: '10%',
  },
  contenedorArticulos: {
    width: '100%', // El contenedor de los artículos ocupa todo el ancho disponible en el contenedor principal
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  articuloContainer: {
    width: '48%', // Cada artículo ocupa el 48% del contenedor de los artículos para dejar espacio entre ellos
    marginBottom: '3%', // Espacio entre los artículos
  },
  imagen: {
    width: '100%', // La imagen dentro de cada artículo ocupa el 100% de su contenedor
    aspectRatio: 1, // Mantener la relación de aspecto de la imagen (cuadrada)
    borderRadius: 10,
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
    backgroundColor: '#C00A21',
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
