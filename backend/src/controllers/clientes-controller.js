import { getConnection, sql, queries } from '../database'
const Cliente = require('../models/clientes');
import body from 'express-validator';
const { getTokenFromUser } = require('../utils/auth'); 


const IVKey = "68576D5A7134743777217A25432A462D";

export const getCliente = async (req, res) => {
    try {
        const id = req.params.id;
        const pool = await getConnection();
        const result = await pool.request().input('id', id).query(queries.getClienteId)
        res.json(result.recordset)
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
                .input('CIF', req.body.CIF)
                .input('DIRECCION1', req.body.DIRECCION1)
                .input('CODPOSTAL', req.body.CODPOSTAL)
                .input('POBLACION', req.body.POBLACION)
                .input('PROVINCIA', req.body.PROVINCIA)
                .input('PAIS', req.body.PAIS)
                .input('TELEFONO1', req.body.TELEFONO1)
                .input('E_MAIL', req.body.E_MAIL)
                .input('USUARIO', req.body.USUARIO)
                .input('PASS', password)
                .input('NUMTARJETA', Cliente.maskCardNumber(req.body.NUMTARJETA))
                .input('TARCADUCIDAD', req.body.TARCADUCIDAD)
                .input('CVC', cvc)
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
        const [E_MAIL, PASS] = Cliente.decodeBase64Credentials(req.body.t)
        if (E_MAIL && PASS) {
            const user = await pool.request().input('E_MAIL', E_MAIL).query(queries.getClienteLogin)
            if (user) {
                console.log(user.recordset[0])
                const password = Cliente.decryptCardNumber(user.recordset[0].pass, IVKey);
                if (Cliente.isValidPassword(password, user.recordset[0].pass)) {
                    const token = getTokenFromUser(user.recordset[0])
                    res.status(201).send({data: "OK", user: user.recordset[0].nombrecliente, token: token}) ;
                } else {
                    res.status(404).send({errorMessage: "WRONG_PASSWORD"});
                }
            } else {
                res.status(404).send(JSON.stringify(errorMessage, "NOT_FOUND"));
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