const router = require("express").Router();
const clienteController =require("../controllers/clientes-controller");
const {body} = require("express-validator");
const { isAuthenticated } = require("../utils/auth");

/**
 * @swagger
 * tag:
 *  name: Clientes
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
 *   post:
 *     summary: Iniciar sesión de cliente
 *     tags: 
 *       - clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               t:
 *                 type: string
 *     responses:
 *       '201':
 *         description: Inicio de sesión exitoso
 *       '400':
 *         description: Error en los campos de entrada
 *       '404':
 *         description: Credenciales incorrectas
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/clientes/login',[body('E_MAIL').isEmail().withMessage("El campo debe ser un email")], clienteController.login);


/**
 * @swagger
 * /clientes/registro:
 *   post:
 *     summary: Registro de nuevo cliente
 *     tags: 
 *       - clientes
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NOMBRECLIENTE:
 *                 type: string
 *               DIRECCION1:
 *                 type: string
 *               CODPOSTAL:
 *                 type: string
 *               POBLACION:
 *                 type: string
 *               PROVINCIA:
 *                 type: string
 *               TELEFONO:
 *                 type: string
 *               E_MAIL:
 *                 type: string
 *               PASS:
 *                 type: string
 *               FECHAALTA:
 *                 type: string
 *               CIF:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Cliente registrado correctamente
 *       '400':
 *         description: Error en los campos de entrada
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/clientes/register', [
    body('EMAIL').isEmail().withMessage("El campo debe ser un email"),
    body('PASS').isLength({min: 6}).withMessage("Contraseña debe tener mínimo 6 dígitos de longitud"),
    body('TELEFONO').isInt().withMessage("Deben ser números enteros")],
    clienteController.registro);

/**
 * @swagger
 * /clientes/perfil/{id}:
 *   get:
 *     summary: Obtener perfil del cliente por ID
 *     tags: 
 *       - clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a obtener
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Perfil del cliente obtenido correctamente
 *       '404':
 *         description: Cliente no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/clientes/perfil/:id', isAuthenticated, clienteController.getCliente);


/**
 * @swagger
 * /clientes/perfil/{id}:
 *   put:
 *     summary: Editar perfil
 *     tags: 
 *       - clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente a editar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               NOMBRECLIENTE:
 *                 type: string
 *               DIRECCION:
 *                 type: string
 *               TELEFONO:
 *                 type: integer
 *               CODCLIENTE:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Perfil actualizado correctamente
 *       '400':
 *         description: Error en los campos de entrada
 *       '404':
 *         description: Perfil no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.put('/clientes/perfil/:id', [
    body('TELEFONO').optional().isInt().withMessage("TELEFONO debe ser un número entero")
], isAuthenticated, clienteController.editarPerfil);

/**
 * @swagger
 * /clientes/perfil/{id}/pedidos:
 *   get:
 *     summary: Ver pedidos del cliente
 *     tags: 
 *       - clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Lista de pedidos obtenida correctamente
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Pedidos no encontradoss
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/clientes/perfil/:id/pedidos', isAuthenticated, clienteController.verPedidos);

/**
 * @swagger
 * /clientes/perfil/{id}/pedidos/{pedido}:
 *   get:
 *     summary: Detalles de un pedido específico del cliente
 *     tags: 
 *       - clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *       - in: path
 *         name: pedido
 *         required: true
 *         description: ID del pedido
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Detalles del pedido obtenidos correctamente
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Detalles o pedido no encontrado
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/clientes/perfil/:id/pedidos/:pedido', isAuthenticated, clienteController.detallesPedidos);

/**
 * @swagger
 * /clientes/{id}/favoritos:
 *   get:
 *     summary: Articulos favoritos de un cliente
 *     tags: 
 *       - clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *     responses:
 *       '200':
 *         description: Articulos favoritos obtenidos correctamente
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Articulos favoritos no encontrados
 *       '500':
 *         description: Error interno del servidor
 */
router.get('/clientes/:id/favoritos', isAuthenticated, clienteController.getFavoritos);

/**
 * @swagger
 * /clientes/{id}/favoritos:
 *   post:
 *     summary: Articulos favoritos de un cliente
 *     tags: 
 *       - clientes
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del cliente
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               t:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Articulos favoritos obtenidos correctamente
 *       '401':
 *         description: No autorizado
 *       '404':
 *         description: Articulos favoritos no encontrados
 *       '500':
 *         description: Error interno del servidor
 */
router.post('/clientes/:id/favoritos', isAuthenticated, clienteController.insertFavoritos);


module.exports = router;