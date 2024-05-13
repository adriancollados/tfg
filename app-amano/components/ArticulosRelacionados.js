import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-web';


const CarouselArticulos = ({navigation, articulosRelacionados, actualizarArticulo }) => {
    const route = useRoute();


    const onPressArticulo = (articulo) => {
        // Actualizar el artículo actual en DetallesPedido
        actualizarArticulo(articulo);
    };

    const RenderImagen = (codigoArticulo) => {
        try {
          return (
            <Image
              source={require(`../ECOMMERCE/${codigoArticulo}.jpg`)}
              style={styles.imagen}
            />
          );
        } catch (error) {
          return <Image uri ={''} style={styles.imagen}/>; // Retorna null si la imagen no puede ser encontrada
        }
      };
    
    
    // Renderizar un elemento del carrusel de productos relacionados
    const renderRelatedProductItem = (articulos) => {
        return articulos.slice(4,10).map(articulo => (
            <TouchableOpacity onPress={() => onPressArticulo(articulo, articulosRelacionados)} style={styles.articuloContainer} key={articulo.CODARTICULO}>
                <View style={styles.imagenContainer}>
                    {RenderImagen(articulo.CODARTICULO)}
                </View>
                <View style={styles.detalleContainer}>
                    <Text style={styles.descripcion}>{articulo.DESCRIPCION}</Text>
                    <Text style={styles.precio}>Precio: {articulo.PVPNETO}€</Text>
                </View>
            </TouchableOpacity>
          ))
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {renderRelatedProductItem(articulosRelacionados)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    articuloContainer: {
        flexDirection: 'row', // Establecer el flujo de dirección como fila para colocar la imagen a la izquierda y la descripción y precio a la derecha
        marginBottom: '3%', // Espacio entre los artículos
      },
      imagenContainer: {
        marginRight: 10, // Espacio entre la imagen y el detalle
      },
      imagen: {
        width: 100, // Tamaño de la imagen
        height: 100, // Tamaño de la imagen
        borderRadius: 5, // Bordes redondeados de la imagen
      },
      detalleContainer: {
        flex: 1, // El contenedor de detalle se expandirá para ocupar el espacio restante
      },
      descripcion: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
      },
      precio: {
        fontSize: 14,
        marginBottom: 5,
      }
});

export default CarouselArticulos;