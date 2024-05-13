import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useCarrito } from '../components/CarritoContext';

function CarritoScreen() {
  const { carrito, eliminarDelCarrito, incrementarCantidad, reducirCantidad } = useCarrito();

  const RenderImagen = (codigoArticulo) => {
    try {
      console.log(codigoArticulo)
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

  function renderItem({ item }) {
    const precioTotal = item.articulo.PVPNETO * item.cantidad;

    return (
      <View style={styles.item}>
        {RenderImagen(item.articulo.CODARTICULO)}
        <View style={styles.detalle}>
          <Text style={styles.nombre}>{item.articulo.DESCRIPCION}</Text>
          {item.comentario && <Text style={styles.comentario}>{item.comentario}</Text>}
          <View style={styles.cantidadContainer}>
            <TouchableOpacity onPress={() => reducirCantidad(item.cantidad)}>
              <Text style={styles.cantidadBoton}>-</Text>
            </TouchableOpacity>
            <Text style={styles.cantidad}>{item.cantidad}</Text>
            <TouchableOpacity onPress={() => incrementarCantidad(item.cantidad)}>
              <Text style={styles.cantidadBoton}>+</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.precio}>{precioTotal} €</Text>
          <TouchableOpacity onPress={() => eliminarDelCarrito(item)}>
            <Text style={{ color: 'red' }}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Carrito de compras</Text>
      <FlatList
        data={carrito}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imagen: {
    width: 100,
    height: 100,
    marginRight: 10,
  },
  detalle: {
    flex: 1,
  },
  nombre: {
    fontSize: 16,
    marginBottom: 5,
  },
  comentario: {
    marginBottom: 5,
    fontStyle: 'italic',
  },
  cantidadContainer: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  cantidadBoton: {
    fontSize: 20,
    marginRight: 5,
    color: 'blue',
  },
  cantidad: {
    fontSize: 16,
    marginRight: 5,
  },
  precio: {
    fontWeight: 'bold',
  },
});

export default CarritoScreen;