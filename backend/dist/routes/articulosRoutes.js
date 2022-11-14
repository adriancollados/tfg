"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _articulos = require("../controllers/articulos.controllers");
var _require = require("express"),
  Router = _require.Router;
var routerArticulo = Router();

/**
 * @swagger
 * /articulos:
 *  get:
 *      summary: Obtiene todos los articulos
*/
routerArticulo.get('/articulos', _articulos.getArticulos);

/**
 * @swagger
 * /articulos/count:
 *  get:
 *      summary: Obtiene la cantidad de articulos
*/
routerArticulo.get('/articulos/count', _articulos.getArticulosCount);

/**
 * @swagger
 * /articulos/:id:
 *  get:
 *      summary: Obtiene un articulo con cierto id
*/
routerArticulo.get('/articulos/:id', _articulos.getArticulo);
/**
 * @swagger
 * /articulos:
 *  post:
 *      summary: Crea un articulo
 * */
routerArticulo.post('/articulos', _articulos.createArticulos);
/**
 * @swagger
 * /articulos/:id:
 *  delete:
 *      summary: Borra un articulo con cierto id
*/
routerArticulo["delete"]('/articulos/:id', _articulos.deleteArticulos);
/**
 * @swagger
 * /articulos/:id:
 *  put:
 *      summary: Modifica un articulo con cierto id
*/
routerArticulo.put('/articulos/:id', _articulos.updateArticulos);
var _default = routerArticulo;
exports["default"] = _default;