import React, { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginS from './screens/Login';
import RegistroScreen from './screens/RegistroScreen';
import AuthStack from "./navigation/AuthStack";
import TabNavigator from "./navigation/TabNavigation";


const Stack = createNativeStackNavigator();


function App() {

  return <AuthStack/>

}
export default App;
