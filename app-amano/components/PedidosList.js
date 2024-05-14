import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-web';
import { obtenerPedidosCliente , obtenerDetallesPedidosCliente} from '../services/users';

const ListaPedidos = ({ }) => { 
    const [historialPedidos, setHistorialPedidos] = useState([]);
    const [pedidoSeleccionado, setPedidoSeleccionado] = useState(null);
    const [detallesPedidos, setDetallesPedidos] = useState([])

    useEffect(() => {
        obtenerPedidosCliente()
            .then((data) => {
                setHistorialPedidos(data); 
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    
    // Función para manejar la selección de un pedido
    const handleSeleccionPedido = (pedido) => {
        console.log(pedido.CODPEDIDO)
        obtenerDetallesPedidosCliente(pedido.CODPEDIDO)
            .then((data) => {
                console.log(data)
                setDetallesPedidos(data); 
            })
            .catch((error) => {
                console.log(error);
            });
        setPedidoSeleccionado(pedido);
    };

    // Función para cerrar el modal
    const handleCloseModal = () => {
        setPedidoSeleccionado(null);
    };

    return (
        <ScrollView>
            <View style={styles.tableContainer}>
                <View style={styles.tableRow}>
                    <Text style={styles.headerCell}>Fecha</Text>
                    <Text style={styles.headerCell}>Importe</Text>
                    <Text style={styles.headerCell}>Estado</Text>
                </View>
                {historialPedidos.map((pedido) => (
                    <TouchableOpacity 
                        key={pedido.CODPEDIDO} 
                        onPress={() => handleSeleccionPedido(pedido)} 
                        style={styles.tableRow}
                    >
                        <Text style={styles.cell}>{pedido.FECHAPEDIDO.split('T')[0]}</Text>
                        <Text style={styles.cell}>{pedido.PVPTOTAL}€</Text>
                        <Text style={styles.cell}>{pedido.STATUS_PEDIDO}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            {/* Modal para mostrar detalles del pedido */}
            <Modal
                visible={pedidoSeleccionado !== null}
                animationType="slide"
                transparent={true}
                onRequestClose={handleCloseModal}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <ScrollView contentContainerStyle={styles.modalContent}>
                            {/* Contenido del modal */}
                            {pedidoSeleccionado && (
                                <>
                                    <Text style={styles.subtitulo}>Productos:</Text>
                                    <View style={styles.tableContainer}>
                                        <View style={styles.tableRow}>
                                            <Text style={styles.headerCell}>Descripción</Text>
                                            <Text style={styles.headerCell}>Cantidad</Text>
                                            <Text style={styles.headerCell}>Precio Unitario</Text>
                                            <Text style={styles.headerCell}>Comentario</Text>
                                        </View>
                                        {detallesPedidos.map((pedido) => (
                                            <View key={pedido.CODPEDIDO} style={styles.tableRow}>
                                                <Text style={styles.cell}>{pedido.DESCRIPCION}</Text>
                                                <Text style={styles.cell}>{pedido.CANTIDAD}</Text>
                                                <Text style={styles.cell}>{pedido.PVP}€</Text>
                                                <Text style={styles.cell}>{pedido.COMENTARIO || '-'}</Text>
                                            </View>
                                        ))}
                                    </View>
                                    <TouchableOpacity onPress={handleCloseModal}>
                                        <Text style={styles.closeButton}>Cerrar</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </ScrollView>
    );
}

export default ListaPedidos;

const styles = StyleSheet.create({
    tableContainer: {
        flex: 1,
        padding: 10,
    },
    tableRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingVertical: 20,
    },
    headerCell: {
        fontWeight: 'bold',
        flex: 1, // Esto hace que las celdas se expandan igualmente
        paddingHorizontal: 5,
    },
    cell: {
        flex: 1, // Esto hace que las celdas se expandan igualmente
        paddingHorizontal: 5,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      modalContainer: {
        width: '90%',
        maxHeight: '70%',  // Asegura que el modal no ocupe más del 80% de la altura de la pantalla
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 10,
      },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
        justifyContent: 'space-between',
    },
    closeButton: {
        alignSelf: 'flex-end',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    subtitulo: {
        marginTop: 10,
        marginBottom: 5,
        fontWeight: 'bold',
    },
});
