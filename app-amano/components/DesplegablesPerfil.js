import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; // Importa el icono de MaterialIcons
import swal from 'sweetalert2';
import { updateProfileUser } from '../services/users';
import { ScrollView } from 'react-native-web';
import ListaPedidos from './PedidosList'


export const Desplegable = ({ titulo, children, onUpdateUserData }) => {
  const [abierto, setAbierto] = useState(false);
  /*const [nuevosDatos, setNuevosDatos] = useState({
    NOMBRECLIENTE: '',
    TELEFONO:  '',
    DIRECCION:  '',
  });*/
  // Verificar si hay datos de usuario
  const esDatosPersonales = titulo === "Datos personales" && children !== undefined;
  // Verificar si se trata de historial de pedidos
  const esHistorialPedidos = titulo === "Historial de pedidos";
  // Verificar si se trata de los puntos del usuario
  const esMisPuntos = titulo === "Mis puntos";

  const handleUpdateUserData = () => {
    onUpdateUserData();
  }

  const goInfo = (children) => {
    const content = `
      <div>
        <p><strong>Nombre: </strong>${children.NOMBRECLIENTE}</p>
        <p><strong>Teléfono: </strong>${children.TELEFONO ? children.TELEFONO : ""}</p>
        <p><strong>Email: </strong>${children.EMAIL}</p>
        <p><strong>Provincia: </strong>${children.PROVINCIA ? children.PROVINCIA : ""}</p>
        <p><strong>Dirección: </strong>${children.DIRECCION ? children.DIRECCION : ""}</p>
      </div>
    `;
    const contentEdit = `
      <div>
        <p><strong>Nombre completo</strong></p>
        <input id="name" type="text" placeholder="${children.NOMBRECLIENTE}"  />
        <p><strong>Telefono</strong></p>
        <input id="telefono" type="text" placeholder="${children.TELEFONO}" />
        <p><strong>Direccion</strong></p>
        <input id="direccion" type="text" placeholder="${children.DIRECCION}" />
      </div>
    `;

    swal.fire({
      title: '',
      html: content,
      showCancelButton: true,
      cancelButtonText: 'Cerrar',
      confirmButtonText: 'Editar',
      icon: 'info',

    }).then(result => {
    try {
      if(result.isConfirmed) {
        swal.fire({
          title: 'Editar datos',
          html: contentEdit,
          showCancelButton: true,
          confirmButtonText: 'Guardar',
          cancelButtonText: 'Cancelar',
          preConfirm: () => {
            const name = document.getElementById('name').value;
            const telefono = document.getElementById('telefono').value;
            const direccion = document.getElementById('direccion').value;
            
            // Validar el teléfono
            if (!Number.isInteger(Number(telefono)) || telefono.length < 9 || telefono.length > 15) {
              throw new Error("El teléfono debe ser un número entero y tener entre 9 y 15 caracteres");
            }

            return{
              NOMBRECLIENTE: name,
              TELEFONO: telefono,
              DIRECCION: direccion
            };
          },
        }).then(response => {
          
            if(response.isConfirmed){
              const nuevosDatos = response.value
              updateProfileUser(nuevosDatos).then(() => {
                handleUpdateUserData();
              }).catch(err => {
                throw new Error(err.message);
              });
            }       
        });
      }
    }
    catch(error){
      swal.fire({
        icon: 'error',
        title: error.message
      });
    }
    });
    
    
  }

  return (
    <View style={styles.container}>
    <TouchableOpacity
      style={styles.cabecera}
      onPress={() => {
        if (esDatosPersonales) {
          // Realizar alguna acción específica para "Datos personales"
          // Por ejemplo, mostrar información detallada
          goInfo(children);
        } else if (esHistorialPedidos) {
          // Realizar alguna acción específica para "Historial de pedidos"
          // Por ejemplo, mostrar el historial de pedidos
          setAbierto(!abierto); 
        } else if (esMisPuntos) {
          // Realizar alguna acción específica para "Mis puntos"
          // Por ejemplo, mostrar los puntos del usuario
          setAbierto(!abierto);  
        } 
      }}
    >
      <Text style={styles.titulo}>{titulo}</Text>
      <MaterialIcons
        name={abierto ? 'keyboard-arrow-up' : 'keyboard-arrow-down'}
        size={24}
        color="white"
      />
    </TouchableOpacity>
      {abierto && (
        <View style={styles.contenido}>
          {esDatosPersonales }
          {esHistorialPedidos && (
            <ListaPedidos />
          )}
          {esMisPuntos && (
            <View>
              {/* Mostrar puntos del usuario */}
              <Text>{`Tienes un total de: ${children.PUNTOSCLIENTE} puntos`}</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    backgroundColor: '#C00A21'
  },
  cabecera: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 5,

  },
  titulo: {
    fontSize: 18,
    color: 'white',
  },
  contenido: {
    padding: 10,
    backgroundColor: 'white',
  },
  button: {
    backgroundColor: 'gray',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: "40%",
    textAlign: 'center'
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
  container1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

