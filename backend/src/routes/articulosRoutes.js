const router = require("express").Router();
const articuloController = require("../controllers/articulos-controllers");
const { isAuthenticated } = require("../utils/auth");

/**
 * @swagger
 * tag:
 *  name: Articulos
 *  description: Articulos endpoint
 */
/**
 * @swagger
 * /articulos:
 *  get:
 *      summary: Obtiene todos los articulos
 *      tags: [Articulos]
*/
router.get('/articulos', isAuthenticated, articuloController.getArticulos);

/**
 * @swagger
 * /articulos/:id:
 *  get:
 *      summary: Obtiene un articulo con cierto id
 *      tags: [Articulos]
*/
router.get('/articulos/:id', isAuthenticated, articuloController.getArticulo);

/**
 * @swagger
 * /articulos/count:
 *  get:
 *      summary: Obtiene los articulos de una seccion
 *      tags: [Articulos]
*/
router.get('/articulos/seccion/:id', isAuthenticated, articuloController.getArticulosFromSeccion);

/**
 * @swagger
 * /articulos/categorias/:id:
 *  get:
 *      summary: Obtiene los artiulos de dicha categoria
 *      tags: [Articulos]
 */

router.get('/articulos/categorias/:id', isAuthenticated, articuloController.getArticulosFromCategoria);

/**
 * @swagger
 * /articulos/categorias/{categoriaId}/secciones/{seccionId}:
 *   get:
 *     summary: Obtiene los artículos de una sección y categoría
 *     tags: [Articulos]
 *     parameters:
 *       - name: categoriaId
 *         in: path
 *         required: true
 *         description: ID de la categoría
 *         schema:
 *           type: integer
 *       - name: seccionId
 *         in: path
 *         required: true
 *         description: ID de la sección
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: OK
 *       404:
 *         description: No se encontraron artículos para la categoría y sección especificadas
 */

router.get('/articulos/categorias/:categoriaId/secciones/:seccionId', isAuthenticated, articuloController.getArticulosFromSeccionCategoria);


/**
 * @swagger
 * /articulos:
 *  post:
 *      summary: Crea un articulo
 *      tags: [Articulos]
 */
 router.post('/articulos', articuloController.createArticulos);

/**
 * @swagger
 * /articulos/:id:
 *  delete:
 *      summary: Borra un articulo con cierto id
 *      tags: [Articulos]
*/
router.delete('/articulos/:id', articuloController.deleteArticulos);

/**
 * @swagger
 * /articulos/:id:
 *  put:
 *      summary: Modifica un articulo con cierto id
 *      tags: [Articulos]
*/
router.put('/articulos/:id', articuloController.updateArticulos);

module.exports = router;