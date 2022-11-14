"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.queries = void 0;
var queries = {
  getAllProducts: 'select * from articulos with(nolock) where visibleweb = \'T\'',
  getArticuloId: 'select * from articulos with(nolock) where codarticulo = @id'
};
exports.queries = queries;