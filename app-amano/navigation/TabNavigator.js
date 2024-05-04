import { View, Text } from 'react-native'
import React, { Profiler } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import Initial from '../screens/Initial'
import Categories from '../screens/Categories'
import Profile from '../screens/Profile'
import Carrito from '../screens/Carrito'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-web'
import CustomButton from '../screens/CustomButton'
import ItemsFavs from '../screens/ItemsFavs'

const Stack = createStackNavigator() //me permite definir rutas



const StackNavigationWeb = () => {
    <Stack.Navigator>
        <Stack.Screen name="Inicio" component={Initial}/>
        <Stack.Screen name="Categorias" component={Categories}/>
        <Stack.Screen name="Perfil" component={Profile}/>
        <Stack.Screen name="Carrito" component={Carrito}/>
    </Stack.Navigator>
}


const Tabs = () => {
    const TabNavigator = createBottomTabNavigator();
    return (
        <TabNavigator.Navigator screenOptions={({route}) => ({
            tabBarShowLabel: false,
            tabBarStyle: {backgroundColor: '#C00A21'},
            headerStyle: { backgroundColor: '#C00A21' },
            headerTitleStyle: { color: '#FFFFFF' },
            style:{
                    position: 'absolute',
                    elevarion: 0,
                    height: 90
                },
            tabBarLabel: route.name,
            })}>
            <TabNavigator.Screen name="Inicio" component={Initial}
                options={() => ({
                tabBarIcon: ({focused}) => (
                  <MaterialCommunityIcons name="home" color={'#FFFFFF'} size={30}/>
                )          
                })}/>
            <TabNavigator.Screen name="Favs" component={ItemsFavs}
            options={() => ({
            tabBarIcon: ({focused}) => (
                <MaterialCommunityIcons name="star" color={'#FFFFFF'} size={30}/>
            )          
            })}/>
            <TabNavigator.Screen name="Categorias" component={Categories}
             options={{
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
                )
              }}/>
            <TabNavigator.Screen name="Carrito" component={Carrito}
                options={{
                    tabBarIcon: ({focused}) => (
                        <Icon
                            type="font-awesome"
                            name="shopping-cart"
                            size={24}
                            color="#ffffff"
                      />
                    ),
                }}/>
            <TabNavigator.Screen name="Perfil" component={Profile}
            options={{
                tabBarIcon: ({focused}) => (
                  <MaterialCommunityIcons name="account" color={'#FFFFFF'} size={30} />
                ),
              }}/>
        </TabNavigator.Navigator>
    )
}



export default Tabs