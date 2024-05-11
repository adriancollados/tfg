import {getConnection, sql, queries} from '../database'

export const getArticulos = async (req, res) => {
   try{
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProducts)
    console.log(result.recordset);
    res.json( result.recordset)
   }catch(e){
    res.status(500)
    res.send(e.message)
   } 
       
}

export const getArticulo = async (req, res) => {
    const { id } = req.params
    try{
        const pool = await getConnection();
        const result = await pool.request().input('id', id).query(queries.getArticuloId)
        if(result == null){
            res.status(404)
            res.send({message:"El articulo no se ha encontrado"})
        }
        else{
            res.json(result.recordset[0])
        }
    }
    catch(e){
        res.status(500)
        res.send(e.message)
    }
}

export const getArticulosFromSeccion = async (req, res) => {
    const { id } = req.params
    try{
        const pool = await getConnection();
        const result = await pool.request().input('id', id).query(queries.getArticulosFromSeccion)
        if(result == null){
            res.status(404)
            res.send({message:"El articulo no se ha encontrado"})
        }else{
            res.json(result.recordset)

        }
    }
    catch(e){
        res.status(500)
        res.send(e.message)
    }
}

export const getArticulosFromSeccionCategoria = async (req, res) => {
    const { categoriaId, seccionId } = req.params
    const { pageNumber = 1, pageSize = 15 } = req.query; // Configuración de la paginación
    try {
        const pool = await getConnection();
        const startIndex = (pageNumber - 1) * pageSize; // Índice inicial de la paginación

        const result = await pool
          .request()
          .input('categoriaId', categoriaId)
          .input('seccionId', seccionId)
          .input('startIndex', startIndex)
          .input('pageSize', pageSize)
          .query(queries.getArticulosFromSeccionCategoria);
    
        if (!result.recordset || result.recordset.length === 0) {
          res.status(404).send({message: "No se encontraron artículos para la categoría y sección especificadas"});
        } else {
          res.json(result.recordset);
        }
      } catch (e) {
        res.status(500).send({error: e.message});
      }
};

export const getArticulosFromCategoria = async (req, res) => {
    const { id } = req.params
    try{
        const pool = await getConnection();
        const result = await pool.request().input('id', id).query(queries.getArticulosFromCategoria)
        if(result == null || result.recordset.length === 0){
            res.status(404)
            res.send({message: "No se han encontrado articulos"})
        }else
        {
            res.json(result.recordset)
        }
    }
    catch(e){
        res.status(500)
        res.send(e.message)
    }
}

export const getArticulosCount = async (req, res) => {
    res.send("Hola")   
}

export const createArticulos = async (req, res) => {
    res.send("Hola") 
}

export const deleteArticulos = async(req, res) => {
    res.send("Hola")   
}

export const updateArticulos = async (req, res) => {
    res.send("Hola")   
}

