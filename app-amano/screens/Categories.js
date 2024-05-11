import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchCategorias } from '../services/categories';
import { MaterialIcons } from '@expo/vector-icons'; // Importa el icono de MaterialIcons

const CategoriaItem = ({ categoria, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.categoriaItem}>
      <Text >{categoria.DESCRIPCION} </Text>
    </TouchableOpacity>
  );
};

const SubcategoriaItem = ({ subcategoria, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text>{subcategoria.DESCRIPCION}</Text>
    </TouchableOpacity>
  );
};

const Categories = ({navigation}) => {
  const [categorias, setCategorias] = useState([]);
  const [categoriaExpandido, setCategoriaExpandido] = useState({});
  const [tieneSubcategorias, setTieneSubcategorias] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerCategorias = async () => {
      try {
        const data = await fetchCategorias();
        setCategorias(data);
      } catch (error) {
        console.error('Error al obtener las categorías:', error);
        setError('Error al obtener las categorías. Inténtalo de nuevo más tarde.');
      }
    };

    obtenerCategorias();
  }, []);

  
  const onPressCategoria = (codigoDepartamento) => {
      setCategoriaExpandido(prevState => ({
        ...prevState,
        [codigoDepartamento]: !prevState[codigoDepartamento]
      }))
      
      const tieneSubcategorias = categorias.some(subcategoria => subcategoria.DEP_PADRE === codigoDepartamento);
      if(!tieneSubcategorias){
        return navigation.navigate("Catalogo", codigoDepartamento= codigoDepartamento)
      }
    };

  

  const renderSubcategorias = (codigoDepartamento) => {
    const subcategorias = categorias.filter(subcategoria => subcategoria.DEP_PADRE === codigoDepartamento);
    return subcategorias.map(subcategoria => (
      <SubcategoriaItem key={subcategoria.CODDEPARTAMENTO} subcategoria={subcategoria} onPress={() => navigation.navigate("Catalogo", codigoDepartamento = subcategoria.CODDEPARTAMENTO)} style={styles.subcategoriaItem}/>
    ));
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {categorias.filter(categoria => categoria.DEP_PADRE === 0).map(categoria => (
        <View key={categoria.CODDEPARTAMENTO} style={styles.categoriaContainer}>
          <CategoriaItem
            key={categoria.CODDEPARTAMENTO}
            categoria={categoria}
            onPress={() => onPressCategoria(categoria.CODDEPARTAMENTO)}
            tieneSubcategorias={categorias.some((subcategoria) => subcategoria.DEP_PADRE === categoria.CODDEPARTAMENTO)}
           
          />
          {categoriaExpandido[categoria.CODDEPARTAMENTO] && renderSubcategorias(categoria.CODDEPARTAMENTO)}
        </View>
      ))}
    </ScrollView>
  );
};

 /* return (
    <View>
      {error ? (
        <Text>{error}</Text>
      ) : (
        <FlatList
          data={categorias}
          renderItem={renderCategoriaItem}
          keyExtractor={(item) => item.CODDEPARTAMENTO.toString()}
        />
      )}
    </View>
  );
};*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  categoriaItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10, 
  },
  categoriaContainer: {
    width: '70%',
    marginBottom: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    elevation: 5, // Efecto de relieve en Android
    shadowColor: '#000000', // Sombra en iOS
    shadowOpacity: 0.5,
    shadowRadius: 3,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  categoriaItem: {
    marginBottom: 10,
  },
  subcategoriasContainer: {
    marginLeft: 20,
  },
  subcategoriaItem: {
    marginBottom: 5,
  },
});
export default Categories