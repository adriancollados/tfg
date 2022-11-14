const router = require("express").Router();
const articuloController = require("../controllers/articulos-controllers");

/**
 * @swagger
 * /articulos:
 *  get:
 *      summary: Obtiene todos los articulos
*/
router.get('/articulos', articuloController.getArticulos);

/**
 * @swagger
 * /articulos/count:
 *  get:
 *      summary: Obtiene la cantidad de articulos
*/
router.get('/articulos/count', articuloController.getArticulosCount);

/**
 * @swagger
 * /articulos/:id:
 *  get:
 *      summary: Obtiene un articulo con cierto id
*/
router.get('/articulos/:id', articuloController.getArticulo);

/**
 * @swagger
 * /articulos:
 *  post:
 *      summary: Crea un articulo
 * 
 */
 router.post('/articulos', articuloController.createArticulos);

/**
 * @swagger
 * /articulos/:id:
 *  delete:
 *      summary: Borra un articulo con cierto id
*/
router.delete('/articulos/:id', articuloController.deleteArticulos);

/**
 * @swagger
 * /articulos/:id:
 *  put:
 *      summary: Modifica un articulo con cierto id
*/
router.put('/articulos/:id', articuloController.updateArticulos);

module.exports = router;