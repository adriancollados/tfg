import { url_base } from '../GlobalData';

const obtenerUsuario = async (userId) => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        
      };

    try {
        const data = await fetch(`${url_base}/clientes/perfil/${userId}`, options);
        if(data.status === 200) {
            return data.json(); // Parsea la respuesta JSON
        } else {
            return await data.json(); // Parsea el error JSON
        }
    } catch (error) {
      throw new Error(error.message)
    }
  };

  export {obtenerUsuario};