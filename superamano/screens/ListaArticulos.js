 import { View, Text } from 'react-native'
 import React from 'react'
 
 const ListaArticulos = () => {


   const [articulos, setArticulos] = useState([])

  const loadListaArticulos =  async () =>{
      const data = await getArticulos()
      setArticulos(data);
  }


  useEffect(() => {
    loadListaArticulos()
  }, []);
   return (
    <Layout>
      <ListaArticulos articulos={articulos}></ListaArticulos>
      <Cart />
   </Layout>
   )
 }
 
 export default ListaArticulos