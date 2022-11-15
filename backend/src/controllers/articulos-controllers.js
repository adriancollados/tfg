import {getConnection, sql, queries} from '../database'

export const getArticulos = async (req, res) => {
   try{
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllProducts)
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
            res.send("El articulo no se ha encontrado")
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
            res.send("El articulo no se ha encontrado")
        }else{
            res.json(result.recordset)

        }
    }
    catch(e){
        res.status(500)
        res.send(e.message)
    }
}

export const getArticulosFromCategoria = async (req, res) => {
    const { id } = req.params
    try{
        const pool = await getConnection();
        const result = await pool.request().input('id', id).query(queries.getArticulosFromCategoria)
        if(result == null){
            res.status(404)
            res.send("El articulo no se ha encontrado")
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

