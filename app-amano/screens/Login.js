import React, {useState} from 'react'
import {SafeAreaView, ScrollView, Image, StatusBar, TextInput, StyleSheet, TouchableOpacity, Text, KeyboardAvoidingView, View} from 'react-native'
import base64 from 'react-native-base64';
import { login } from '../services/auth';
import swal from 'sweetalert2';


const Loginscreen = ({navigation, onLogin}) => {
    const [user, setUser] = useState({
      email: '',
      pass: ''
    })
    const [errorMessage, setErrorMessage] = useState(null); 
  
    const handleChange = (name, value) => setUser({ ...user, [name]: value})
    const [message_err, setMessage_err] = useState(false)  
    
    const goLogin = () => {
      const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$");
      var encoded;
      if (!strongRegex.test(user.email)) {
        setErrorMessage("El correo electrónico no tiene formato válido")
        setTimeout(() => {
          setErrorMessage(null);
        }, 3000);//Desaparece el mensaje despues de 3 segundos
      }else{
        encoded = base64.encode(JSON.stringify(user)) // en base 64
      }
      console.log("Haciendo POST al servidor")
      login(encoded)
        .then((data) => {
          localStorage.setItem('user', data.codcliente);
          localStorage.setItem('token', data.token);
          sessionStorage.setItem('user', data.codcliente);
          sessionStorage.setItem('token', data.token);
          swal.fire({
            icon: 'success',
            title: "¡Login correcto!",
            showConfirmButton: false,
            timer: 3000
          });
          onLogin();
        })
          .catch((error) => {
            console.log(error)
            
            setMessage_err(true)
            swal.fire({
              icon: 'error',
              title: "Contraseña o email incorrectos",
              timer: 3000
            });
            /*if(message_err){
              
              setErrorMessage("Contraseña o email incorrectos")
              setTimeout(() => {
                setErrorMessage(null);
            }, 3000);//Desaparece el mensaje despues de 3 segundos
            }*/
          })
        
        
        {/*}.then(({data}) => {
          if(data['type'] == 'client'){   
            AsyncStorage.setItem("userLogged", JSON.stringify(user.email));
            navigation.navigate('InitialScreen')
          }else{
            AsyncStorage.setItem("userLogged", JSON.stringify(user.email));
            navigation.navigate('CaregiverScreen', {caregiver: data['data'], details: data['details']})
          }*/}
       
      }
    
  
    return ( 
      <ScrollView style={styles.containerView}>
        <KeyboardAvoidingView /*behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 50}*/
            style={styles.container}>
  
          <Text style={styles.title}>Inicio de sesión</Text>
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize='none'
            onChangeText={(text) => handleChange('email', text)}
          />
          {/* Renderizar el mensaje de error si hay uno */}
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Contraseña"
            onChangeText={(text) => handleChange('pass', text)}
          />           
          <TouchableOpacity style={styles.button} onPress={goLogin}>
            <Text style={styles.buttonText}>Accede a tu cuenta</Text>
          </TouchableOpacity>  
          <TouchableOpacity onPress={() => navigation.navigate("ForgetPassword")}>
            <Text style={styles.link}> ¿Ha olvidado su contraseña? </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={styles.link}>¿No estás registrado? Regístrate aquí</Text>

          </TouchableOpacity>
        </KeyboardAvoidingView>   
      </ScrollView>
        
    )
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#C00A21',
      alignItems: 'center',
      marginTop: 50
    },
    containerView: {
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
  })
  
  export default Loginscreen
  
  