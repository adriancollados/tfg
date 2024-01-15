import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import HomeScreen from '../screens/InitialScreen';
import CartScreen from '../screens/Carrito';
import Perfil from '../screens/Perfil'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack(){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home Hola" component={HomeScreen}/>
        <Stack.Screen name="Carrito" component={CartScreen}/>
        <Stack.Screen name="Perfil" component={Perfil}/>
      </Stack.Navigator>
    )
}


const TabNavigator = ({setIsLoggedIn}) => {
  const navigation = useNavigation();
    return (
      <Tab.Navigator
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {backgroundColor: '#C00A21'},
            headerStyle: { backgroundColor: '#C00A21' },
            headerTitleStyle: { color: '#FFFFFF' },
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('CartScreen')} style={{marginRight: 15}}>
                <Icon
                  type="font-awesome"
                  name="shopping-cart"
                  size={24}
                  color="#ffffff"
                /> 
              </TouchableOpacity>
            ),
            headerLeft: () => (
              <TouchableOpacity onPress={() => setIsLoggedIn(false)} style={{marginLeft: 15}}>
                  <Icon
                    type="font-awesome"
                    name="close"
                    size={24}
                    color="#ffffff"
                  /> 
                </TouchableOpacity>
              )
        }}>
         <Tab.Screen
          name="Supermercado Amano"
          component={HomeScreen}
          options={() => ({
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={'#FFFFFF'} size={30} />
            ),
          })}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="account" color={'#FFFFFF'} size={30} />
            ),
          }}
        />
      </Tab.Navigator> 
    );
  };


  
  export default TabNavigator;