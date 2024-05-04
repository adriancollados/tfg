import { StatusBar } from 'expo-status-bar';
import { StyleSheet,} from 'react-native';
import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import Homescreen from './screens/HomeScreen';
import Loginscreen from './screens/Login';
import Registerscreen from './screens/Register';
import Tabs from './navigation/TabNavigator';

const Stack = createStackNavigator() //me permite definir rutas


export default function App() {
  return (
    <NavigationContainer> 
      <Stack.Navigator>
        <Stack.Screen name="Homescreen" component={Homescreen}
          options={({ navigation }) => ({
          title: " ",
          headerStyle: {
            backgroundColor: "#C00A21",
          },
          })}/>
          <Stack.Screen name="Login" component={Loginscreen}
          options={({ navigation }) => ({
          title: " ",
          headerStyle: {
            backgroundColor: "#C00A21",
          },
          })}/>
          <Stack.Screen name="Register" component={Registerscreen}
          options={({ navigation }) => ({
          title: " ",
          headerStyle: {
            backgroundColor: "#C00A21",
          },
          headerTitleStyle: {
            color: "#C00A21",
          },
          })}/>
          <Stack.Screen name='Tabs' component={Tabs}
          options={({ navigation }) => ({
            title: "AMANO",
            headerStyle: {
              backgroundColor: "#C00A21",
            },
            headerTitleStyle: {
              color: "#fff",
            },
            })}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
