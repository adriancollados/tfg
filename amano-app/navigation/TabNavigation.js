import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { Icon } from 'react-native-elements';

import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import CartScreen from '../screens/Carrito';
import Perfil from '../screens/Perfil'

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function Cart(){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Carrito" component={CartScreen}/>
      </Stack.Navigator>
    )
}

function HomeStack(){
    return (
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
      </Stack.Navigator>
    )
}

const TabNavigator = ({navigation}) => {
    return (
      <Tab.Navigator
        screenOptions={{
            headerStyle: { backgroundColor: '#C00A21' },
            headerTitleStyle: { color: '#FFFFFF' },
            headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate('Carrito')} style={{marginRight: 15}}>
                <Icon
                  type="font-awesome"
                  name="shopping-cart"
                  size={24}
                  color="#ffffff"
                /> 
              </TouchableOpacity>
            ), 
        }}>
         <Tab.Screen
          name="Home"
          component={HomeStack}
          options={() => ({
            tabBarIcon: ({color, size}) => (
              <Ionicons name="home-outline" color={color} size={size} />
            ),
          })}
        />{/* 
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarBadge: 3,
            tabBarBadgeStyle: {backgroundColor: 'yellow'},
            tabBarIcon: ({color, size}) => (
              <Feather name="list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Perfil"
          component={Perfil}
          options={{
            tabBarIcon: ({color, size}) => (
              <Ionicons name="account" color={color} size={size} />
            ),
          }}
        />*/}
      </Tab.Navigator> 
    );
  };


  
  export default TabNavigator;