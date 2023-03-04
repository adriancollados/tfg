import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from "@react-navigation/native";
import { Icon } from 'react-native-elements';
import HomeScreen from "./screens/HomeScreen"
import Carrito from "./screens/Carrito"
import ListaArticulos from "./screens/articulos/ListaArticulos"
import Perfil from "./screens/Perfil";
import { FontAwesome } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';



const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function CartScreen(){
  return (
    <Stack.Navigator>
      <Stack.Screen name="Carrito" component={Carrito}/>
    </Stack.Navigator>
  )
}

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarPosition="bottom" tabBarOptions={{
          activeBackgroundColor: 'red',
          display: 'flex'
        }}>
        <Tab.Screen name="Supermercado Amano" component={HomeScreen} options={({ navigation }) => ({
          headerStyle: { backgroundColor: '#EA4826' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Carrito")} style={{marginRight: 15}}>
              <Icon
                type="font-awesome"
                name="shopping-cart"
                size={24}
                color="#ffffff"
              /> 
            </TouchableOpacity>
          ), 
          tabBarIcon:() => (
            <MaterialCommunityIcons name="home" color={'#EA4826'} size={30} />
          ),
          tabBarLabel: '',
        })} />
        <Tab.Screen name="Perfil" component={Perfil} options={({ navigation }) => ({
          headerStyle: { backgroundColor: '#EA4826' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Carrito")} style={{marginRight: 15}}>
              <Icon
                type="font-awesome"
                name="shopping-cart"
                size={24}
                color="#ffffff"
              />
            </TouchableOpacity>
          ),
          tabBarIcon:() => (
            <MaterialCommunityIcons name="account" color={'#EA4826'} size={30} />
          ),
          tabBarLabel: '',
        })}/>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App;