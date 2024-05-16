import { url_base } from '../GlobalData';


const mappingResponsesError = (message) => {
    switch (message.error) {
      case "INVALID_INPUT_FIELDS":
        return "Ha habido un problema con el pedido, revisa los datos de envío.";
      case "INVALID_CODPOSTAL_INPUT": 
        return "No se realizan envios al codigo postal introducido."
      case "NOT_ALL_LINPEDS_INSERTED":
        return "Ha habido un problema con el pedido. Por favor, intentelo de nuevo."
      default: return "Lo sentimos, el pedido no se ha procesado intentelo de nuevo en unos minutos.";
    }
}

const makePayment = async (tokenId, pedido) => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({t: pedido, token: tokenId}) 
      };
    try {
      const response = await fetch(url_base + '/payment', options);
      if(response.status === 200) {
        const data = await response.json();
        return data;
      }
      else{
        const dataError = await response.json();
        throw new Error(mappingResponsesError(dataError));
      }
    } catch (error) {
      throw new Error(error.message)
    }
  };

export {makePayment} ;



// Aquí iría la lógica para abrir la pasarela de pago de Redsys
// Dependiendo de tu implementación, podrías redirigir a una URL o abrir una WebView
// Para este ejemplo, simulamos el proceso con una alerta
/*Alert.alert('Pasarela de Pago', 'Redirigiendo a Redsys...', [
  {
    text: 'OK',
    onPress: () => {
      // Aquí rediriges a la URL de Redsys
      // Puedes usar una WebView para abrir la URL de Redsys dentro de la app
    }
  }
]);
} catch (error) {
    console.error(error);
    Alert.alert('Error', 'Hubo un problema al procesar el pago. Inténtalo de nuevo.');
}*/