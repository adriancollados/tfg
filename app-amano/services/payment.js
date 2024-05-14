

import { url_base } from '../GlobalData';

const makePayment = async (pedido) => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({t: pedido}) 
      };
    try {
      const response = await fetch(url_base + '/payment', options);
      if(response.status === 200) {
        const articulos = await response.json();
        return articulos;
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