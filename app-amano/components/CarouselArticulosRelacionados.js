import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView } from 'react-native-web';


const CarouselArticulos = ({navigation, articulos}) => {
    const route = useRoute();
  

    const onPressArticulo = (articulo, articulos) => {
        // Aquí iría la lógica para redirigir a la pantalla de detalles del artículo
        return navigation.navigate('DetallesArticulo', { articulo,  articulos});
    };

    // Renderizar un elemento del carrusel de productos relacionados
    const renderRelatedProductItem = (articulos) => {
        return articulos.map(articulo => (
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
            </TouchableOpacity>
          ))
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            {renderRelatedProductItem(articulos)}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    articuloContainer: {
        width: '48%', // Cada artículo ocupa el 48% del contenedor de los artículos para dejar espacio entre ellos
        marginBottom: '3%', // Espacio entre los artículos
      },
    // Estilos para los elementos del carrusel de productos relacionados
    relatedProductItem: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    relatedProductImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    // Resto de estilos...
});

export default CarouselArticulos;