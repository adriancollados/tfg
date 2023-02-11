import { getConnection, sql, queries } from '../database'
import req from '../models/reqs';

export const getCliente = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().input('id', id).query(queries.getAllProducts)
        res.json(result.recordset)
    } catch (e) {
        res.status(500)
        res.send(e.message)
    }

}

export const registro = async (req, res) => {
    try {

        const pool = await getConnection();
        const result = await pool.request()
            .input('CODCLIENTE', req.CODCLIENTE)
            .input('CODCONTABLE', req.CODCONTABLE)
            .input('NOMBRECLIENTE', req.NOMBRECLIENTE)
            .input('NOMBRECOMERCIAL', req.NOMBRECOMERCIAL)
            .input('CIF', req.CIF)
            .input('DIRECCION1', req.DIRECCION1)
            .input('CODPOSTAL', req.CODPOSTAL)
            .input('POBLACION', req.POBLACION)
            .input('PROVINCIA', req.PROVINCIA)
            .input('PAIS', req.PAIS)
            .input('PERSONACONTACTO', req.PERSONACONTACTO)
            .input('TELEFONO1', req.TELEFONO1)
            .input('E_MAIL', req.E_MAIL)
            .input('FECHAMODIFICADO', req.FECHAMODIFICADO)
            .input('NIF20', req.NIF20)
            .input('DESCATALOGADO', req.DESCATALOGADO)
            .input('USUARIO', req.USUARIO)
            .input('PASS', req.PASS)
            .input('BLOQUEADO', req.BLOQUEADO)
            .input('TIPOUSUARIO', req.TIPOUSUARIO)
            .execute(queries.spreqs)
        res.json(result.recordset)
    } catch (e) {
        res.status(500)
        res.send(e.message)
    }

}