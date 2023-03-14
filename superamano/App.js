import React,  { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from 'react-native-elements';
import HomeScreen from "./screens/HomeScreen"
import CartScreen from "./screens/Carrito"
import ListaArticulos from "./screens/ListaArticulos"
import Perfil from "./screens/Perfil";
import AuthStack from "./navigation/AuthStack";
import { FontAwesome } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function Cart(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Carrito" component={CartScreen}/>
    </Stack.Navigator>
  )
}


function App() {
  /* const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Función para manejar el inicio de sesión
  const handleLogin = () => {
    setIsLoggedIn(true);
  }; */

  return (
    <NavigationContainer>
      <AuthStack />
      {/*Si el usuario no ha iniciado sesión, mostrar la pantalla de inicio de sesión*
      {isLoggedIn ? (
        <Tab.Navigator initialRouteName="Login" screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: { backgroundColor: '#EA4826'}
          }}>
          <Tab.Screen name="Supermercado Amano" component={HomeScreen} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#C00A21' },
            headerTitleStyle: { color: '#FFFFFF' },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate(component={Cart})} style={{marginRight: 15}}>
                <Icon
                  type="font-awesome"
                  name="shopping-cart"
                  size={24}
                  color="#ffffff"
                /> 
              </TouchableOpacity>
            ), 
            tabBarIcon:() => (
              <MaterialCommunityIcons name="home" color={'#FFFFFF'} size={30} />
            )
          })} />
          <Tab.Screen name="Perfil" component={Perfil} options={({ navigation }) => ({
            headerStyle: { backgroundColor: '#C00A21' },
            headerTitleStyle: { color: '#FFFFFF' },
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate("CartScreen")} style={{marginRight: 15}}>
                <Icon
                  type="font-awesome"
                  name="shopping-cart"
                  size={24}
                  color="#ffffff"
                />
              </TouchableOpacity>
            ),
            tabBarIcon:() => (
              <MaterialCommunityIcons name="account" color={'#FFFFFF'} size={30} />
            )
          })}/>
        </Tab.Navigator>
        ) : (
          <LoginStack onLogin={handleLogin}/>
        )
      }*/}
    </NavigationContainer>
  )
}

export default App;
