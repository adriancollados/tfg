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
 * /articulos/:id:
 *  get:
 *      summary: Obtiene un articulo con cierto id
*/
router.get('/articulos/:id', articuloController.getArticulo);

/**
 * @swagger
 * /articulos/count:
 *  get:
 *      summary: Obtiene los articulos de una seccion
*/
router.get('/articulos/seccion/:id', articuloController.getArticulosFromSeccion);

/**
 * @swagger
 * /articulos/categorias/:id:
 *  get:
 *      summary: Obtiene los artiulos de dicha categoria
 */

router.get('/articulos/categorias/:id', articuloController.getArticulosFromCategoria);


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