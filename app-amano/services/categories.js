import { url_base } from '../GlobalData';

const fetchCategorias = async () => {
    const token = localStorage.getItem('token');
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      };
    try {
      const response = await fetch(url_base + '/categorias', options);
      if(response.status === 200) {
        const categories = await response.json();
        return categories;
      }
    } catch (error) {
      throw new Error(error.message)
    }
  };

export {fetchCategorias} ;