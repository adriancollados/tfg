import { url_base } from '../GlobalData';

const fetchArticulos = async () => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
    try {
      const response = await fetch(url_base + '/articulos', options);
      if(response.status === 200) {
        const articulos = await response.json();
        return articulos;
      }
    } catch (error) {
      throw new Error(error.message)
    }
  };

const insertArticulos = async (codigoArticulo) => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');
    const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({t: codigoArticulo})
      };
    try {
      const response = await fetch(url_base + `/clientes/${user}/favoritos`, options);
      if(response.status === 200) {
        return response;
      }
    } catch (error) {
      throw new Error(error.message)
    }
}

export {fetchArticulos, insertArticulos} ;