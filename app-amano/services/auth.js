import { url_base } from '../GlobalData';

const login = async (user) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({t: user}),
    };
  
    try {
      const response = await fetch(url_base + '/clientes/login', options);
      if(response.status === 201){
        const data = await response.json();
        
        return data;
      } else {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      throw new Error(error.message);
    }
  };
  
  export { login };