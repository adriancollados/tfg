import { getConnection, sql, queries } from '../database';
const articuloController = require("../controllers/articulos-controllers");


export const getAllCategorias = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool.request().query(queries.getAllCategorias);
    if(result != null) {
      res.status(200).send(result.recordset)
    } else {
        res.status(404).send({errorMessage: "NOT_FOUND"});
    }
  
  } catch (e) {
    res.status(500).send({error: e.message});
  }
};


export const getArticuloOSeccionOnCategoryId = async (req, res) => {
  const { id } = req.params;
  try {
    // Convertir la cadena en un array utilizando la coma como delimitador
    const arraySecciones = queries.listaSeccionesConCategoria.split(',').map(item => parseInt(item.trim(), 10));
    // Verificar si el id está presente en el array
    const existeId = arraySecciones.includes(parseInt(id, 10));
    if(existeId) {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', id)
            .query(queries.getSeccionesFromCategoriaID);
        if (result.recordset.length === 0) {
            res.status(404).send({message: "La categoría no se ha encontrado"});
        } else {
            res.json({categorias: result.recordset});
        }
    }
    else{
      await articuloController.getArticulosFromCategoria(req, res);;
    }
  } catch (e) {
    res.status(500).send({error: e.message});
  }
};


export const getArticuloInSeccion = async (req, res) => {
  const { id } = req.params;
  try {
    // Convertir la cadena en un array utilizando la coma como delimitador
    const arraySecciones = queries.listaSeccionesConCategoria.split(',').map(item => parseInt(item.trim(), 10));
    // Verificar si el id está presente en el array
    const existeId = arraySecciones.includes(parseInt(id, 10));
    if(existeId) {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input('id', id)
            .query(queries.getSeccionesFromCategoriaID);
       
            res.json(result.recordset);
    }
    else{
      res.status(404).send({message: "La seccion no se ha encontrado"});
    }
  } catch (e) {
    res.status(500).send({error: e.message});
  }
};




export const createCategory = async (req, res) => {
  const { name } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('name', sql.VarChar, name)
      .query(queries.createCategory);
    res.status(201).json(result.recordset[0]);
  } catch (e) {
    res.status(500).send({error: e.message});
  }
};

export const updateCategory = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .input('name', sql.VarChar, name)
      .query(queries.updateCategory);
    if (result.rowsAffected[0] === 0) {
      res.status(404).send({message: "La categoría no se ha encontrado"});
    } else {
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send({error: e.message});
  }
};

export const deleteCategory = async (req, res) => {
  const { id } = req.params;
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input('id', sql.Int, id)
      .query(queries.deleteCategory);
    if (result.rowsAffected[0] === 0) {
      res.status(404).send('La categoría no se ha encontrado');
    } else {
      res.status(204).send();
    }
  } catch (e) {
    res.status(500).send({error: e.message});
  }
};
