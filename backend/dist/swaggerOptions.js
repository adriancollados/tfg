"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.options = void 0;
var options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Superamano API Documentation',
      version: '1.0.0',
      description: 'Documentación de API para métodos de pago y categorías'
    }
  },
  apis: ["./src/routes/*.js"]
};
exports.options = options;