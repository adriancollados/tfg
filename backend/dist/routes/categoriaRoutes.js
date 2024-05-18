"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var router = require("express").Router();
var categoriaController = require("../controllers/categorias-contoller");
var _require = require("../utils/auth"),
  isAuthenticated = _require.isAuthenticated;

/**
 * @swagger
 * /categorias:
 *   get:
 *     summary: Obtener todas las categorías
 *     description: Devuelve una lista de todas las categorías disponibles.
 *     tags:
 *       - Categorías
 *     responses:
 *       200:
 *         description: Lista de categorías obtenida con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Despensa"
 *       404:
 *         description: No se encontraron categorías.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 errorMessage:
 *                   type: string
 *                   example: "NOT_FOUND"
 *       500:
 *         description: Error interno del servidor.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error message"
 */
router.get('/categorias', isAuthenticated, categoriaController.getAllCategorias);

/**
* @swagger
* /categorias/{id}:
*   get:
*     summary: Obtener artículos o secciones por ID de categoría
*     description: Devuelve artículos o secciones dependiendo del ID de la categoría proporcionado.
*     tags:
*       - Categorías
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: integer
*         required: true
*         description: ID de la categoría
*     responses:
*       200:
*         description: Artículos o secciones obtenidos con éxito.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 categorias:
*                   type: array
*                   items:
*                     type: object
*                     properties:
*                       id:
*                         type: integer
*                         example: 1
*                       name:
*                         type: string
*                         example: "Arroz y pasta"
*       404:
*         description: No se encontraron artículos o secciones para la categoría.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 message:
*                   type: string
*                   example: "La categoría no se ha encontrado"
*       500:
*         description: Error interno del servidor.
*         content:
*           application/json:
*             schema:
*               type: object
*               properties:
*                 error:
*                   type: string
*                   example: "Error message"
*/
router.get('/categorias/:id', isAuthenticated, categoriaController.getArticuloOSeccionOnCategoryId);
var _default = router;
exports["default"] = _default;