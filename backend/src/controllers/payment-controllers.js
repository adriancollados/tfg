import { Result } from 'express-validator';
import {getConnection, sql, queries} from '../database'
import { isNull } from 'util';
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');

const isStringNullOrEmpty = (string) => {
    if(string === null || string === '') return true; 
}

export const makePayment = async (req, res) => {

    const data = JSON.parse(atob(req.body.t));

    try {
        if(req.body != null) {
            var contador = 0
            const pool = await getConnection();
            const codigoPostalCode = parseInt(data.codigoPostal)
            const codigos = await pool.request().query(queries.getPostalCodes)
            console.log(data)
            const {CODPOSTAL, LOCALIDAD} = codigos.recordset.find(codigo => codigo.CODPOSTAL === codigoPostalCode)
            if(codigos.recordset.some(codigo => codigo.CODPOSTAL === codigoPostalCode)) {
                

                const result = await pool.request()
                    .input('CODCLIENTE', data.user)
                    .input('TOTAL', data.total)
                    .input('DIR_ENVIO', data.direccion)
                    .input('CODPOSTAL', CODPOSTAL)
                    .input('LOCALIDAD', LOCALIDAD)
                    .input('INFO_PEDIDO', data.horaEntrega)
                    .execute(queries.sp_makePayment)
                
                if(result != null) {
                    const codpedido = result.recordset[0].CODPEDIDO

                    for(const linped of data.carrito) {
                        console.log(codpedido+ '|' + linped.articulo.CODARTICULO + '|' + linped.articulo.DESCRIPCION + '|' + linped.cantidad + '|' + linped.articulo.PVPNETO +'|' + isStringNullOrEmpty(linped.comentario) )
                        const resultLinped = await pool.request()
                            .input('CODPEDIDO', codpedido)
                            .input('CODARTICULO', linped.articulo.CODARTICULO)
                            .input('DESCRIPCION', linped.articulo.DESCRIPCION)
                            .input('CANTIDAD', linped.cantidad)
                            .input('PVP', linped.articulo.PVPNETO)
                            .input('COMENTARIO', !isStringNullOrEmpty(linped.comentario) ? linped.comentario : null)
                            .execute(queries.sp_insertLinpeds)
                            if (resultLinped.recordset[0].RESULT === 'OK'){
                                contador = contador + 1 
                            }                          
                    }
                    console.log(contador)
                    if(contador == data.carrito.length) {
                        res.status(200).send({message: 'Pedido realizado correctamente'})
                    }
                    else{
                        res.status(400);
                        res.send({error: "NOT_ALL_LINPEDS_INSERTED"})
                    }
                }
            }
            else{
                res.status(404);
                res.send({error: "INVALID_CODPOSTAL_INPUT"})
            }
            
        }
        else {
            res.status(400);
            res.send({error: "INVALID_INPUT_FIELDS"})
        }
    } catch (e) {
        res.status(500)
        res.send({error: e.message})
    }
/*
    // Guardar el pedido en la base de datos
    const orderId = 'order-' ; // Ejemplo de ID de pedido
    // Aquí guardarías los datos del pedido en la base de datos

    // Configurar los parámetros de Redsys
    const merchantParameters = {
        DS_MERCHANT_AMOUNT: total.toFixed(2).replace('.', ''),
        DS_MERCHANT_ORDER: orderId,
        DS_MERCHANT_MERCHANTCODE: '999008881',
        DS_MERCHANT_CURRENCY: '978', // Euros
        DS_MERCHANT_TRANSACTIONTYPE: '0',
        DS_MERCHANT_TERMINAL: '1',
        DS_MERCHANT_MERCHANTURL: 'http://localhost:19006/',
        DS_MERCHANT_URLOK: 'http://localhost:19006/',
        DS_MERCHANT_URLKO: 'http://localhost:19006/',
    };

    // Convertir a base64
    const merchantParametersBase64 = Buffer.from(JSON.stringify(merchantParameters)).toString('base64');

    // Crear firma
    const key = Buffer.from('your_secret_key', 'base64');
    const keyOrder = crypto.createHmac('sha256', key).update(orderId).digest();
    const signature = crypto.createHmac('sha256', keyOrder).update(merchantParametersBase64).digest('base64');

    // Responder con los parámetros necesarios
    res.json({
        orderId,
        redsysParams: {
        Ds_SignatureVersion: 'HMAC_SHA256_V1',
        Ds_MerchantParameters: merchantParametersBase64,
        Ds_Signature: signature,
        },
    });
    */
}


