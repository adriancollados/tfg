import { getConnection, sql, queries } from '../database'
const Cliente = require('../models/clientes');
import body from 'express-validator';
const { getTokenFromUser } = require('../utils/auth'); 


const IVKey = "68576D5A7134743777217A25432A462D";

export const getCliente = async (req, res) => {
    try {
        const id = req.params.id;
        const pool = await getConnection();
        const result  = await pool.request().input('id', id).query(queries.getClienteId)
        if(result != null) {
            res.status(200).send(result.recordset[0])
        } else {
            res.status(404).send({errorMessage: "NOT_FOUND"});
        }
        
    } catch (e) {
        res.status(500)
        res.send({error: e.message})
    }
}

export const registro = async (req, res) => {
    try {
        if(req.body != null) {
            const password = Cliente.encryptCardNumber(req.body.PASS, IVKey);
            const cvc = Cliente.encryptCardNumber(req.body.CVC, IVKey);
            //const tipoCliente = "cliente"//(req.body.TIPOUSUARIO != null) ? req.body.TIPOUSUARIO : "cliente";
            const pool = await getConnection();
            const { recordset } = await pool.request().query(queries.getLastIdCLiente);
            const codCli = recordset[0].CODCLIENTE;
            const newCodCli = codCli != null ? codCli + 1 : null;
            
            if(newCodCli == null) {
                res.status(500);
                return res.send({
                    error: "Internal server error",
                })
            }            
            const result = await pool.request()
                .input('CODCLIENTE', newCodCli)
                .input('NOMBRECLIENTE', req.body.NOMBRECLIENTE)
                .input('DIRECCION', req.body.DIRECCION1)
                .input('CODPOSTAL', req.body.CODPOSTAL)
                .input('POBLACION', req.body.POBLACION)
                .input('PROVINCIA', req.body.PROVINCIA)
                .input('TELEFONO', req.body.TELEFONO)
                .input('EMAIL', req.body.E_MAIL)
                .input('PASS', password)
                .input('FECHAALTA', req.body.FECHAALTA)
                .input('CIF', req.body.CIF)
                .query(queries.addCliente)
            console.log('OK')
            return res.send(result.recordset)
            
        }
        else {
            res.status(400);
            res.send({error: "INVALID_INPUT_FIELDS"})
        }
    } catch (e) {
        res.status(500)
        res.send({error: e.message})
    }
}

export const login = async (req, res) => {

    try {
        const pool = await getConnection();
        const [EMAIL, PASS] = Cliente.decodeBase64Credentials(req.body.t)
        console.log(EMAIL + '/' + PASS)
        if (EMAIL && PASS) {
            const user = await pool.request().input('EMAIL', EMAIL).query(queries.getClienteLogin)
            if (user) {
                const obj = {
                    codcliente: user.recordset[0].codcliente,
                    nombrecliente: user.recordset[0].nombrecliente
                  };
                const password = Cliente.decryptCardNumber(user.recordset[0].pass, IVKey);
                if (Cliente.isValidPassword(password, user.recordset[0].pass)) {
                    const token = getTokenFromUser(user.recordset[0])
                    res.status(201).send({data: "OK",codcliente: user.recordset[0].codcliente, user: user.recordset[0].nombrecliente, token: token}) ;
                } else {
                    res.status(404).send({errorMessage: "WRONG_PASSWORD"});
                }
            } else {
                res.status(404).send({errorMessage: "NOT_FOUND"});
            }
        } else {
            res.status(400);
            res.json({
                errorMessage: "INVALID_INPUT_FIELDS",
                fieldsErrors: [{
                    property: "name",
                    constraints: {
                    "isString": "name must be a string"
                    }
                },
                {
                    property: "password",
                    constraints: {
                    "isString": "password must be a string"
                    }
                }
                ]
            });
        }
    } catch (e) {
        console.log({error: e.message});
        res.status(500)
        res.send({error: e.message})
    }
    return res
}


export const editarPerfil = async (req, res) => { 
    const {id} = req.params;
    try{
        if(req.body != null){
            const pool = await getConnection();
            const { NOMBRECLIENTE, DIRECCION, TELEFONO} = req.body;
            

            const user  = await pool.request().input('id', id).query(queries.getClienteId)
            
            if(user.recordset[0] != null){ 
            
                // Verificar si al menos un campo está presente en la solicitud
                const updateFields = {};
                NOMBRECLIENTE ? updateFields.NOMBRECLIENTE = NOMBRECLIENTE : updateFields.NOMBRECLIENTE = null;
                DIRECCION ? updateFields.DIRECCION = DIRECCION : updateFields.DIRECCION = null;
                TELEFONO ? updateFields.TELEFONO = TELEFONO : updateFields.TELEFONO = null;
                id ? updateFields.CODCLIENTE = id : updateFields.CODCLIENTE = null;

                if(Object.keys(updateFields).length > 0){
                    const request = await pool.request()
                        .input('CODCLIENTE', updateFields.CODCLIENTE) // Pasar el ID como parámetro para identificar el perfil a editar
                        .input('NOMBRECLIENTE', updateFields.NOMBRECLIENTE)
                        .input('DIRECCION', updateFields.DIRECCION)
                        .input('TELEFONO', updateFields.TELEFONO)


                    const result = await request.execute(queries.updateCliente);
                    res.status(201).send({data: "OK", message: "Usuario modificado correctamente"});
                                  
                } else {
                    // Si ningún campo está presente en la solicitud, devolver un mensaje de error
                    res.status(400).json({ errorMessage: "Debe proporcionar al menos un campo para actualizar el perfil" });
                }
            }   
            else{
                res.status(404).send({errorMessage: "USER_TO_MODIFY_NOT_FOUND"});
            }
        }
        else {
            res.status(400);
            res.send({error: "INVALID_INPUT_FIELDS"})
        }
        
        
    }
    catch (e) {
        console.log({error: e.message});
        res.status(500)
        res.send({error: e.message})
    }

    return
}