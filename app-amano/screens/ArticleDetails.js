import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-web';
import CarouselArticulos  from '../components/CarouselArticulosRelacionados';


const ProductDetails = ({}) => {
    const route = useRoute();
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState('');
    const articuloDetail = route.params.articulo;
    const articulosRelacionados = route.params.articulosRelacionados;


    const handleQuantityChange = (value) => {
        setQuantity(value);
    };

    const handleCommentChange = (value) => {
        setComment(value);
    };

    const addToCart = () => {
        // Lógica para añadir el producto al carrito
    };

    return (
        <ScrollView contentContainerStyle={styles.mainContainer}>
            <View style={styles.cardContainer}>
                <Image
                    source={{ uri: '' }}
                    style={styles.image}
                />
                <View style={styles.descriptionContainer}>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>{articuloDetail.DESCRIPCION}</Text>
                        <Text>{articuloDetail.UNIDADMEDIDA}</Text>
                    </View>
                    <Text style={{ marginLeft: 20, fontSize: 25, fontWeight: 'bold' }}>{articuloDetail.PVPNETO}€</Text>
                </View>
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 16,fontWeight: 'bold'}}>Cantidad:</Text>
                    <Picker
                        selectedValue={quantity}
                        style={{ height: 30, width: '20%' }}
                        onValueChange={(itemValue, itemIndex) => handleQuantityChange(itemValue)}
                        >
                        <Picker.Item label="1" value={1} />
                        <Picker.Item label="2" value={2} />
                        <Picker.Item label="3" value={3} />
                        <Picker.Item label="4" value={4} />
                        <Picker.Item label="5" value={5} />
                        <Picker.Item label="6" value={6} />
                    </Picker>
                </View>
                {articuloDetail.UNIDADMEDIDA != null &&
                <View style={styles.inputContainer}>
                    <Text style={{ fontSize: 16,fontWeight: 'bold'}}>Comentario:</Text>
                    <TextInput
                        style={[styles.input, { height: 50, width: '75%'}]}
                        onChangeText={handleCommentChange}
                        value={comment}
                        multiline
                    />
                </View>}
                <View style={styles.addToCartContainer}>
                    <TouchableOpacity onPress={addToCart} style={styles.botonAgregar}>
                        <Text style={styles.textoBoton}>Añadir a la cesta</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <ScrollView contentContainerStyle={styles.cardContainer}>
                <CarouselArticulos navigation={navigation} articulos={articulosRelacionados}/>
            </ScrollView>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        alignItems: 'center',
    },
    cardContainer: {
        justifyContent: 'center',
        marginTop: 30,
        width: '85%',
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2
    },
    contenedorArticulos: {
        width: '100%', // El contenedor de los artículos ocupa todo el ancho disponible en el contenedor principal
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    image: {
        width: 200,
        height: 200,
        marginTop: 20,
    },
    descriptionContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    inputContainer: {
        display: 'flex',
        marginBottom: 10,
        marginTop: 10,
        alignItems: 'center',
    },
    input: {
        width: '70%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        width: 100,
    },
    relatedProductsContainer: {
        marginTop: 20,
    },
    botonAgregar: {
        justifyContent: 'center',
        height: 30,
        width: '60%',
        backgroundColor: '#C00A21',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center'
    },
    textoBoton: {
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    addToCartContainer: {
        alignItems: 'center',
    },
});

export default ProductDetails;
