import {getConnection, sql, queries} from '../database'
const express = require('express');
const bodyParser = require('body-parser');
const crypto = require('crypto');
const stripe = require('stripe')('sk_test_51PGob9FFZqdYKyWkKMZh8dXfocdLdwGiv8rNCByI3GVzCZLiem39mFBrNIH47U8zvdGxAZgArK6E2BfIuCnQMnKt00QPVvM0sE');

const isStringNullOrEmpty = (string) => {
    if(string === null || string === '') return true; 
}

export const makePayment = async (req, res) => {

    const data = JSON.parse(atob(req.body.t));
    const token = req.body.token;

    try {
        if(req.body != null) {
            var contador = 0
            const pool = await getConnection();
            const codigoPostalCode = parseInt(data.codigoPostal)
            const codigos = await pool.request().query(queries.getPostalCodes)
            //console.log(data)
            if(codigos.recordset.some(codigo => codigo.CODPOSTAL === codigoPostalCode)) {

                const {CODPOSTAL, LOCALIDAD} = codigos.recordset.find(codigo => codigo.CODPOSTAL === codigoPostalCode)
                const result = await pool.request()
                    .input('CODCLIENTE', data.user)
                    .input('TOTAL', data.total)
                    .input('DIR_ENVIO', data.direccion)
                    .input('CODPOSTAL', CODPOSTAL)
                    .input('LOCALIDAD', LOCALIDAD)
                    .input('INFO_PEDIDO', data.horaEntrega)
                    .input('PAYMENT_ID', token.id)
                    .execute(queries.sp_makePayment)
                
                if(result != null) {
                    const orderId = result.recordset[0].CODPEDIDO.toString() ; // Ejemplo de ID de pedido
                    const amount = parseInt(data.total * 100)
                    // Aquí guardarías los datos del pedido en la base de datos
                    console.log(token.id)


                     // Crea el cargo utilizando el token de tarjeta y los detalles del pedido
                    const charge = await stripe.paymentIntents.create({
                        amount,
                        currency: "EUR",
                        payment_method: token.id,
                        confirm: true,
                        return_url: 'http://localhost:19006/', // URL de retorno después del pago
                        automatic_payment_methods: {
                            enabled: true, // Habilitar métodos de pago automáticos
                            allow_redirects: 'never' // No permitir redirecciones de página completa
                        }
                    });

                    console.log(charge.status)

                    if(charge.status === 'succeeded') {
                        for(const linped of data.carrito) {
                            //console.log(codpedido+ '|' + linped.articulo.CODARTICULO + '|' + linped.articulo.DESCRIPCION + '|' + linped.cantidad + '|' + linped.articulo.PVPNETO +'|' + isStringNullOrEmpty(linped.comentario) )
                            const resultLinped = await pool.request()
                                .input('CODPEDIDO', orderId)
                                .input('CODARTICULO', linped.articulo.CODARTICULO)
                                .input('DESCRIPCION', linped.articulo.DESCRIPCION)
                                .input('CANTIDAD', linped.cantidad)
                                .input('PVP', linped.articulo.PVPNETO)
                                .input('COMENTARIO', !isStringNullOrEmpty(linped.comentario) ? linped.comentario : null)
                                .execute(queries.sp_insertLinpeds)
                                if (resultLinped.recordset[0].RESULT === 'OK'){
                                    contador = contador + 1 
                                }
                                else
                                {
                                    res.status(400);
                                    console.log(resultLinped.recordset[0].RESULT)
                                    res.send({error: resultLinped.recordset[0].RESULT})
                                }                          
                        }
                        if(contador == data.carrito.length) {
                            res.status(200).json({ message: 'Pago procesado correctamente'});
                        }
                        else{
                            res.status(400);
                            res.send({error: "NOT_ALL_LINPEDS_INSERTED"})
                        }
                    }
                    else{
                        res.status(502);
                        res.send({error: "PAYMENT_ERROR"});
                        await pool.request().input('id', orderId).query(queries.updatePedido)
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
        console.log(e)
        res.send({error: e.message})
    }

    
}


