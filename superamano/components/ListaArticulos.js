import { View, Text, FlatList } from 'react-native'
import React from 'react'
import Articulo from './Articulo'

const ListaArticulos = ({articulos}) => {

    const renderItems = ({item}) => {
        return <Articulo articulo={item}/>
    }

    return (
        <FlatList 
            style={{width: '100%', border: '5px'}}
            data={articulos}
            keyExtractor={(item) => item.CODARTICULO}
            renderItem={renderItems}
        />
    )
}


export default ListaArticulos