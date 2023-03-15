import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import LoginScreen from './LoginScreen';


const RegistroScreen =  ({navigation}) => {
  const [nombreCliente, setNombreCliente] = useState('');
  const [cif, setCif] = useState('');
  const [telefono1, setTelefono1] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

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
      const data = {nombreCliente, cif, telefono1, email, pass}

    }
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{alignItems: 'center'}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}>
        <View style={{marginBottom: 30}}>
          <Text style={styles.title}>Crear una cuenta</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={styles.link}>¿Ya tiene una cuenta? Inicie sesión</Text>
          </TouchableOpacity> 
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
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