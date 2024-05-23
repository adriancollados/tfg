import React, { useState, useEffect } from 'react';
import { View, Text, Image, TextInput, Button, StyleSheet, Picker } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { ScrollView, TouchableOpacity } from 'react-native-web';
import CarouselArticulos  from '../components/ArticulosRelacionados';
import RenderImagen from '../components/RenderImage';
import { useCarrito } from '../components/CarritoContext';
import SuccessModal from '../components/ModalSucces';

const ProductDetails = ({}) => {
    const route = useRoute();
    const [quantity, setQuantity] = useState(1);
    const [comment, setComment] = useState('');
    const articulosRelacionados = route.params.articulosRelacionados;
    const [articuloDetail, setArticuloDetail] = useState(route.params.articulo);

    const [successModalVisible, setSuccessModalVisible] = useState(false);

    const showSuccessModal = () => {
      setSuccessModalVisible(true);
      setTimeout(() => {
        setSuccessModalVisible(false);
      }, 700);
    };

    const { agregarAlCarrito } = useCarrito();

    const handleCarrito = (articulo, comment, quantity) => {
        agregarAlCarrito(articulo, comment, quantity);
        showSuccessModal()
    };

    // Función para actualizar los detalles del artículo actual
    const actualizarArticuloActual = (nuevoArticulo) => {
        setArticuloDetail(nuevoArticulo);
    };

    const handleQuantityChange = (value) => {
        setQuantity(value);
    };

    const handleCommentChange = (value) => {
        setComment(value);
    };



    return (
        <View style={styles.contenedorPrincipal}>
            <ScrollView contentContainerStyle={styles.contenedorArticulos} showsVerticalScrollIndicator={false}>
                <SuccessModal visible={successModalVisible} onClose={() => setSuccessModalVisible(false)} />
                <View style={styles.cardContainer}>
                    <RenderImagen codigoArticulo={articuloDetail.CODARTICULO}/> 
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
                        <TouchableOpacity onPress={() => handleCarrito(articuloDetail, comment, quantity)} style={styles.botonAgregar}>
                            <Text style={styles.textoBoton}>Añadir al carrito</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.headerContainer}>
                    <View style={styles.descriptionContainer}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold' }}>Artículos Relacionados</Text>
                    </View>
                </View>
                <ScrollView contentContainerStyle={styles.contenedorArticulos}>
                    <View style={styles.cardContainer}>
                        <CarouselArticulos navigation={navigation} articulosRelacionados={articulosRelacionados} actualizarArticulo={actualizarArticuloActual}/>
                    </View>
                </ScrollView>

            </ScrollView>
        </View>
    );
};


const styles = StyleSheet.create({
    contenedorArticulos: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center', // Centra horizontalmente los elementos
    },
    contenedorPrincipal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardContainer: {
        justifyContent: 'center',
        alignItems: 'center', // Centra horizontalmente los elementos en la tarjeta
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
    image: {
        alignItems: 'center',
        width: 300,
        height: 300,
        marginTop: 20,
    },
    descriptionContainer: {
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'center',
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 10,
        width: '70%', // Cambiado de porcentaje a un valor absoluto
        alignItems: 'center',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        flex: 1, // Hace que el TextInput ocupe todo el espacio disponible
        marginRight: 10, // Espacio entre el Picker y el TextInput
    },
    relatedProductsContainer: {
        marginTop: 20,
    },
    botonAgregar: {
        justifyContent: 'center',
        height: 30,
        width: '120%',
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
    headerContainer: {
        marginTop: 20,
        marginBottom: 10,
        alignItems: 'center',
        height: 40,
    }
});
    

export default ProductDetails;
