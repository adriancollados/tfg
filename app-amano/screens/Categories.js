import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import { fetchCategorias } from '../services/categories';

const Categories = ({ onPressCategoria }) => {
  const [categorias, setCategorias] = useState([]);
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

  const renderCategoriaItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressCategoria(item)}>
      <Text>{item.DESCRIPCION}</Text>
    </TouchableOpacity>
  );

  return (
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  categoriaItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
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
});
export default Categories