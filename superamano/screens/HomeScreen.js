import { View, Text, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import {getArticulos} from '../api'
import ListaArticulos from '../components/articulos/ListaArticulos'
import Layout from '../components/Layout'
import Cart from './Carrito';

const HomeScreen = () => {




  return (
    <Layout>
      <Text>Hola HomeScreen</Text>
    </Layout>
  );
};

export default HomeScreen