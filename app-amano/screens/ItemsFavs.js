import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react';
import SuccessModal from '../components/ModalSucces';
import { obtenerArticulosFavs } from '../services/users';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ItemsFavs = () => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);
  const [favList, setFavList] = useState([])
  const [isFavList, setIsFavList] = useState(true)

  useEffect(() => {
    const getArticulos = async () =>{
      try{
        const data = await obtenerArticulosFavs()
        setFavList([...data])
        setIsFavList(false)
      }
      catch(e){
        console.error(e)
      }
    } 
    
    getArticulos()
  }, [])


  const showSuccessModal = () => {
    setSuccessModalVisible(true);
    setTimeout(() => {
      setSuccessModalVisible(false);
    }, 700);
  };

  const RenderImagen = ({ codigoArticulo }) => {
    try {
      const imagen = require(`../ECOMMERCE/${codigoArticulo}.jpg`);
      return <Image source={imagen} style={styles.itemImage} />;
    } catch (error) {
      return <Image source={''} style={styles.itemImage} />; // Imagen por defecto
    }
  };
  const handleCarrito = (articulo, comment, quantity) => {
    agregarAlCarrito(articulo, comment, quantity);
    showSuccessModal()
  };

  function renderItem({ item }) {
    console.log(item);
    return (
      <View style={styles.itemContainer}>
        <RenderImagen codigoArticulo={item.CODARTICULO} />
        <View style={styles.itemDetails}>
          <Text style={styles.itemDescription}>{item.DESCRIPCION}</Text>
          <Text style={styles.itemPrice}>{(item.PVPNETO *1).toFixed(2)} €</Text>
          <TouchableOpacity onPress={() => toggleFavorito(articulo)} style={styles.estrellaContainer}>
            <Icon name={favList.includes(item.CODARTICULO) ? 'star' : 'star-outline'} size={24} color={favList.includes(item) ? '#FFD700' : '#CCCCCC'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.botonAgregar} onPress={() => handleCarrito(item, '', 1)}>
            <Text style={styles.textoBoton}>Añadir al carrito</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
  function renderIsFavList() {
    return(<View style={styles.emptyList}>
      <Text style={{fontSize: 24,
          fontWeight: 'bold', textAlign: 'center',}}>Aun no tienes artículos favoritos. ¡Añade alguno en el catálogo!</Text>
      </View>)
  }
  return(
    <View style={styles.container}>
      <SuccessModal visible={successModalVisible} onClose={() => setSuccessModalVisible(false)} />
      {!isFavList && renderIsFavList()}
      <FlatList
        data={favList}
        renderItem={renderItem}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  )
}

export default ItemsFavs

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
    marginTop: 10
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
  botonAgregar: {
    backgroundColor: '#C00A21',
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 10,
    width: '60%',
    paddingLeft: 10,
  },
  textoBoton: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  emptyList:{
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'center',
    padding: 10,
    marginTop: 80,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    height: 300
  }
})