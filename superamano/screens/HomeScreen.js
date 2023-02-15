import { View, Text, FlatList } from 'react-native'
import React, {useEffect, useState} from 'react'
import {getArticulos} from '../api'
import ListaArticulos from '../components/articulos/ListaArticulos'
import Layout from '../components/Layout'

const HomeScreen = () => {

  const [articulos, setArticulos] = useState([])

  const loadHomeScreen =  async () =>{
      const data = await getArticulos()
      setArticulos(data);
  }

  useEffect(() => {
      loadHomeScreen()
  }, []);

  return (
    <Layout>
     <ListaArticulos articulos={articulos}></ListaArticulos>
    </Layout>
  );
};

export default HomeScreen