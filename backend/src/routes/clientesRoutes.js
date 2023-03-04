const router = require("express").Router();
const clienteController =require("../controllers/clientes-controller");
const {body} = require("express-validator");

/**
 * @swagger
 * tag:
 *  name: clientes
 *  description: clientes endpoint
 */
/**
 * @swagger
 * /clientes:
 *  get:
 *      summary: Obtiene todos los clientes
 *      tags: [clientes]
*/
//router.get('/clientes', clienteController.getclientes);

/**
 * @swagger
 * /clientes/login:
 *  post:
 *      summary: Login de clientes
 *      tags: [clientes]
*/
router.post('/clientes/login', clienteController.login);


/**
 * @swagger
 * /clientes/registro:
 *  post:
 *      summary: Registro de clientes
 *      tags: [clientes]
*/
router.post('/clientes/register', [
    body('E_MAIL').isEmail().withMessage("El campo debe ser un email"),
    body('PASS').isLength({min: 6}).withMessage("Contraseña debe tener mínimo 6 dígitos de longitud"),
    body('TELEFONO1').isInt().withMessage("Deben ser números enteros"),
    body('CODPOSTAL').isInt().withMessage("Deben ser números enteros")],
    clienteController.registro);



module.exports = router;