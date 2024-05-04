import { View, Text } from 'react-native'
import React from 'react'

const Sections = ({ secciones, onPressSeccion }) => {
  const renderSeccionItem = ({ item }) => (
    <TouchableOpacity onPress={() => onPressSeccion(item)}>
      <Text style={styles.seccionItem}>{item.nombre}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={secciones}
        renderItem={renderSeccionItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  seccionItem: {
    padding: 10,
    fontSize: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
});

export default Sections