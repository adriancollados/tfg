import React, {useState} from 'react'
import {SafeAreaView, ScrollView, KeyboardAvoidingView, View, StatusBar, TextInput, StyleSheet, TouchableOpacity, Text} from 'react-native'



const Registerscreen = ({navigation}) => {

    const [loading, setLoading] = useState(false)
    // ejecutamos un estado, que incialmente tendra los atributos en blanco:
    const [client, setClient] = useState({
        name: '',
        lastname: '',
        email: '',
        password: '',
        phone: ''
    })

    const validateEmail = (email) => {
        // Expresión regular para validar el formato de correo electrónico
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
        }

    const handleChange = (name, value) => setClient({ ...client, [name]: value})
    
    const handleSubmit = () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({t: client})
        }
    
        setLoading(true)
        fetch(APICli + '/register', options)
            .then((response) => response.json())
            .then((data) => setData(data.errorMessage))
            .catch((error) => setError(error))
            .finally(() => setLoading(false))
        
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
            placeholder="Telefono"
            onChangeText={(text) => handleChange('phone', text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Guardar</Text>
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
  });


export default Registerscreen

