import { View, Text } from 'react-native'
import React, {useEffect} from 'react'
import {getArticulos} from '../api'


const HomeScreen = () => {

    const loadHomeScreen =  async () =>{
        const data = await getArticulos()
        console.log(data)
    }

    useEffect(() => {
        loadHomeScreen()
    }, []);

    return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
};

export default HomeScreen