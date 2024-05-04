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
        console.log(response.json());
        const categories = await response.json();
        console.log(categories)
        return response.json();
      }
    } catch (error) {
      throw new Error(error.message)
    }
  };

export {fetchCategorias} ;