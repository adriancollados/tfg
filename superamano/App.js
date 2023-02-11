import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen"
import ListaArticulos from "./screens/articulos/ListaArticulos"


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ListaArticulos" component={ListaArticulos} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;