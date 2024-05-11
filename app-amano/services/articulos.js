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

export {fetchArticulos} ;