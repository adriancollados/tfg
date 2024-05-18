"use strict";

var router = require("express").Router();
var articuloController = require("../controllers/articulos-controllers");
var _require = require("../utils/auth"),
  isAuthenticated = _require.isAuthenticated;

/**
 * @swagger
 * tags:
 *   name: Articulos
 *   description: Articulos endpoint
 */

/**
 * @swagger
 * /articulos:
 *   get:
 *     summary: Obtiene todos los articulos
 *     tags: [Articulos]
 *     responses:
 *       200:
 *         description: Lista de artículos obtenida con éxito.
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
 *                     example: "Laptop"
 *                   price:
 *                     type: number
 *                     format: float
 *                     example: 999.99
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
router.get('/articulos', isAuthenticated, articuloController.getArticulos);

/**
 * @swagger
 * /articulos/{id}:
 *   get:
 *     summary: Obtiene un artículo por ID
 *     tags: [Articulos]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del artículo
 *     responses:
 *       200:
 *         description: Artículo obtenido con éxito.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "Laptop"
 *                 price:
 *                   type: number
 *                   format: float
 *                   example: 999.99
 *       404:
 *         description: El artículo no se ha encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "El articulo no se ha encontrado"
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
router.get('/articulos/:id', isAuthenticated, articuloController.getArticulo);
module.exports = router;