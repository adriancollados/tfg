import React, {useState} from 'react'
import {SafeAreaView, ScrollView, KeyboardAvoidingView, View, StatusBar, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native'
import { url_base } from '../GlobalData';
import { Buffer } from 'buffer';
import Swal from 'sweetalert2';



const Registerscreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    // ejecutamos un estado, que incialmente tendra los atributos en blanco:
    const [client, setClient] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        direccion: '',
        phone: ''
    })

    const validateEmail = (email) => {
        // Expresión regular para validar el formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }


    const validatePhone = (phone) => {
      const phoneRegex = /^[0-9]+$/;
      return phoneRegex.test(phone);
    };

    const showError = (message) => {
      setError(message);
      setTimeout(() => {
        setError('');
      }, 3000); // El mensaje se oculta después de 3 segundos
    };

    const handleChange = (name, value) => setClient({ ...client, [name]: value})
    
    const handleSubmit = () => {
      if (!validateEmail(client.email)) {
        showError('El correo electrónico no es válido.');
        return;
      }
  
      if (!validatePhone(client.phone)) {
        showError('El teléfono debe contener solo números.');
        return;
      }
  
      if (client.password !== confirmPassword) {
        showError('Las contraseñas no coinciden.');
        return;
      }

      const base64Password = btoa(client.password);
      const updatedClient = { ...client, password: base64Password };

      const options = {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({t: btoa(JSON.stringify(updatedClient))})
      }
    
      setLoading(true)
      fetch(url_base + '/clientes/register', options)
      .then((response) => {
        if (response.status === 200) {
          Swal.fire({
            icon: 'success',
            title: "Registrado correctamente, inicie sesión para empezar a comprar",
            showConfirmButton: false,
            timer: 3000
          }).then(()=> navigation.navigate('Login'))
        }
    })
      .then((data) => {
        if (data.errorMessage) {
          showError(data.errorMessage);
        } else {
          Swal.fire({
            icon: 'success',
            title: "Registrado correctamente, inicie sesión para empezar a comprar",
            showConfirmButton: false,
            timer: 3000
          }).then(()=> navigation.navigate('Login'))
        }
      })
      .catch((error) => showError(error.message))
      .finally(() => setLoading(false));
    //navigation.navigate('Initialscreen')
  }

  return ( 
    <ScrollView style={styles.containerView}>
      <KeyboardAvoidingView style={styles.container}>
        <View style={{marginBottom: 30}}>
            <Text style={styles.title}>Crear una cuenta</Text>
        </View>
        <TextInput
            style={styles.input}
            placeholder="Nombre"
            onChangeText={(text) => handleChange('name', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Apellidos"
            onChangeText={(text) => handleChange('lastname', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => handleChange('email', text)}
        />
        <TextInput
            style={styles.input}
            secureTextEntry={true}
            placeholder="Contraseña"
            onChangeText={(text) => handleChange('password', text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          placeholder="Confirmar Contraseña"
          onChangeText={(text) => setConfirmPassword(text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Dirección"
            onChangeText={(text) => handleChange('direccion', text)}
        />
        <TextInput
            style={styles.input}
            placeholder="Telefono"
            onChangeText={(text) => handleChange('phone', text)}
        />
        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>¿Ya tienes cuenta? Accede aquí.</Text>

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
        width: 270,
        textAlign: 'center',
        padding: 5,
        borderRadius: 5,
      },
  });


export default Registerscreen

