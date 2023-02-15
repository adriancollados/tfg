import React from "react";
import { Text, TouchableOpacity} from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import HomeScreen from "./screens/HomeScreen"
import ListaArticulos from "./screens/articulos/ListaArticulos"


const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Supermercado Amano" component={HomeScreen} options={ ({navigation}) =>({
          headerStyle: { backgroundColor: '#EA4826' },
          headerTitleStyle: { color: '#FFFFFF' },
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("ListaArticulos")}>
              <Text>New</Text>
            </TouchableOpacity>
          )
        })} />
        <Stack.Screen name="ListaArticulos" component={ListaArticulos} />

      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;