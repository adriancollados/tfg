import React, { useEffect, useState } from 'react';
import { StyleSheet,} from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-web'
//Screens
import Homescreen from '../screens/HomeScreen';
import Loginscreen from '../screens/Login';
import Registerscreen from '../screens/Register';
import CustomButton from '../screens/CustomButton'
import ItemsFavs from '../screens/ItemsFavs'
import Catalogo from '../screens/ArticlesList'
import Initial from '../screens/Initial'
import Categories from '../screens/Categories'
import Profile from '../screens/Profile'
import Carrito from '../screens/Carrito'
import DetallesArticulo from '../screens/ArticleDetails';
import { CarritoProvider } from '../components/CarritoContext';
import { useCarrito } from '../components/CarritoContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();


const AuthStack = ({onLogin}) => {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Homescreen" component={Homescreen}
                options={({ navigation }) => ({
                title: " ",
                headerStyle: {
                backgroundColor: "#C00A21",
                },
                headerShown: false
            })}/>
            <Stack.Screen name="Login"
                options={({ navigation }) => ({
                title: " ",
                headerStyle: {
                backgroundColor: "#C00A21",
                },
                headerShown: false,
            })}>{props => <Loginscreen {...props} onLogin={onLogin} />}</Stack.Screen>
        <Stack.Screen name="Register" component={Registerscreen}
                options={({ navigation }) => ({
                title: " ",
                headerStyle: {
                backgroundColor: "#C00A21",
                },
                headerTitleStyle: {
                color: "#C00A21",
                },
                headerShown: false
            })}/>
        </Stack.Navigator>
    )
}

const CatalogoSeccionesStack = () => {
    return(
        <Stack.Navigator screenOptions={() => ({
            headerTitleAlign: 'center',
            headerStyle: { backgroundColor: '#C00A21', height: 60},
            headerTitleStyle: { color: '#FFFFFF' },
        })}>
            <Stack.Screen name="Secciones" component={Categories} options={({ navigation })}/>
            <Stack.Screen name="Catalogo" component={Catalogo} options={({ navigation  })}/>
            <Stack.Screen name="DetallesArticulo" component={DetallesArticulo} options={{navigation}}/>

        </Stack.Navigator>
    )
}


const MainTabNavigator = ({handleLogout}) => {
    return(
        <CarritoProvider>
            <Tab.Navigator screenOptions={({route}) => ({
                tabBarShowLabel: false,
                tabBarStyle: {backgroundColor: '#C00A21', height: 60},
                headerStyle: { backgroundColor: '#C00A21' },
                headerTitleStyle: { color: '#FFFFFF' },
                headerTitleAlign: 'center',
                style:{
                        position: 'absolute',
                        elevarion: 0,
                        height: 60
                    },
                tabBarLabel: route.name,
                })}>
                <Tab.Screen name="Inicio" component={Initial}
                    options={() => ({
                        tabBarIcon: ({focused}) => (
                            <MaterialCommunityIcons name="home" color={'#FFFFFF'} size={30}/>
                        )  
                    })}
                />
                <Tab.Screen name="Articulos favoritos" component={ItemsFavs}
                    options={() => ({
                        tabBarIcon: ({focused}) => (
                            <MaterialCommunityIcons name="star" color={'#FFFFFF'} size={30}/>
                        )          
                    })}/>
                <Tab.Screen name="CatalogoSecciones" component={CatalogoSeccionesStack}
                    options={({navigation}) => ({
                        tabBarIcon: ({focused}) => (
                            <Icon
                                name='menu'
                                style={{
                                    width: 50,
                                    height: 50,
                                    justifyContent: 'center',
                                }}
                                color='#ffffff'
                            />
                        ),
                        tabBarButton: (props) => (
                            <CustomButton { ...props } />
                        ),
                        headerShown: false,
                    })}/>
                <Tab.Screen name="Carrito" component={Carrito}
                    options={{
                        tabBarIcon: ({focused}) => (
                            <Icon
                                type="font-awesome"
                                name="shopping-cart"
                                size={24}
                                color="#ffffff"
                        />
                        )
                    }}/>
                <Tab.Screen name="Mi perfil" component={(props) => <Profile {...props} handleLogout={handleLogout}/>}
                options={() => ({
                    tabBarIcon: ({focused}) => (
                    <MaterialCommunityIcons name="account" color={'#FFFFFF'} size={30} />
                    )
                })}/> 
            </Tab.Navigator>
        </CarritoProvider>
    )
};


export {AuthStack, MainTabNavigator} 

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });