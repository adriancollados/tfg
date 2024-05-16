import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Button, Modal, TextInput, Alert } from 'react-native';
import { useCarrito } from '../components/CarritoContext';
import {makePayment} from '../services/payment'
import base64 from 'react-native-base64';
import RedsysWebView from '../components/Redsys.Component';
import swal from 'sweetalert2';
import { useRoute } from '@react-navigation/native';


function CarritoScreen() {
  const route = useRoute()
  const { params } = route;
  const { carrito, eliminarDelCarrito, incrementarCantidad, reducirCantidad } = useCarrito();
  const [modalVisible, setModalVisible] = useState(false);
  const [nombre, setNombre] = useState('');
  const [direccion, setDireccion] = useState('');
  const [codigoPostal, setCodigoPostal] = useState('');
  const [horaEntrega, sethoraEntrega] = useState('');
  const [showWebView, setShowWebView] = useState(params?.showWebView ?? false);
  const [pedido, setPedido] = useState('');

 

  const calcularTasaTransporte = (subtotal) => {
    if (subtotal < 20) {
      return 4.50;
    } else if (subtotal < 30) {
      return 3.25;
    } else if (subtotal < 60) {
      return 1.50;
    } else {
      return 0;
    }
  };


  const handlePayment = async () => {
      setModalVisible(false)

      if (/^\d+$/.test(codigoPostal) && codigoPostal.length === 5) {
        setCodigoPostal(codigoPostal);
      }
      else {
        Alert.alert('Error', 'El código postal debe ser numérico y tener una longitud de 5 dígitos.');
      }

      if (/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(horaEntrega)) {
        sethoraEntrega(horaEntrega);
      }
      else {
        Alert.alert('Error', 'Por favor ingresa la hora de entrega en formato HH:MM.');
      }



      // Datos del pedido
      const aux = {
        user: localStorage.getItem('user'),
        nombre,
        direccion,
        codigoPostal,
        horaEntrega,
        total,
        carrito
      };
      const encoded = base64.encode(JSON.stringify(aux))
      setPedido(encoded)
      console.log(pedido)
      setShowWebView(true)
      
  };

  const closeModal= () => {
    setModalVisible(false)
  }


  const totalArticulos = carrito.reduce((total, item) => total + item.cantidad, 0);
  const subtotal = carrito.reduce((total, item) => total + item.articulo.PVPNETO * item.cantidad, 0);
  const tasaTransporte = calcularTasaTransporte(subtotal);
  const total = subtotal + tasaTransporte;

  const RenderImagen = ({ codigoArticulo }) => {
    try {
      const imagen = require(`../ECOMMERCE/${codigoArticulo}.jpg`);
      return <Image source={imagen} style={styles.itemImage} />;
    } catch (error) {
      return <Image source={''} style={styles.itemImage} />; // Imagen por defecto
    }
  };

  function renderItem({ item }) {
    return (
      <View style={styles.itemContainer}>
        
        <RenderImagen codigoArticulo={item.articulo.CODARTICULO} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemDescription}>{item.articulo.DESCRIPCION}</Text>
          {item.comentario && <Text style={styles.itemComment}>{item.comentario}</Text>}
          <View style={styles.itemActions}>
            <TouchableOpacity onPress={() => reducirCantidad(item)}>
              <Text style={styles.cantidadBoton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.cantidad}>{item.cantidad}</Text>
            <TouchableOpacity onPress={() => incrementarCantidad(item)}>
              <Text style={styles.cantidadBoton}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.itemPrice}>{(item.articulo.PVPNETO * item.cantidad).toFixed(2)} €</Text>
          <TouchableOpacity onPress={() => eliminarDelCarrito(item)}>
            <Text style={styles.removeButton}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detalles del carrito</Text>
      <FlatList
        data={carrito}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
      <View style={styles.summaryContainer}>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>{totalArticulos} Artículos</Text>
          <Text style={styles.summaryText}>{subtotal.toFixed(2)} €</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryText}>Transporte</Text>
          <Text style={styles.summaryText}>+{tasaTransporte.toFixed(2)} €</Text>
        </View>
        <View style={styles.summaryRow}>
          <Text style={styles.summaryTotal}>Total (Impuestos Inc.)</Text>
          <Text style={styles.summaryTotal}>{total.toFixed(2)} €</Text>
        </View>
        <TouchableOpacity style={styles.checkoutButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.checkoutButtonText}>Pasar por caja</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Información de Envío</Text>
            <TextInput
              style={styles.input}
              placeholder="Nombre"
              value={nombre}
              onChangeText={setNombre}
            />
            <TextInput
              style={styles.input}
              placeholder="Dirección"
              value={direccion}
              onChangeText={setDireccion}
            />
            <TextInput
              style={styles.input}
              placeholder="Código Postal Ej. 12345"
              value={codigoPostal}
              onChangeText={setCodigoPostal}
              keyboardType="number"
            />
            <TextInput
                style={styles.input}
                placeholder="Hora de la entrega HH:MM"
                value={horaEntrega}
                onChangeText={sethoraEntrega}
              />
            <View style={styles.modalActions}>
              <Button title="Cancelar" onPress={() => setModalVisible(false)} />
              <Button title="Confirmar" onPress={handlePayment} />
            </View>
          </View>
        </View>
      </Modal>
       <Modal visible={showWebView} transparent={true} animationType='fade' onRequestClose={() => setShowWebView(false)}>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={() => setShowWebView(false)}>
            <Text>X</Text>
          </TouchableOpacity>
          <View style={styles.modalContent}>
            <RedsysWebView pedido={pedido} onWebViewClose={() => setShowWebView(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  itemDetails: {
    flex: 1,
  },
  itemDescription: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemComment: {
    fontStyle: 'italic',
    color: '#555',
    marginBottom: 5,
  },
  itemActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  cantidadBoton: {
    fontSize: 18,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    textAlign: 'center',
  },
  cantidad: {
    fontSize: 16,
    marginHorizontal: 10,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 'auto',  // Move to the right
    textAlign: 'right',
  },
  removeButton: {
    color: 'red',
    marginTop: 5,
  },
  summaryContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginTop: 20,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  summaryText: {
    fontSize: 16,
    color: '#000',
  },
  summaryTotal: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  checkoutButton: {
    backgroundColor: '#000',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});

export default CarritoScreen;
