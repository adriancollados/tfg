const router = require("express").Router();
const clienteController =require("../controllers/clientes-controller");
const {body} = require("express-validator");
const { isAuthenticated } = require("../utils/auth");

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
router.post('/clientes/login',[body('E_MAIL').isEmail().withMessage("El campo debe ser un email")], clienteController.login);


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
    body('TELEFONO1').isInt().withMessage("Deben ser números enteros")],
    clienteController.registro);

/**
 * @swagger
 * /perfil/perfil:
 *  get:
 *      summary: Get cliente perfil 
 *      tags: [clientes]
*/
router.get('/clientes/perfil/:id', isAuthenticated, clienteController.getCliente);



module.exports = router;