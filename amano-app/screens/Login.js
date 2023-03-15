import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { useLogin } from '../api';

 

const LoginS = ({navigation, setIsLoggedIn})  =>{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); // Nuevo estado para el mensaje de error
    const { data, loading, error, login} = useLogin(email, password);

    const validateEmail = (email) => {
        // Expresión regular para validar el formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    const handleLogin = (event) => {
      event.preventDefault()
          if (!validateEmail(email)) {
             // Mostrar un mensaje de error
             setErrorMessage('El correo electrónico no tiene formato válido');
             setTimeout(() => {
                 setErrorMessage(null);
             }, 3000);//Desaparece el mensaje despues de 3 segundos
         }
         else{
            console.log("Vamos a realizar el login")
            login();
            console.log("Login realizado")
            if(data === "OK"){
              console.log("Estoy en OK ", data)
              setIsLoggedIn(true)
            }
            else{
              console.log("Estoy aqui ", data)
              setErrorMessage(data)
            }
         } 
     }
 

    return (
        <KeyboardAvoidingView  style={styles.container}>
            <View style={styles.image}>
                <Image source={ require('../assets/amano-supermercados-logo-1597394803.jpg')} style={{width: 300, height: 60, marginBottom: 80}}/>
            </View>
            <Text style={styles.title}>¡Bienvenido de nuevo!</Text>
            
            <TextInput style={styles.input} placeholder="Email" 
                onChangeText={setEmail}
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"/>
            {/* Renderizar el mensaje de error si hay uno */}
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <TextInput style={styles.input} placeholder="Contraseña" 
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={true}/>
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Accede a tu cuenta</Text>
            </TouchableOpacity>
            {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
            <TouchableOpacity onPress={() => navigation.navigate('RegistroScreen')}>
              <Text style={styles.link}>¿No estás registrado? Regístrate aquí</Text>
            </TouchableOpacity>
            {error && <Text style={styles.error}>{error}</Text>}
        </KeyboardAvoidingView>
        
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C00A21',
    alignItems: 'center',
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
    marginBottom: 50,
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

export default LoginS;