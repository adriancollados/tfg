const router = require("express").Router();
const paymentController =require("../controllers/payment-controllers");
const { isAuthenticated } = require("../utils/auth");


/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Procesar un pago
 *     description: Procesa un pago utilizando los datos proporcionados en el cuerpo de la solicitud.
 *     tags:
 *       - Payment
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               t:
 *                 type: string
 *                 description: Token base64 con los datos del pago.
 *                 example: eyJ1c2VyIjogIjEiLCAidG90YWwiOiAxMDAsICJkaXJlY2Npb24iOiAiRXhhbXBsZSBhZGRyZXNzIiwgImNvZGlnb1Bvc3RhbCI6ICIxMjM0NSIsICJob3JhRW50cmVnYSI6ICJFeGFtcGxlIGhvdXIgIiwiY2Fycml0byI6IFt7ImFydGljdWxvIjogeyJDT0RBUlRJQ1VMTyI6ICIxMjMiLCAiREVTS1JJUENJT04iOiAiRXhhbXBsZSBpdGVtIiwgIlBWUE5FVE8iOiAxMDAgfSwgImNhbnRpZGFkIjogMSwgImNvbWVudGFyaW8iOiAiRXhhbXBsZSBjb21tZW50In1dfQ==
 *               token:
 *                 type: string
 *                 description: Token de pago.
 *                 example: tok_visa
 *     responses:
 *       200:
 *         description: Pago procesado correctamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pago procesado correctamente
 *       400:
 *         description: Entrada inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: INVALID_INPUT_FIELDS
 *       404:
 *         description: Código postal inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: INVALID_CODPOSTAL_INPUT
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: Error message
 */
router.post('/payment', isAuthenticated, paymentController.makePayment);


module.exports = router;