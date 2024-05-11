import { StyleSheet,} from 'react-native';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-web'


import {AuthStack, MainTabNavigator} from './navigation/NavigationManager';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
       // Lógica para comprobar si el usuario está logueado
      if(localStorage.getItem('user') != undefined){
          setIsLoggedIn(true);
      }
      else{
          setIsLoggedIn(false);
      }
  }, [isLoggedIn])

  const handleLogin = () => {
    setIsLoggedIn(true);
  }


  return (
    <NavigationContainer>
        {isLoggedIn ? <MainTabNavigator /> : <AuthStack onLogin={handleLogin}/>}
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
