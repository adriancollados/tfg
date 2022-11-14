"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _express = require("express");
var _articulos = require("../controllers/articulos.controllers");
var router = (0, _express.Router)();
router.get('/articulos', _articulos.getArticulos);
router.get('/articulos/count', _articulos.getArticulosCount);
router.get('/articulos/:id', _articulos.getArticulo);
router.post('/articulos', _articulos.createArticulos);
router["delete"]('/articulos/:id', _articulos.deleteArticulos);
router.put('/articulos/:id', _articulos.updateArticulos);
var _default = router;
exports["default"] = _default;