import React, { useState } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
function Perfil({name, email,photo}){
return (
    <View style={styles.container}>
      <Image source={{ uri: photo }} style={styles.photo} />
      <View style={styles.details}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.email}>{email}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 24,
  },
  photo: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  details: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#999',
  },
});

export default Perfil