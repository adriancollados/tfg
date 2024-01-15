import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView } from 'react-native';
import {encryptCardNumber} from '../components/clientes';
import { useRegistro } from '../api';


const key = "68576D5A7134743777217A25432A462D"; 

const RegistroScreen =  ({navigation}) => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [cif, setCif] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const{datos, error, registro} = useRegistro(nombreCliente, cif, telefono1, email, pass)

  const validateEmail = (email) => {
    // Expresión regular para validar el formato de correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

  const handleRegister = (event) => {
    event.preventDefault()
    // Aquí puedes manejar la lógica de registro
    if (!validateEmail(email)) {
      // Mostrar un mensaje de error
      setErrorMessage('El correo electrónico no tiene formato válido');
      setTimeout(() => {
          setErrorMessage(null);
      }, 3000);//Desaparece el mensaje despues de 3 segundos
    }
    else{
      console.log("Realizando registro..")
      registro()
      

    }
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}
    >
      <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}>
          <View style={{marginBottom: 30}}>
            <Text style={styles.title}>Crear una cuenta</Text>
            
          </View>
        
        <TextInput  style={styles.input}
          placeholder="Nombre del cliente"
          value={nombreCliente}
          onChangeText={setNombreCliente}
          required
        />
        <TextInput  style={styles.input}
          placeholder="CIF"
          value={cif}
          onChangeText={setCif}
          required
        />
        <TextInput style={styles.input}
          placeholder="Teléfono"
          value={telefono1}
          onChangeText={setTelefono1}
        />
        <TextInput style={styles.input}
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
          required
        />
        <TextInput style={styles.input}
          placeholder="Contraseña"
          value={pass}
          onChangeText={setPass}
          secureTextEntry={true}
          required
        />
        <TouchableOpacity style={styles.button} onPress={navigation.navigate("LoginS")}>
          <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C00A21',
    marginTop: 0
  },
  image: {
    display: 'flex',
    justifyContent: "center",
    alignItems: 'center',
    marginTop: 100
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    marginTop: 100
  },
  input: {
    height: 50,
    width: 270,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    fontSize: 17
  },
  button: {
    backgroundColor: '#222222',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    width: 220,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    color: '#fff',
    marginTop: 20,
  },
  error: {
    color: 'red',
    backgroundColor: '#fff',
    marginBottom: 10,
    fontSize: 15,
    width: 270
  },
});



export default RegistroScreen;